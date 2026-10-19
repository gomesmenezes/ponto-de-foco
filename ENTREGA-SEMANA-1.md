# Ponto de Foco - Entrega da semana 1

**Projeto Integrador - Sistemas de Informação - Unifacisa**  
**Estudante:** José Gomes de Menezes  
**Docente:** David Victor dos Santos Andrade  
**Etapa:** 19/10/2026 - Telas base e infraestrutura

**Repositório:** https://github.com/gomesmenezes/ponto-de-foco

**Arquivo para upload:** [Ponto-de-Foco-Semana-1.pdf](output/pdf/Ponto-de-Foco-Semana-1.pdf)

Nesta primeira semana, foram preparadas as telas navegáveis do MVP do Ponto de Foco e a estrutura inicial do projeto. O protótipo representa acesso, seleção de microárea, preparação, cadastro de visita, inspeção, focos, confirmação, fila de sincronização, mapa de prioridades e histórico. A navegação segue as decisões e os retornos do User Flow, com dados fictícios.

A stack usa React, TypeScript e Vite nas telas, Leaflet/OpenStreetMap no mapa e um esqueleto de API em Node.js/TypeScript/Fastify. O modelo inicial do banco foi definido para PostgreSQL com PostGIS. Expo/React Native e SQLite foram escolhidos para o futuro app móvel; ainda não há app nativo implementado.

O README contém a stack detalhada, a estrutura do código, as rotas e os comandos de execução. Para apresentar: `npm ci` e `npm run dev`. O roteiro está em `docs/semana-1.md`.

Esta entrega limita-se à semana 1. Login, gravação e sincronização são simulações em memória, sem banco conectado, persistência off-line ou aplicação publicada. Os dados são reiniciados ao atualizar a página. Não houve validação com público real.

O repositório está privado; é necessário autorizar o acesso do docente para avaliação. O material foi preparado para revisão e upload pelo estudante; não houve envio à plataforma acadêmica.
