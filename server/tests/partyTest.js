import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import getToken from './baseTests';
import { createTables, pool } from '../db';

const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp);

describe('Party', () => {
  let token;
  before(async () => {
    await createTables()
      .then(async () => {
        await getToken()
          .then((res) => {
            token = res.body.data[0].token;
            return token;
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        pool.end();
      });
  });
  after(async () => {
    try {
      await pool.query('TRUNCATE parties CASCADE; ALTER SEQUENCE parties_id_seq RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });

  describe('/POST ', () => {
    // After getting a Token it can be passed in the headers
    it('it should POST a party', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .set('x-access-token', token)
        .send({
          name: 'democrats',
          hqAdress: 'washington',
          logoUrl: 'hello.jpg',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // Get a all parties no Token needed
  describe('/GET All Parties', () => {
    it('it should show all political parties', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // Get a Party no Token and authentication needed
  describe('/GET Party', () => {
    it('should get a specific political party', (done) => {
      chai.request(app)
        .get('/api/v1/parties/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not get a specific political party without valid id', (done) => {
      chai.request(app)
        .get('/api/v1/parties/noo')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // Update a party
  describe('/Patch Party', () => {
    it('should update a party', (done) => {
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

  // Deleting a Party
  describe('/Delete a Party', () => {
    it('should delete a party', (done) => {
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
