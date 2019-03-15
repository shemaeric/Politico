import chai from 'chai';
import chaiHttp from 'chai-http';
import { pool, createTables } from '../db';

const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp);

const getToken = () => {
  let token;
  const user = {
    firstname: 'munaca',
    lastname: 'clintonss',
    othername: 'none',
    email: 'musaza@gmail.com',
    phone: '66555',
    passport: "it's coming soon",
    password: 'hello',
    isadmin: 'false',
  };
  return chai.request('http://localhost:3000')
    .post('/api/v1/auth/signup')
    .send(user);
};

export default getToken;
