import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import Party from '../models/partyModel';

chai.use(chaiHttp);
const expect = chai.expect;

// Test the Create Party EndPoint
describe('/POST party', () => {
  it('should not create a party without all fields filled', (done) => {
    const data = {
      logoUrl: 'hiensisss'
    };

    chai.request(app)
      .post('/api/v1/parties')
      .send(data)
      .set('content-type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Bad Request');
        done();
      });
  });
  it('it should create a party', (done) => {
    const data = {
      name: 'democrats',
      hqAdress: 'Washngton DC',
      logoUrl: 'hiensisss'
    };
    chai.request(app)
      .post('/api/v1/parties')
      .send(data)
      .set('content-type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.have.property('name');
        expect(res.body.message).to.equal('Party Succefully Created');
        done();
      });
  });
});

// test Get all parties endpoint
describe('/GET all parties', () => {
  it('it should get all parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('Object');
        done();
      });
  });
});

describe('/GET party', () => {
  it('it should fail to get a specific party with invalid ID', (done) => {
    const data = {
      name: 'hie',
      hqAdress: 'kigali',
      logoUrl: 'hiensisss',
      createdDate: 23456,
      modifiedDate: 2345,
    };

    const party = Party.createParty(data);
    chai.request(app)
      .get('/api/v1/parties/dhfdafd')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('party not found');
        done();
      });
  });

  it('it should get a specific party', (done) => {
    const data = {
      name: 'hie',
      hqAdress: 'kigali',
      logoUrl: 'hiensisss',
      createdDate: 23456,
      modifiedDate: 2345,
    };

    const party = Party.createParty(data);
    chai.request(app)
      .get(`/api/v1/parties/${party.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('Object');
        done();
      });
  });
});

describe('/PATCH party', () => {
  it('it should fail to Update a party', (done) => {
    const data = {
      name: 'democrats',
      hqAdress: 'kigali',
      logoUrl: 'hiensisss',
      createdDate: 23456,
      modifiedDate: 2345,
    };

    const party = Party.createParty(data);
    chai.request(app)
      .patch('/api/v1/parties/dhfdafd')
      .send({ name: 'demo' })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('party not found');
        done();
      });
  });

  it('it should update a party', (done) => {
    const data = {
      name: 'democrats',
      hqAdress: 'kigali',
      logoUrl: 'hiensisss',
      createdDate: 23456,
      modifiedDate: 2345,
    };

    const party = Party.createParty(data);
    chai.request(app)
      .patch(`/api/v1/parties/${party.id}`)
      .send({ name: 'demo' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('Object');
        done();
      });
  });
});

describe('/DELETE a party', () => {
  it('it should fail to Delete a party', (done) => {
    const data = {
      name: 'democrats',
      hqAdress: 'kigali',
      logoUrl: 'hiensisss',
      createdDate: 23456,
      modifiedDate: 2345,
    };

    const party = Party.createParty(data);
    chai.request(app)
      .delete('/api/v1/parties/dhfdafd')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Party not found');
        done();
      });
  });

  it('it should delete a party', (done) => {
    const data = {
      name: 'democrats',
      hqAdress: 'kigali',
      logoUrl: 'hiensisss',
      createdDate: 23456,
      modifiedDate: 2345,
    };

    const party = Party.createParty(data);
    chai.request(app)
      .delete(`/api/v1/parties/${party.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
