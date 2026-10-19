# 0005. Histórico de preços desde a primeira fonte

Status: aceita em 19/10/2026. Muda a ordem do briefing, que deixava histórico para a Fase 3.

## Contexto

Quem não grava hoje não tem histórico daqui a três meses. Rafael pediu que a coleta comece assim que existir uma fonte autorizada. O briefing, porém, diz que a busca pública não deve gravar no Supabase a cada requisição.

## Decisão

- Gravar o preço consultado (um "snapshot") já na Etapa 3, junto com a primeira fonte.
- A gravação acontece só quando a consulta foi a uma fonte (cache miss) e é feita em segundo plano, sem atrasar a resposta.
- Um snapshot por oferta e por janela de tempo, para não encher o banco: guardar só quando o preço mudar ou a cada tantas horas.
- A tela de histórico (mínimo, média e mediana) fica para a Etapa 6, calculada sobre o que já foi guardado.

## Cada fonte tem uma política de armazenamento

Antes de gravar, o adaptador declara o que os termos permitem:

- Amazon: cache máximo de 24 horas. **Não alimenta histórico.**
- Mercado Livre: atualizar a cada 24 h (6 h para listas) e remover o que sair do ar. Histórico exige autorização por escrito.
- Lomadee, Shopee, Awin: a documentação não diz. Perguntar ao suporte e registrar a resposta antes de ligar a gravação.

Fonte com política desconhecida não grava. Essa é a regra padrão.

## Custo

O Supabase Free tem 500 MB. Um snapshot pequeno por oferta e janela cabe por bastante tempo, mas o tamanho real só se mede com dados. A Etapa 2 inclui uma estimativa por produto monitorado.
