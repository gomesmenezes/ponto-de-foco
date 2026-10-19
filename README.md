# Ponto de Foco

**Entrega da semana 1 · 19/10/2026 · Projeto Integrador · Unifacisa**

**Para apresentar:** [PDF curto para upload](output/pdf/Ponto-de-Foco-Semana-1.pdf) · [Resumo da entrega](ENTREGA-SEMANA-1.md) · [Roteiro de demonstração](docs/semana-1.md)

Protótipo navegável de coleta de visitas para Agentes de Combate às Endemias e painel de priorização geográfica em Campina Grande, PB. O projeto parte do Termo de Abertura e do [User Story Mapping / User Flow](https://whimsical.com/ponto-de-foco-story-map-user-flow-do-mvp-AqoQJKz7x3QnCbGWqKkcwB).

> Esta entrega cobre as telas base, a navegação e o ambiente inicial. Login, preparação, registros e sincronização são demonstrações em memória. Não há autenticação real, banco conectado, coleta real, garantia off-line ou aplicação publicada. Atualizar a página reinicia os dados fictícios.

## Executar o protótipo

Pré-requisitos: **Node.js 22.12+** e npm. Testado localmente com Node.js 24.

```bash
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente **http://127.0.0.1:5173**. Os campos de acesso já vêm com dados fictícios; clique em **Entrar no protótipo**. Não informe credenciais reais. A versão de celular usa a mesma URL em uma janela estreita ou em emulação do navegador; o servidor está restrito à máquina local por padrão.

Para ver o build local:

```bash
npm run build
npm run preview --workspace @ponto-de-foco/web
```

O código pode ser consultado pelo link do repositório no GitHub. Este link não é uma URL de aplicação hospedada. O roteiro completo de apresentação e a conferência dos requisitos estão em [docs/semana-1.md](docs/semana-1.md).

## Stack escolhida e alinhamento ao TAP

| Camada                        | Tecnologia                                                | Situação na semana 1                                       | Relação com o TAP                                         |
| ----------------------------- | --------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| Telas do agente / protótipo   | React 19, TypeScript, Vite                                | Implementado e navegável no navegador                      | Prototipação das telas de coleta e navegação do User Flow |
| Painel web                    | React, Leaflet, OpenStreetMap                             | Mapa com exemplos, prioridades fixas e histórico filtrável | Visualização geográfica aberta                            |
| API                           | Node.js, TypeScript, Fastify                              | Esqueleto com `GET /health`                                | Base para serviço de integração e hospedagem posteriores  |
| Banco central                 | PostgreSQL com PostGIS                                    | Modelo SQL inicial, sem conexão ou migração executada      | Banco relacional com dados geográficos                    |
| App Android / multiplataforma | React Native com Expo, TypeScript                         | Escolha documentada; app nativo ainda não implementado     | Desenvolvimento móvel e testes em aparelho Android        |
| Armazenamento no aparelho     | SQLite via expo-sqlite                                    | Planejado; sem persistência nesta entrega                  | Coleta off-line e futura fila de sincronização            |
| Versionamento / verificações  | Git, GitHub, npm workspaces, Node test runner, TypeScript | Commits iniciais e workflow de verificação                 | Acompanhamento técnico do projeto                         |

As versões instaladas estão fixadas no `package-lock.json`. Referências: [Vite](https://vite.dev/guide/), [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/), [Leaflet](https://leafletjs.com/reference.html) e [PostGIS](https://postgis.net/docs/).

## Estrutura

```text
apps/web/           Telas navegáveis, dados fictícios e estado demonstrativo
apps/api/           Esqueleto da API, sem endpoints de negócio
apps/mobile/        Decisão da stack nativa; ainda sem app executável
database/           Modelo relacional inicial e notas de integração
docs/semana-1.md    Mapeamento das histórias, rotas e roteiro para a aula
docs/evidencias/    Capturas do protótipo verificadas no navegador
.github/workflows/ Verificação automática de testes, tipos e build
```

## Rotas e cobertura do MVP

As rotas usam `#` para permitir navegação sem configuração especial de servidor.

| Rota                   | Tela / estado                                              | Histórias  |
| ---------------------- | ---------------------------------------------------------- | ---------- |
| `#/acesso`             | Acesso demonstrativo e exemplo de erro de login            | US01       |
| `#/preparacao`         | Microárea, rota e preparação simulada                      | US02–US03  |
| `#/visitas`            | Lista da rota e início de visita                           | US04, US09 |
| `#/visita/nova`        | Identificação, inspeção, focos e observações               | US05–US08  |
| `#/visita/confirmacao` | Confirmação e retorno à lista                              | US08–US09  |
| `#/sincronizacao`      | Fila, rede simulada, aceite/rejeição e consolidação visual | US09–US12  |
| `#/painel`             | Mapa e prioridades ilustrativas                            | US13–US14  |
| `#/historico`          | Consulta por microárea e período                           | US15       |

Rotas internas exigem sessão demonstrativa. Lista e formulário também exigem microárea preparada. Login sem êxito retorna à tela de acesso; formulário incompleto permanece na etapa; cancelar descarta o rascunho; rede ausente e rejeição preservam a fila em memória. A preparação não baixa mapas ou dados para uso off-line.

## API inicial e verificações

```bash
npm run dev:api
# Em outro terminal:
curl http://127.0.0.1:3333/health

npm test
npm run typecheck
npm run build
# Ou executar os três:
npm run check
```

A API responde com `stage: "semana-1"` e `database: "not-connected"`. Não é necessária para navegar no protótipo e não recebe os dados do formulário.

## Limites e continuidade

- Registros novos ficam somente na memória da aba; sair ou recarregar restaura os exemplos.
- Os controles de rede são cenários de demonstração, independentes da conexão real. O mapa base e as fontes usam internet e não são armazenados para uso off-line.
- Os pontos representam centros ilustrativos de microáreas, sem endereços reais. Não há dados de moradores, visitas reais ou vínculo institucional confirmado.
- Categorias de prioridade e ordem são exemplos fixos da interface. Não constituem classificação epidemiológica ou critério de decisão validado.
- A coordenação é uma seção de demonstração, sem controle de perfis ou gestão de múltiplas equipes.
- Conforme o TAP, a unidade parceira permanece pendente de confirmação. Não há evidência de teste com público real nesta etapa.
- Funcionalidade integrada e persistência pertencem à semana 2; publicação e preparação da avaliação à semana 3; aplicação e resultados à semana 4. Não foram antecipados.
- Fotos, download de mapa completo, sugestão de rotas, integrações oficiais, relatórios avançados e gestão de múltiplas equipes seguem fora da linha de corte do MVP.

## Identificação

Curso: Sistemas de Informação — Unifacisa. Estudante informado no TAP: José Gomes de Menezes. Docente orientador: David Victor dos Santos Andrade. Os commits registram a configuração Git local do estudante; integrantes adicionais não foram inventados. Desenvolvimento elaborado com apoio de IA, sujeito à revisão e apresentação do estudante.

O repositório é privado. Para avaliação, o docente deve ter acesso autorizado ao repositório; o arquivo `ENTREGA-SEMANA-1.md` reúne o link e o texto de acompanhamento. Nenhuma atividade foi enviada à plataforma da universidade por esta ferramenta.
