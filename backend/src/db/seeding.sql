-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the todos table
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert seed data into users table
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john.doe@example.com', 'hashed_password_1'),
('jane_smith', 'jane.smith@example.com', 'hashed_password_2');

-- Insert seed data into todos table
INSERT INTO todos (user_id, title, description, is_completed) VALUES
(1, 'Buy groceries', 'Milk, Bread, Eggs, and Butter', FALSE),
(1, 'Read a book', 'Finish reading the current novel', TRUE),
(2, 'Workout', 'Complete a 30-minute workout session', FALSE),
(2, 'Plan vacation', 'Research destinations and book tickets', FALSE);