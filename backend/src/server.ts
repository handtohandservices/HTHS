import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env';
import apiRoutes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/error';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true }));

if (!config.isProduction) {
  app.use(morgan('dev'));
}

app.get('/', (_req, res) => {
  res.json({ success: true, data: { name: 'Hand to Hand Services API', docs: '/api/health' } });
});

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(config.port, () => {
  console.log(`[api] Hand to Hand Services API running on http://localhost:${config.port} (${config.nodeEnv})`);
});

const shutdown = (signal: string) => {
  console.log(`[api] ${signal} received, shutting down...`);
  server.close(() => process.exit(0));
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

export default app;
