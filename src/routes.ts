import { Router } from 'express';
import { query } from './db';

const router = Router();

//auth
router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  const result = await query(
    'SELECT * FROM users WHERE email = $1 and password = $2',
    [email, password],
  );

  if (result.rows.length > 0) {
    res.json({ message: 'Login successful', user: result.rows[0] });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// users
router.route('/users').get(async (_req, res) => {
  const result = await query('SELECT * FROM users');
  res.json(result.rows);
});

router.route('/users/:id').get(async (req, res) => {
  const { id } = req.params;
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);

  res.json(result.rows[0]);
});

// todos
router
  .route('/todos/:userId')
  .get(async (req, res) => {
    const { userId } = req.params;
    const result = await query('SELECT * FROM todos WHERE user_id = $1', [
      userId,
    ]);

    res.json(result.rows);
  })
  .post(async (req, res) => {
    const { userId } = req.params;
    const { title, description } = req.body;

    // Validate input
    if (!title || !description) {
      res.status(400).json({ message: 'Title and description are required' });
      return;
    }

    const result = await query(
      'INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, description],
    );
    res.status(201).json(result.rows[0]);
  });

export default router;
// This code defines an Express router with two main routes: `/users` and `/todos/:userId`.
