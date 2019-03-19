import chai from 'chai';
import chaiHttp from 'chai-http';
import { createTables, pool } from '../db';

const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp);

let token;

describe('User', () => {
  before(async () => {
    await createTables()
      .then(() => { console.log('already connected'); })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  });

  after(async () => {
    try {
      await pool.query('TRUNCATE users CASCADE; ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });

  describe('POST user', () => {
    it('Should not create a user while user exists', (done) => {
      const userExists = {
        firstname: 'muna',
        lastname: 'clintonss',
        othername: 'none',
        email: 'musaza@gmail.com',
        phone: '66555',
        passport: "it's coming soon",
        password: 'hello',
        isadmin: 'false',
      };
      chai.request('http://localhost:3000')
        .post('/api/v1/auth/signup')
        .send(userExists)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
    it('Should create a User', (done) => {
      const user = {
        firstname: 'munana',
        lastname: 'clinton',
        othername: 'none',
        email: 'musazi@gmail.com',
        phone: '66555',
        passport: "it's coming soon",
        password: 'hello',
        isadmin: 'false',
      };
      chai.request('http://localhost:3000')
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          token = res.body.data[0].token;
          done();
        });
    });
  });

  describe('LOGIN user', () => {
    it('Should login a User', (done) => {
      const user = {
        email: 'musazi@gmail.com',
        password: 'hello',
      };
      chai.request('http://localhost:3000')
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
