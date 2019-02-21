import { Pool } from 'pg';
import dotenv from 'dotenv';
import queryUser from './queries/user';
import queryParty from './queries/party';
import queryOffice from './queries/office';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


pool.on('connect', () => {
  console.log('connected to the db');
});


const dbInit = {

  createTableUsers: () => {
    // const queryText = queryUser.createTableUsers;
    const queryTextP = queryOffice.createTableOffices;
    // pool.query(queryText)
    pool.query(queryTextP)
      .then(() => {
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  },

  dbInit() {
    this.createTableUsers();
  },

};


export default dbInit;
