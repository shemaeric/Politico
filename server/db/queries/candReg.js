const createCandidates = `
  CREATE TABLE IF NOT EXISTS
    candidates(
      id SERIAL UNIQUE,
      candidate INTEGER REFERENCES users(id) ON DELETE CASCADE,
      office INTEGER REFERENCES offices(id) ON DELETE CASCADE,
      createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (candidate,office )

    )`;

const dropTableCandidate = 'DROP TABLE IF EXISTS candidates';

export default {
  createCandidates,
  dropTableCandidate,
};
