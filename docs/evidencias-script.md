# Evidências do script de ativos NØUS

Rodada de 17/10/2026, 22:35 BRT, no Sandbox. Escopo: `scripts/preparar_ativos_nous.py`, não a aplicação React.

`python3 -B -m unittest discover -s scripts -p 'test_*.py' -v` concluiu 9 testes com sucesso. A suíte cobre preservação byte a byte do original, dimensões do derivado, hashes, deduplicação, recusa de saída existente ou interna à entrada, não execução de código, remoção de saída parcial, recusa de links simbólicos, transparência e qualidade inválida. Pillow usado: 12.3.0, fixado em `scripts/requirements.txt`.

O script também foi executado nos cinco PNG enviados. Produziu quatro imagens únicas e identificou uma duplicata por SHA-256. Os originais únicos somam 7.961.216 bytes; os derivados WebP somam 274.818 bytes, redução de 96,55% dos bytes. As dimensões de cada fonte única foram mantidas: uma de 1536 × 864 e três de 1672 × 941. Não foram feitos recortes, ampliações ou redimensionamentos. A compressão é com perda; os originais permanecem preservados. Não foi feita avaliação de velocidade nem alegação de equivalência visual pixel a pixel.

SHA-256 do script executado: `1fc10e01d8e3dda6c930e965eb8580d6b68817f833dee97a0090d25d2e200503`. A cópia entregue em anexo e a cópia da branch têm os mesmos bytes.

Os PNG originais e os artefatos locais não são incluídos neste PR. Este PR não integra imagens ao hero, não altera formulários ou navegação, não valida o build React e não publica o site. Essas melhorias da experiência web continuam pendentes. O script é uma preparação verificável dos ativos, não uma entrega de site concluído.
