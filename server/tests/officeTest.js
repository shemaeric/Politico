import chai from 'chai';
import chaiHttp from 'chai-http';
import getToken from './baseTests';
import { pool, createTables } from '../db';

const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp);

describe('Office', () => {
  let token;
  let id;
  before(async () => {
    await createTables()
      .then(async () => {
        await getToken()
          .then((res) => {
            id = res.body.data[0].user.id;
            token = res.body.data[0].token;
            return token;
          })
          .catch((err) => { console.log(err); });
      })
      .catch((err) => {
        pool.end();
      });
  });

  after(async () => {
    try {
      await pool.query('TRUNCATE offices CASCADE; ALTER SEQUENCE offices_id_seq RESTART WITH 1;');
      await pool.query('TRUNCATE users CASCADE; ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });
  // get all office
  describe('GET all Political Offices', () => {
    it('should get all offices even without token', (done) => {
      chai.request('http://localhost:3000')
        .get('/api/v1/offices')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should get all offices', (done) => {
      chai.request('http://localhost:3000')
        .get('/api/v1/offices')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('POST a Political Office', () => {
    it('should not create an office without authenticating the user', (done) => {
      chai.request('http://localhost:3000')
        .post('/api/v1/offices')
        .send({
          name: 'democrats',
          type: 'state',
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should create a offices', (done) => {
      chai.request('http://localhost:3000')
        .post('/api/v1/offices')
        .set('x-access-token', token)
        .send({
          name: 'democrats',
          type: 'state',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('PATCH update an office', () => {
    it('should not update the office without a valid id', (done) => {
      chai.request('http://localhost:3000')
        .patch('/api/v1/offices/nooo')
        .set('x-access-token', token)
        .send({
          name: 'demo',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a('object');
          done();
        });
    });

    it('should not update the office without a valid id', (done) => {
      chai.request('http://localhost:3000')
        .patch('/api/v1/offices/1')
        .set('x-access-token', token)
        .send({
          name: 'demo',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });

  describe('DELETE delete an office', () => {
    it('should not delete the office without a valid id', (done) => {
      chai.request('http://localhost:3000')
        .delete('/api/v1/offices/nooo')
        .set('x-access-token', token)
        .send({
          name: 'demo',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a('object');
          done();
        });
    });

    it('should delete the office', (done) => {
      chai.request('http://localhost:3000')
        .delete('/api/v1/offices/1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });
});
