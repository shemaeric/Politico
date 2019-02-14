import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import Office from '../models/officeModel';

chai.use(chaiHttp);
const expect = chai.expect;

// Test the Create Office EndPoint
describe('/POST office', () => {
  it('should not create a new government office without filling all fields', (done) => {
    const data = {
      type: 'state',
      createdDate: 23456,
      modifiedDate: 2345,
    };

    chai.request(app)
      .post('/api/v1/offices')
      .send(data)
      .set('content-type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('name and Office Type could not be empty');
        done();
      });
  });
  it('it should create a Government Office', (done) => {
    const data = {
      id: 1,
      name: 'state office',
      type: 'state',
      createdDate: 23456,
      modifiedDate: 2345,
    };
    chai.request(app)
      .post('/api/v1/offices')
      .send(data)
      .set('content-type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.have.property('name');
        expect(res.body.message).to.equal('Office Succefully Created');
        done();
      });
  });
});

// test Get all offices endpoint
describe('/GET all offices', () => {
  it('it should get all offices', (done) => {
    chai.request(app)
      .get('/api/v1/offices')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('Object');
        done();
      });
  });
});

// get a specific government office
describe('/GET a single office', () => {
  it('it should fail to get a specific office with invalid id', (done) => {
    const data = {
      name: 'state office',
      type: 'state',
      createdDate: 23456,
      modifiedDate: 2345,
    };

    const office = Office.createOffice(data);
    chai.request(app)
      .get('/api/v1/offices/dhfdafd')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('office not found');
        done();
      });
  });

  it('it should get a specific office', (done) => {
    const data = {
      name: 'state office',
      type: 'state',
      createdDate: 23456,
      modifiedDate: 2345,
    };

    const office = Office.createOffice(data);
    chai.request(app)
      .get(`/api/v1/offices/${office.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('Object');
        done();
      });
  });
});

// update a government office
describe('/PATCH an office', () => {
  it('it should fail to Update an Office', (done) => {
    const data = {
      name: 'state office',
      type: 'state',
      createdDate: 23456,
      modifiedDate: 2345,
    };

    const office = Office.createOffice(data);
    chai.request(app)
      .patch('/api/v1/offices/dhfdafd')
      .send({ name: 'local office' })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('office not found');
        done();
      });
  });

  it('it should update a office', (done) => {
    const data = {
      name: 'state office',
      type: 'state',
      createdDate: 23456,
      modifiedDate: 2345,
    };

    const office = Office.createOffice(data);
    chai.request(app)
      .patch(`/api/v1/offices/${office.id}`)
      .send({ name: 'local office' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('Object');
        done();
      });
  });
});

// delete a government office
describe('/DELETE office', () => {
  it('it should fail to Delete an Office', (done) => {
    const data = {
      name: 'state office',
      type: 'state',
      createdDate: 23456,
      modifiedDate: 2345,
    };

    const office = Office.createOffice(data);
    chai.request(app)
      .delete('/api/v1/offices/dhfdafd')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Office not found');
        done();
      });
  });

  it('it should delete an Office', (done) => {
    const data = {
      name: 'state office',
      type: 'state',
      createdDate: 23456,
      modifiedDate: 2345,
    };

    const office = Office.createOffice(data);
    chai.request(app)
      .delete(`/api/v1/offices/${office.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
