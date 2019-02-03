import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import Party from '../../src/usingJSObject/models/officeModel';

chai.use(chaiHttp);
let expect = chai.expect;

// Test the Create Party EndPoint
describe('Create a Government Office', () => {

	it('should not create a government office without all contents filled', (done) => {
		let data = {
    		"type": "state",
    		"createdDate" : 23456,
    		"modifiedDate" : 2345
		}
		
		chai.request(app)
			.post('/api/v1/offices')
			.send(data)
			.set('content-type', 'application/json')
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.message).to.equal('name and Office Type could not be empty');
			done();
			})


	})
	it('it should create a Government Office', (done) => {
		let data = {
			"id" : 1,
			"name": "state office",
    		"type": "state",
    		"createdDate" : 23456,
    		"modifiedDate" : 2345
		}
		chai.request(app)
			.post('/api/v1/offices')
			.send(data)
			.set('content-type', 'application/json')
			.end((err,res) => {
				expect(res.status).to.equal(201);
				expect(res.body.data[0]).to.have.property('name');
				expect(res.body.message).to.equal('Office Succefully Created');
			done();
			})
	});
});