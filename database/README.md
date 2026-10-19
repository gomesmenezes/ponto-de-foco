# Modelo básico de dados

`schema.sql` é o desenho inicial do banco relacional com suporte geográfico. **Não há conexão com o protótipo e não foi aplicado a um servidor PostgreSQL nesta entrega.**

| Entidade | Finalidade | Relações |
| --- | --- | --- |
| agents | Identificação do agente, com referência futura ao provedor de autenticação | 1:N visitas |
| microareas | Microárea, código e centro geográfico opcional | 1:N imóveis |
| properties | Código do imóvel, quarteirão e localização opcional | N:1 microárea; 1:N visitas |
| visits | Resultado, observações e horários de coleta e recebimento | N:1 agente; N:1 imóvel |
| visit_findings | Tipo de recipiente e quantidade de focos | N:1 visita |

Escolhas: UUIDs atribuídos pelo cliente para permitir futura coleta independente de rede; horários com fuso (`timestamptz`); coordenadas WGS84 em `geography(Point,4326)`; índices nas relações e nas colunas espaciais. A visita aponta para o imóvel, que determina a microárea, evitando duplicar essa relação.

O modelo representa o destino no servidor. A fila local e os estados de envio ficarão no SQLite do futuro app; não são implementados aqui. A definição da fórmula de priorização não consta no TAP e depende de validação com a equipe parceira. Não foi criada tabela de risco calculado.

Antes da integração: definir autenticação, autorização por agente/microárea e papéis de banco, testar migração, definir política de atualização e conflito, validar a regra de focos somente em imóveis inspecionados e testar idempotência. Nenhum privilégio é concedido a uma aplicação nesta versão. Não usar banco com dados reais para testar este arquivo.

Referências técnicas: [PostgreSQL: restrições](https://www.postgresql.org/docs/current/ddl-constraints.html) e [PostGIS: geography](https://postgis.net/docs/using_postgis_dbmanagement.html#PostGIS_Geography).
