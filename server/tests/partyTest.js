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
      await pool.query('TRUNCATE parties CASCADE; ALTER SEQUENCE parties_id_seq RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });

  describe('POST Political party', () => {
    it('First log in the user to generate the token', (done) => {
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
    it('it should POST a party', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .set('x-access-token', token)
        .send({
          name: 'RPF',
          hqAdress: 'Kacyiru',
          logoUrl: 'rpf.png',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('GET all Political parties', () => {
    it('it should show all political parties', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });


  describe('GET specific Political party', () => {
    it('it should show specific political party', (done) => {
      chai.request(app)
        .get('/api/v1/parties/1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });


  describe('Patch specific Political party', () => {
    it('it should update specific political party', (done) => {
      chai.request(app)
        .patch('/api/v1/parties/1')
        .send({
          name: 'Republican',
        })
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('Delete specific Political party', () => {
    it('it should delete a specific political party', (done) => {
      chai.request(app)
        .delete('/api/v1/parties/1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
