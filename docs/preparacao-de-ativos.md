# Script de preparação dos ativos NØUS

`preparar_ativos_nous.py` prepara imagens PNG/JPEG/WebP para uma integração posterior ao site. Ele não altera a aplicação React, não executa arquivos anexados, não instala dependências automaticamente, não opera Git e não publica conteúdo.

```bash
python3 -m pip install Pillow
python3 scripts/preparar_ativos_nous.py --entrada ./imagens --saida ./ativos-preparados
```

A pasta de saída deve ser nova e estar fora da entrada. Nela, `originais/` mantém cópias byte a byte dos arquivos únicos; `webp/` guarda os derivados, e `manifesto.json` registra fontes, duplicatas, hashes SHA-256, dimensões e bytes. Nenhum recorte, redimensionamento ou ampliação é realizado. A orientação EXIF é normalizada. A compressão WebP pode alterar pixels; não substitui os originais nem comprova velocidade do site.

Por padrão, considera somente imagens diretamente na pasta de entrada, sem percorrer subpastas. Recusa links simbólicos, imagens animadas, saída existente, qualidade fora de 1–100, imagens acima de 64 MiB ou 40 milhões de pixels, mais de 5.000 arquivos e entradas acima de 512 MiB no total. Uma falha de preparação não deixa uma saída incompleta. A qualidade padrão é 88 e pode ser alterada com `--qualidade`.

```bash
python3 -B -m unittest discover -s scripts -p 'test_*.py'
```

O pacote depende de Pillow, declarado em `scripts/requirements.txt`. Os arquivos originais e derivados da execução local não são enviados automaticamente ao repositório. O relatório da rodada de demonstração acompanha este PR; os PNG fornecidos continuam preservados fora da cópia de trabalho.
