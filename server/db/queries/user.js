const createTableUsers = `
  CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      otherName VARCHAR(255),
      email VARCHAR(255) NOT NULL UNIQUE,     
      phone VARCHAR(255),
      passport VARCHAR(255),
      password VARCHAR(255),
      isAdmin VARCHAR(255),
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

    )`;

const insertUser = `INSERT INTO users(
  id,
  firstName,
  lastName,
  otherName,
  email,
  phone,
  passport,
  password,
  isAdmin,
  createdAt,
  updatedAt
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT DO NOTHING returning *`;

const dropTableUsers = 'DROP TABLE IF EXISTS users';

export default {
  createTableUsers,
  insertUser,
  dropTableUsers,
};
