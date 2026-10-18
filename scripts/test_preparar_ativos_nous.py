"""Testes portáteis: python3 -B -m unittest discover -s scripts -p 'test_*.py'."""

import hashlib
import importlib.util
import tempfile
import unittest
from pathlib import Path

from PIL import Image

SPEC = importlib.util.spec_from_file_location("ativos", Path(__file__).with_name("preparar_ativos_nous.py"))
ativos = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(ativos)


class PrepararAtivosTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.raiz = Path(self.temp.name)
        self.entrada = self.raiz / "entrada"
        self.entrada.mkdir()
        self.saida = self.raiz / "saida"
        Image.new("RGB", (160, 90), "navy").save(self.entrada / "a.png")

    def tearDown(self):
        self.temp.cleanup()

    def test_preserva_original_e_dimensoes(self):
        antes = (self.entrada / "a.png").read_bytes()
        resultado = ativos.preparar(self.entrada, self.saida)
        item = resultado["ativos"][0]
        self.assertEqual((self.entrada / "a.png").read_bytes(), antes)
        self.assertEqual((self.saida / item["original"]).read_bytes(), antes)
        with Image.open(self.saida / item["derivado"]) as imagem:
            self.assertEqual(imagem.size, (160, 90))
        self.assertEqual(item["sha256_original"], hashlib.sha256(antes).hexdigest())
        self.assertEqual(item["sha256_derivado"], hashlib.sha256((self.saida / item["derivado"]).read_bytes()).hexdigest())

    def test_deduplica_somente_bytes_iguais(self):
        (self.entrada / "b.png").write_bytes((self.entrada / "a.png").read_bytes())
        Image.new("RGB", (160, 90), "orange").save(self.entrada / "c.png")
        resultado = ativos.preparar(self.entrada, self.saida)
        self.assertEqual(resultado["quantidade_fontes"], 3)
        self.assertEqual(resultado["quantidade_unicos"], 2)
        self.assertEqual(resultado["duplicatas"], 1)
        self.assertEqual(len(list((self.saida / "webp").iterdir())), 2)
        self.assertEqual(len(resultado["ativos"][0]["fontes"]), 2)

    def test_nao_sobrescreve_saida(self):
        self.saida.mkdir()
        marcador = self.saida / "preservar.txt"
        marcador.write_text("original")
        with self.assertRaises(ValueError):
            ativos.preparar(self.entrada, self.saida)
        self.assertEqual(marcador.read_text(), "original")

    def test_nao_aceita_saida_dentro_da_entrada(self):
        with self.assertRaises(ValueError):
            ativos.preparar(self.entrada, self.entrada / "derivados")

    def test_ignora_codigo_sem_executar(self):
        (self.entrada / "script.py").write_text("raise RuntimeError('não executar')")
        resultado = ativos.preparar(self.entrada, self.saida)
        self.assertEqual(resultado["quantidade_fontes"], 1)

    def test_falha_sem_deixar_saida_parcial(self):
        (self.entrada / "z.png").write_bytes(b"imagem invalida")
        with self.assertRaises(Exception):
            ativos.preparar(self.entrada, self.saida)
        self.assertFalse(self.saida.exists())

    def test_rejeita_link_simbolico(self):
        (self.entrada / "b.png").symlink_to(self.entrada / "a.png")
        with self.assertRaises(ValueError):
            ativos.preparar(self.entrada, self.saida)

    def test_preserva_transparencia(self):
        Image.new("RGBA", (80, 45), (0, 0, 0, 0)).save(self.entrada / "transparente.png")
        resultado = ativos.preparar(self.entrada, self.saida)
        item = next(x for x in resultado["ativos"] if "transparente.png" in x["fontes"])
        with Image.open(self.saida / item["derivado"]) as imagem:
            self.assertIn("A", imagem.getbands())
            self.assertEqual(imagem.getpixel((0, 0))[-1], 0)

    def test_rejeita_qualidade_invalida(self):
        with self.assertRaises(ValueError):
            ativos.preparar(self.entrada, self.saida, qualidade=101)


if __name__ == "__main__":
    unittest.main()
