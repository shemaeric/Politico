import { Pool } from 'pg';
import dotenv from 'dotenv';
import queryUser from './queries/user';
import queryParty from './queries/party';
import queryOffice from './queries/office';
import queryCand from './queries/candReg';
import queryVote from './queries/vote';

dotenv.config();

let pool;

if (process.env.NODE_ENV === 'development') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_TEST,
  });
}
console.log('ddnfdnjnjndnvbnfjd', pool);
pool.on('connect', () => {
  console.log('connected to the db');
});

const createTableUsers = async () => {
  const queryText = queryUser.createTableUsers;
  await pool.query(queryText)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createTableParty = async () => {
  const queryText = queryParty.createTableParties;
  await pool.query(queryText)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createTableOffice = async () => {
  const queryText = queryOffice.createTableOffices;
  await pool.query(queryText)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createTableCandidate = async () => {
  const queryText = queryCand.createCandidates;
  await pool.query(queryText)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createTableVote = async () => {
  const queryText = queryVote.createVote;
  await pool.query(queryText)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createTables = async () => {
  await createTableUsers();
  await createTableParty();
  await createTableOffice();
  await createTableCandidate();
  await createTableVote();
  console.log('Tables have been created');
};

export { createTables, pool };

export default {
  query: (text, params) => pool.query(text, params),
};
