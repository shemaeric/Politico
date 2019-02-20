const createTableOffices = `
  CREATE TABLE IF NOT EXISTS
    offices(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

    )`;

const insertOffice = `INSERT INTO offices(
  id,
  name,
  type,
  createdAt,
  updatedAt
) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING returning *`;

const dropTableOffice = 'DROP TABLE IF EXISTS offices';

export default {
  createTableOffices,
  insertOffice,
  dropTableOffice,
};
