import { Pool } from 'pg';
import dotenv from 'dotenv';
import queryUser from './queries/user';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


pool.on('connect', () => {
  console.log('connected to the db');
});


const dbInit = {

  createTableUsers: () => {
    const queryText = queryUser.createTableUsers;
    pool.query(queryText)
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
