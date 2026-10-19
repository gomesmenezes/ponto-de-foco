# Ponto de Foco — recorte da semana 1

## Objetivo e referência

Criar as telas base navegáveis e a infraestrutura inicial solicitadas para 19/10/2026. Referências: TAP fornecido pelo estudante e [Story Map / User Flow](https://whimsical.com/ponto-de-foco-story-map-user-flow-do-mvp-AqoQJKz7x3QnCbGWqKkcwB). Ator principal: Agente de Combate às Endemias; coordenação consulta os resultados.

## Escolhas técnicas assumidas

Protótipo responsivo e painel em React, TypeScript e Vite. API inicial em Node.js, TypeScript e Fastify, apenas com health check. Modelo relacional em PostgreSQL/PostGIS. App nativo planejado em Expo/React Native e SQLite, ainda sem implementação. Leaflet/OpenStreetMap na tela de mapa. GitHub privado, sem publicação da aplicação nesta semana.

## Telas e navegação

Login; seleção de microárea e preparação local; lista de visitas; formulário de imóvel, inspeção, focos e observações; confirmação; fila de sincronização; mapa com prioridades; histórico. As US01–US15 aparecem como telas ou estados ilustrativos. Incluir retornos visuais de login inválido, preenchimento incompleto, cancelamento, ausência de conexão e sincronização rejeitada para demonstrar o desenho das rotas.

## Limites

Todos os dados são fictícios. Login demonstrativo sem autenticação; registros e preparação ficam apenas na memória da aba. Sincronização e prioridades são simulações, sem API de negócio, banco conectado, garantia off-line, classificação epidemiológica, dados de pessoas, publicação ou coleta de feedback. As funcionalidades reais pertencem às semanas seguintes. Não inventar integrantes ou validação institucional; unidade parceira segue pendente conforme TAP.

## Direção visual

Interface sóbria para trabalho de campo: verde profundo, superfícies claras, tipografia legível, botões grandes, ícones com rótulos. Painel com mapa amplo e lista de prioridades; formulário guiado e responsivo. Aviso de protótipo persistente. Desktop com barra lateral; celular com navegação compacta sem rolagem horizontal.

## Critérios de entrega

Repositório com commits iniciais, README da stack e execução, protótipo navegável, modelo básico de dados e roteiro curto da demonstração. Verificar build, tipos, transições críticas, health check e navegação em desktop/celular. Registrar limites honestamente.
