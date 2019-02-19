const createTableUsers = `
  CREATE TABLE IF NOT EXISTS
    users(
      id UUID PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      other_name VARCHAR(255),
      email VARCHAR(255) NOT NULL UNIQUE,     
      phone VARCHAR(255),
      passport VARCHAR(255),
      password VARCHAR(255),
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    )`;

const insertUser = `INSERT INTO users(
  id,
  first_name,
  last_name,
  other_name,
  email,
  phone,
  passport,
  password,
  createdAt,
  updatedAt
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT DO NOTHING returning *`;

const dropTableUsers = 'DROP TABLE IF EXISTS users';

export default {
  createTableUsers,
  insertUser,
  dropTableUsers,
};
