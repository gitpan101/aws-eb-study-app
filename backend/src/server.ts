import express, { Application } from 'express';
import cors from 'cors';
import router from './routes';

const PORT = process.env.PORT || 5000;
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
// This code sets up an Express server that listens on a specified port and uses a router for API routes.
// It also includes middleware for parsing JSON and URL-encoded data.

app.get('/', (_req, res) => {
  res.send('Welcome to the Todo API');
  // This code defines a simple GET route for the root URL ("/") of the server.
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
