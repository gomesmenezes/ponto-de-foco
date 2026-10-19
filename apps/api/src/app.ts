import Fastify from 'fastify';
export function buildApp() {
  const app = Fastify({ logger: false });
  app.get('/health', async () => ({ status: 'ok', project: 'ponto-de-foco', stage: 'semana-1', database: 'not-connected' }));
  return app;
}
