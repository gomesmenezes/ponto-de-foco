import { buildApp } from './app.js';
const app = buildApp();
try { await app.listen({ host: '127.0.0.1', port: Number(process.env.PORT ?? 3333) }); console.log('API inicial: http://127.0.0.1:3333/health'); }
catch (error) { console.error(error); process.exitCode = 1; }
for (const signal of ['SIGTERM', 'SIGINT'] as const) process.on(signal, async () => { await app.close(); process.exit(0); });
