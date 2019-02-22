import { Pool } from 'pg';
import dotenv from 'dotenv';
import queryUser from '../db/queries/user';
import queryParty from '../db/queries/party';
import queryOffice from '../db/queries/office';
import queryCand from '../db/queries/candReg';
import queryVote from '../db/queries/vote';


dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_2,
});
pool.on('connect', () => {
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
// const createTableCandidate = async () => {
//   const queryText = queryCand.createCandidates;
//   await pool.query(queryText)
//     .then(() => {
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };
// const createTableVote = async () => {
//   const queryText = queryVote.createVote;
//   await pool.query(queryText)
//     .then(() => {
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };


(async () => {
  await createTableUsers();
  await createTableParty();
  await createTableOffice();
  // await createTableCandidate();
  // await createTableVote();
  pool.end();
  console.log('Tables has been created');
})().catch((err) => {
  console.log(err);
});
