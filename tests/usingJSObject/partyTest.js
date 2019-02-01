import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);
let expect = chai.expect;

// Test the Create Party EndPoint
describe('Create a Politico Party', () => {

	it('should not create a party without all contents filled', (done) => {
		let data = {
    		"logoUrl": "hiensisss",
    		"createdDate" : 23456,
    		"modifiedDate" : 2345
		}
		chai.request(app)
			.post('/api/v1/parties')
			.send(data)
			.set('content-type', 'application/json')
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.message).to.equal('name and HeadQuater Address could not be empty');
			done();
			})


	})
	it('it should create a party', (done) => {
		let data = {
			"name": "democrats",
    		"hqAdress": "Washngton DC",
    		"logoUrl": "hiensisss",
    		"createdDate" : 23456,
    		"modifiedDate" : 2345
		}
		chai.request(app)
			.post('/api/v1/parties')
			.send(data)
			.set('content-type', 'application/json')
			.end((err,res) => {
				expect(res.status).to.equal(201);
				expect(res.body.data[0]).to.have.property('name');
				expect(res.body.message).to.equal('Party Succefully Created');
			done();
			})
	})	
})