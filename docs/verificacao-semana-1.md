# Registro de verificação - semana 1

Data: 19/10/2026. Escopo: protótipo navegável e infraestrutura inicial.

## Verificações automáticas

- `npm test`: sete testes aprovados. Cobertura: rotas e pré-condições, variações de caixa/barra final, troca de área, cancelamento, fila sem rede/rejeitada/aceita, gravação demonstrativa idempotente e API de health check sem endpoint de negócio.
- `npm run typecheck`: frontend e API aprovados.
- `npm run build`: frontend Vite e API TypeScript compilados.
- `git diff --check`: sem erros de whitespace.
- API local: `GET /health` respondeu com status ok, stage semana-1 e database not-connected.

## Verificação manual no navegador

Desktop: viewport de 1280 x 900. Celular: viewport de 390 x 844, sem rolagem horizontal nas telas conferidas de preparação, formulário, histórico e painel.

- Acesso demonstrativo e mensagem de erro de login.
- Escolha de Catolé, preparação e abertura da lista.
- Campo obrigatório vazio impediu avanço e exibiu a mensagem do navegador.
- Preenchimento de uma visita com foco e recipiente, confirmação e aumento da fila.
- Cancelamento de outra visita manteve a quantidade de registros.
- Ausência de rede e rejeição mantiveram a fila; aceite a esvaziou e atualizou os totais do painel.
- Seleção de microárea no painel, filtro do mapa e abertura de marcador com dados fictícios.
- Histórico filtrado por microárea e limpeza dos filtros.
- Rota em caixa alta/com barra final redirecionou à preparação quando faltavam seus pré-requisitos.
- Atalho “Pular para o conteúdo” focou o main sem alterar a rota.

## Revisão independente

Uma revisão somente leitura identificou uma comparação incompleta de rotas e um conflito do atalho de acessibilidade com HashRouter. Ambos foram corrigidos. A regressão de rotas foi reproduzida antes da correção e passou depois. O atalho foi verificado no navegador. Nenhum achado crítico permaneceu.

## Evidências e limites

Capturas em `docs/evidencias/`: painel desktop, painel celular e formulário celular. São evidências de telas do protótipo, não de aplicação com usuários reais.

O SQL foi revisado como modelo, mas não aplicado a PostgreSQL. Não houve teste em aparelho Android físico, teste real off-line, autenticação real, integração com API de negócio ou avaliação em campo, pois esses recursos não fazem parte desta entrega.
