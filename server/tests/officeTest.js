import chai from 'chai';
import chaiHttp from 'chai-http';
import getToken from './baseTests';
import { pool, createTables } from '../db';

const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp);

describe('Office', () => {
  let token;
  before(async () => {
    await createTables()
      .then(async () => {
        await getToken()
          .then((res) => {
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
});
