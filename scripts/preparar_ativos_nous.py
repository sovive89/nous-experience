#!/usr/bin/env python3
"""Prepara imagens NØUS sem editar os originais nem executar operações Git.

Dependência: python3 -m pip install Pillow
Uso:
  python3 preparar_ativos_nous.py --entrada ./imagens --saida ./ativos-preparados

A saída deve ser uma pasta nova. O script mantém cópias byte a byte dos
originais, elimina duplicatas por SHA-256 e cria derivados WebP sem recorte,
sem ampliação e sem mudança de proporção. O manifesto registra os bytes
medidos; redução de bytes não é uma medição de velocidade do site.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import sys
import tempfile
import warnings
from pathlib import Path

try:
    from PIL import Image, ImageOps, UnidentifiedImageError
except ImportError:
    sys.exit("Dependência ausente. Execute: python3 -m pip install Pillow")

EXTENSOES = {".png", ".jpg", ".jpeg", ".webp"}
MAX_ARQUIVO = 64 * 1024 * 1024
MAX_TOTAL = 512 * 1024 * 1024
MAX_ARQUIVOS = 5000
MAX_PIXELS = 40_000_000
Image.MAX_IMAGE_PIXELS = MAX_PIXELS


def sha256(conteudo: bytes) -> str:
    return hashlib.sha256(conteudo).hexdigest()


def preparar(entrada: Path, saida: Path, qualidade: int = 88) -> dict:
    entrada = entrada.expanduser().resolve(strict=True)
    saida = saida.expanduser().absolute()
    if not entrada.is_dir():
        raise ValueError("A entrada deve ser uma pasta de imagens.")
    if saida.exists() or saida.is_symlink():
        raise ValueError("A saída já existe. Escolha uma pasta nova; nada foi sobrescrito.")
    pai = saida.parent.resolve(strict=True)
    saida = pai / saida.name
    if saida == entrada or entrada in saida.parents:
        raise ValueError("A saída deve ficar fora da pasta de entrada.")
    if not 1 <= qualidade <= 100:
        raise ValueError("A qualidade deve estar entre 1 e 100.")
    arquivos = sorted(p for p in entrada.iterdir() if p.suffix.lower() in EXTENSOES)
    if not arquivos:
        raise ValueError("Não há imagens PNG, JPEG ou WebP na entrada.")
    if len(arquivos) > MAX_ARQUIVOS:
        raise ValueError("Limite de 5.000 imagens excedido.")
    total = 0
    for arquivo in arquivos:
        if arquivo.is_symlink() or not arquivo.is_file():
            raise ValueError(f"Arquivo inválido ou link simbólico: {arquivo.name}")
        tamanho = arquivo.stat().st_size
        if tamanho > MAX_ARQUIVO:
            raise ValueError(f"Imagem maior que 64 MiB: {arquivo.name}")
        total += tamanho
        if total > MAX_TOTAL:
            raise ValueError("Limite total de 512 MiB excedido.")

    # A pasta temporária é removida se alguma imagem falhar. A saída só aparece
    # depois de todos os arquivos e o manifesto terem sido preparados.
    with tempfile.TemporaryDirectory(prefix=".nous-ativos-", dir=pai) as temp:
        temporaria = Path(temp) / "resultado"
        originais = temporaria / "originais"
        derivados = temporaria / "webp"
        originais.mkdir(parents=True)
        derivados.mkdir()
        por_hash: dict[str, dict] = {}
        fontes: list[dict] = []
        for arquivo in arquivos:
            conteudo = arquivo.read_bytes()
            digest = sha256(conteudo)
            if digest not in por_hash:
                nome_original = digest + arquivo.suffix.lower()
                nome_webp = digest + ".webp"
                original = originais / nome_original
                original.write_bytes(conteudo)
                with warnings.catch_warnings():
                    warnings.simplefilter("error", Image.DecompressionBombWarning)
                    with Image.open(arquivo) as imagem:
                        if getattr(imagem, "n_frames", 1) != 1:
                            raise ValueError(f"Imagem animada não suportada: {arquivo.name}")
                        if imagem.width * imagem.height > MAX_PIXELS:
                            raise ValueError(f"Imagem excede 40 milhões de pixels: {arquivo.name}")
                        imagem.load()
                        # Corrige orientação EXIF, preservando todo o conteúdo.
                        orientada = ImageOps.exif_transpose(imagem)
                        modo = "RGBA" if "A" in orientada.getbands() or "transparency" in orientada.info else "RGB"
                        pronta = orientada.convert(modo)
                        pronta.save(derivados / nome_webp, "WEBP", quality=qualidade, method=6)
                        largura, altura = pronta.size
                bytes_webp = (derivados / nome_webp).read_bytes()
                por_hash[digest] = {
                    "sha256_original": digest,
                    "original": f"originais/{nome_original}",
                    "derivado": f"webp/{nome_webp}",
                    "sha256_derivado": sha256(bytes_webp),
                    "largura": largura,
                    "altura": altura,
                    "bytes_original": len(conteudo),
                    "bytes_derivado": len(bytes_webp),
                    "reducao_percentual": round((1 - len(bytes_webp) / len(conteudo)) * 100, 2),
                    "fontes": [],
                }
            por_hash[digest]["fontes"].append(arquivo.name)
            fontes.append({"arquivo": arquivo.name, "sha256": digest, "derivado": por_hash[digest]["derivado"]})
        unicos = list(por_hash.values())
        bytes_originais_unicos = sum(item["bytes_original"] for item in unicos)
        bytes_derivados = sum(item["bytes_derivado"] for item in unicos)
        manifesto = {
            "versao": 1,
            "transformacao": "WebP sem recorte, redimensionamento ou ampliação; orientação EXIF normalizada",
            "qualidade_webp": qualidade,
            "quantidade_fontes": len(arquivos),
            "quantidade_unicos": len(unicos),
            "duplicatas": len(arquivos) - len(unicos),
            "bytes_fontes": total,
            "bytes_originais_unicos": bytes_originais_unicos,
            "bytes_derivados": bytes_derivados,
            "reducao_percentual_unicos": round((1 - bytes_derivados / bytes_originais_unicos) * 100, 2),
            "observacao": "Bytes medidos não representam velocidade medida. Compressão WebP pode alterar pixels; originais preservados.",
            "fontes": fontes,
            "ativos": unicos,
        }
        (temporaria / "manifesto.json").write_text(json.dumps(manifesto, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        # Não aceita uma pasta criada por outro processo durante o preparo.
        saida.mkdir(exist_ok=False)
        try:
            for item in temporaria.iterdir():
                shutil.move(str(item), str(saida / item.name))
        except Exception:
            shutil.rmtree(saida)
            raise
    return manifesto


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--entrada", required=True, type=Path, help="Pasta com as imagens fornecidas")
    parser.add_argument("--saida", required=True, type=Path, help="Pasta nova, fora da entrada")
    parser.add_argument("--qualidade", type=int, default=88, help="Qualidade WebP, de 1 a 100 (padrão: 88)")
    args = parser.parse_args()
    try:
        resultado = preparar(args.entrada, args.saida, args.qualidade)
    except (OSError, ValueError, UnidentifiedImageError, Image.DecompressionBombError, Image.DecompressionBombWarning) as erro:
        print(f"Erro: {erro}", file=sys.stderr)
        return 1
    print(f"Pronto: {resultado['quantidade_fontes']} fontes → {resultado['quantidade_unicos']} imagens únicas.")
    print(f"Duplicatas: {resultado['duplicatas']}. WebP: {resultado['bytes_derivados']} bytes.")
    print(f"Manifesto: {args.saida / 'manifesto.json'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
