import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';

import router from './routes';

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const app: Application = express();

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static(path.join(import.meta.dirname, '../build')));

app.use('/api', router);
// This code sets up an Express server that listens on a specified port and uses a router for API routes.
// It also includes middleware for parsing JSON and URL-encoded data.

app.get('/', (_req, res) => {
  res.sendFile(path.join(import.meta.dirname, '../build', 'index.html'));
});

app.get('*any', (_req, res) => {
  res.sendFile(path.join(import.meta.dirname, '../build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
