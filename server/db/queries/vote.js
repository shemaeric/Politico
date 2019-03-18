const createVote = `
  CREATE TABLE IF NOT EXISTS
    votes(
      id SERIAL UNIQUE,
      candidate INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
      office INTEGER REFERENCES offices(id) ON DELETE CASCADE,
      users INTEGER REFERENCES users(id) ON DELETE CASCADE,
      createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (candidate,office,users)

    )`;

const dropTableVote = 'DROP TABLE IF EXISTS candidates';

export default {
  createVote,
  dropTableVote,
};
