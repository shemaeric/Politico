const createTableParties = `
  CREATE TABLE IF NOT EXISTS
    parties(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      hqAdress VARCHAR(255) NOT NULL,
      logoUrl VARCHAR(255),
      createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

    )`;

const insertUParty = `INSERT INTO parties(
  id,
  name,
  hqAdress,
  logoUrl,
  createdAt,
  updatedAt
) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING returning *`;

const dropTableParties = 'DROP TABLE IF EXISTS parties';

export default {
  createTableParties,
  insertUParty,
  dropTableParties,
};
