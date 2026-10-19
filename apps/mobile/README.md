# App móvel — escolha arquitetural

Stack escolhida para a implementação nativa posterior: **React Native com Expo, TypeScript e expo-sqlite**. O alvo inicial será o aparelho Android previsto no TAP.

Na semana 1, as telas do agente estão no protótipo responsivo de `apps/web`, que pode ser aberto em navegador de celular ou em uma janela estreita. Esta pasta registra a decisão; **não contém um projeto Expo executável, APK, persistência SQLite ou funcionamento off-line implementado**.

O modelo de coleta inclui microárea, quarteirão, identificação do imóvel, resultado, recipiente, focos e observações. Durante a implementação futura, deverão ser definidos o esquema local, a fila de saída, identificadores idempotentes, armazenamento seguro de sessão e sincronização real.

Documentação oficial: [Expo / SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) e [arquitetura local-first](https://docs.expo.dev/guides/local-first/).
