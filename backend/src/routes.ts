import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { query } from './db';
import { authMiddleware } from './auth-middleware';

const router = Router();

// Public routes
//auth
router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  const result = await query(
    'SELECT id, email, username FROM users WHERE email = $1 and password = $2',
    [email, password],
  );

  if (result.rows.length > 0) {
    const token = jwt.sign(
      { user: result.rows[0] },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' },
    );

    res.json({ message: 'Login successful', user: result.rows[0], token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Private routes start
router.use(authMiddleware);

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

    const result = await query(
      `SELECT
       todos.id, todos.title, todos.description, todos.is_completed,
       todos.created_at as todo_created_at, todos.user_id,
       users.email, users.username, users.created_at as user_created_at
       FROM todos INNER JOIN users
       ON todos.user_id = users.id WHERE todos.user_id = $1
       ORDER By todo_created_at`,
      [userId],
    );
    res.json(result.rows);
  })
  .post(async (req, res) => {
    const { userId } = req.params;
    const { title, description } = req.body;

    // Validate input
    if (!title || !description) {
      res.status(400).json({ message: 'Title and description are required.' });
      return;
    }

    const result = await query(
      'INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, description],
    );
    res.status(201).json(result.rows[0]);
  });

router
  .route('/todos/:todoId')
  .put(async (req, res) => {
    const { todoId } = req.params;
    const { title, description, isCompleted } = req.body;

    // Validate input
    if (!title && !description && isCompleted === undefined) {
      res.status(400).json({
        message: 'Title or description or isCompleted is/are required.',
      });
      return;
    }

    const result = await query(
      `UPDATE todos SET title = $1, description = $2, is_completed = $3 WHERE id = $4 RETURNING *`,
      [title, description, isCompleted, todoId],
    );
    res.json(result.rows[0]);
  })
  .delete(async (req, res) => {
    const { todoId } = req.params;

    const result = await query(`DELETE FROM todos WHERE id = $1`, [todoId]);

    if (result.rowCount && result.rowCount > 0)
      res.json('Todo deleted successfully.');
    else
      res.status(400).json({
        message: 'Todo not found, no todos were deleted.',
      });
  });

export default router;
// This code defines an Express router with two main routes: `/users` and `/todos/:userId`.
