import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import Party from '../models/partyModel';
import pool from '../db/index';

let token = '';


const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp);

describe('Party', () => {
  before(async () => {
    try {
      // delete data inside offices table and change the sequence.
      await pool.query('TRUNCATE offices CASCADE; ALTER SEQUENCE offices_id_seq RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });

  //  Login to get a Token that can be used to access Authenticated route.
  describe('/POST Login', () => {
    it('Login the user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'bwendaa@gmail.com',
          password: 'bwend',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          token = res.body.token;
          done();
        });
    });
    // to access this endpoint you have to set token provided from sign in
    it('should POST an Office', (done) => {
      chai.request(app)
        .post('/api/v1/offices')
        .set('x-access-token', token)
        .send({
          name: 'huhujsu',
          type: 'state',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  // get all office
  describe('GET all Political Offices', () => {
    it('should get all offices', (done) => {
      chai.request(app)
        .get('/api/v1/offices')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // get a single office
  describe('/GET', () => {
    it('should get specific  office', (done) => {
      chai.request(app)
        .get('/api/v1/offices/1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // An adming Authenticated will access this endpoint
  describe('/Patch /api/v1/offices/1', () => {
    it('should update specific political Office', (done) => {
      chai.request(app)
        .patch('/api/v1/offices/1')
        .send({
          name: 'local',
        })
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // Needed to be authenticated for thes endpoint
  describe('/Delete', () => {
    it('it should delete a specific political Office', (done) => {
      chai.request(app)
        .delete('/api/v1/offices/1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
