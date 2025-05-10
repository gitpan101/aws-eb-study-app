import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';

import router from './routes';

const PORT = process.env.PORT || 5000;
const app: Application = express();

app.use(cors());
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
