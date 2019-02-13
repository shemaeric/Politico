import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import Party from '../../src/usingJSObject/models/partyModel';

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
			"id" : 1,
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
	});
});

// test Get all parties endpoint
describe('Get all Politico Parties', () => {

	it('it should get all parties', (done) => {
		chai.request(app)
			.get('/api/v1/parties')
			.end((err,res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.be.an('Object');	
			done();
			})
	});	
});

describe('Get a specific Politico Parties', () => {

	it('it should fail to get a specific party', (done) => {
		let data = {
			"name" : "hie",
			"hqAdress" : "kigali",
    		"logoUrl": "hiensisss",
    		"createdDate" : 23456,
    		"modifiedDate" : 2345
		}

		let party = Party.createParty(data);
		chai.request(app)
			.get('/api/v1/parties/dhfdafd')
			.end((err, res) => {
				expect(res.status).to.equal(404);
				expect(res.body.message).to.equal('party not found');
			done();
			})
		
	});	

	it('it should get a specific party', (done) => {
		let data = {
			"name" : "hie",
			"hqAdress" : "kigali",
    		"logoUrl": "hiensisss",
    		"createdDate" : 23456,
    		"modifiedDate" : 2345
		}

		let party = Party.createParty(data);
		chai.request(app)
			.get('/api/v1/parties/' + party.id)
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.be.an('Object');
			done();
			})
		
	});	
});

describe('Update a Political Party', () => {

	it('it should fail to Update a party', (done) => {
		let data = {
			"name" : "democrats",
			"hqAdress" : "kigali",
    		"logoUrl": "hiensisss",
    		"createdDate" : 23456,
    		"modifiedDate" : 2345
		}

		let party = Party.createParty(data);
		chai.request(app)
			.patch('/api/v1/parties/dhfdafd')
			.send({ "name" : "demo"})
			.end((err, res) => {
				expect(res.status).to.equal(404);
				expect(res.body.message).to.equal('party not found');
			done();
			})
		
	});	

	it('it should update a party', (done) => {
		let data = {
			"name" : "democrats",
			"hqAdress" : "kigali",
    		"logoUrl": "hiensisss",
    		"createdDate" : 23456,
    		"modifiedDate" : 2345
		}

		let party = Party.createParty(data);
		chai.request(app)
			.patch('/api/v1/parties/' + party.id)
			.send({"name" : "demo"})
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.be.an('Object');
			done();
			})
		
	});	
});

describe('Delete a Political Party', () => {

	it('it should fail to Delete a party', (done) => {
		let data = {
			"name" : "democrats",
			"hqAdress" : "kigali",
    		"logoUrl": "hiensisss",
    		"createdDate" : 23456,
    		"modifiedDate" : 2345
		}

		let party = Party.createParty(data);
		chai.request(app)
			.delete('/api/v1/parties/dhfdafd')
			.end((err, res) => {
				expect(res.status).to.equal(404);
				expect(res.body.message).to.equal('Party not found');
			done();
			})
		
	});	

	it('it should delete a party', (done) => {
		let data = {
			"name" : "democrats",
			"hqAdress" : "kigali",
    		"logoUrl": "hiensisss",
    		"createdDate" : 23456,
    		"modifiedDate" : 2345
		}

		let party = Party.createParty(data);
		chai.request(app)
			.delete('/api/v1/parties/' + party.id)
			.end((err, res) => {
				expect(res.status).to.equal(200);
			done();
			})
		
	});	
});

