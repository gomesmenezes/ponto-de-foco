# Semana 1 — Telas base e infraestrutura

**Data:** 19/10/2026. **Valor previsto no enunciado:** 0,25 ponto. **Projeto:** Ponto de Foco.

## O que foi preparado

1. Telas navegáveis do agente e da coordenação, cobrindo as US01–US15 acima da linha de corte.
2. Repositório inicial com frontend React/TypeScript, esqueleto de API, modelo de banco e commits.
3. Rotas com início, decisões e redirecionamentos correspondentes ao User Flow.
4. README com tecnologias escolhidas, justificativas, instruções e distinção entre o implementado e o planejado.

As US01–US15 foram representadas em interface. Isso não significa que todas as funcionalidades do MVP estão integradas. A integração e a persistência ainda não existem nesta semana.

## Correspondência com as cinco decisões do User Flow

| Decisão | Caminho Sim | Caminho Não | Representação nesta entrega |
| --- | --- | --- | --- |
| Dados de acesso válidos? | Selecionar microárea | Mostrar erro e permitir tentar novamente | Campos demonstrativos; botão “Visualizar cenário de erro de acesso” |
| Campos obrigatórios válidos? | Avançar no formulário | Permanecer na etapa e solicitar preenchimento | Campos obrigatórios básicos do navegador; sem validação de negócio/API |
| Cancelou antes de salvar? | Descartar rascunho e retornar à lista | Continuar até a confirmação | Diálogo “Descartar esta visita?”; descarte sem registro parcial |
| Há conexão? | Simular envio | Preservar fila e continuar visitas | Seletor de conexão fictícia na tela de sincronização |
| Sincronização aceita? | Atualizar registros e painel demonstrativos | Exibir falha e preservar fila | Botões de envio aceito/rejeitado; nenhuma requisição de envio |

## Roteiro de apresentação — aproximadamente 3 minutos

1. Execute `npm ci` e `npm run dev`. Abra o endereço indicado no terminal.
2. Na tela inicial, mostre o aviso de protótipo. Use “Visualizar cenário de erro de acesso” e depois “Entrar no protótipo”.
3. Selecione **Catolé**. Clique em **Preparar rota · simulação** e em **Começar visitas**.
4. Clique em **Nova visita**. Tente continuar sem preencher para demonstrar a permanência na etapa. Preencha **Q-03** e **Imóvel fictício 09**.
5. Avance, selecione **Imóvel inspecionado** e preencha **1 foco** e um recipiente. Clique em **Adicionar à demonstração**. Mostre a confirmação e o aviso de memória temporária.
6. Retorne às visitas. Abra outra visita, preencha um rascunho e cancele. Confirme o descarte e observe que a lista não ganhou uma visita parcial.
7. Em **Sincronização**, escolha **Sem conexão · simulado** e tente enviar. A fila permanece.
8. Selecione **Com conexão · simulado** e **Simular rejeição do servidor**. A fila continua. Depois clique em **Simular envio aceito**.
9. Em **Mapa e prioridades**, selecione uma microárea e abra um marcador. Explique que os focos são fictícios e as categorias são fixas para ilustrar o layout.
10. Abra **Histórico**, filtre a microárea e as datas. Termine mostrando o README e o modelo básico no repositório.

## Conferência para a entrega

- Link do repositório e README: `ENTREGA-SEMANA-1.md`.
- Telas iniciais implementadas: `apps/web/src/pages`.
- Modelo do banco: `database/schema.sql` e `database/README.md`.
- Para executar não é preciso configurar banco, conta de nuvem ou API externa de negócio.
- Não foi gerado link público de aplicação nem APK nesta etapa. A demonstração funciona localmente.
- O professor precisará de acesso ao GitHub privado. Não houve envio à plataforma acadêmica.

## Situação acadêmica e institucional

O TAP informa José Gomes de Menezes como estudante. Não foram atribuídos commits a pessoas não identificadas. A unidade de Vigilância Ambiental parceira permanece a confirmar; não houve teste com agentes ou coleta de resultados. A equipe deve revisar as escolhas e o material antes de apresentá-lo.
