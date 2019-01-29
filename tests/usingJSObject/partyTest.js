import chai from 'chai';
import partyModel from '.src/usingJSObject/models/partyModel';
import server from '../server';

let should = chai.should();

chai.use(chaihttp);

describe('Parties', () => {
	beforeEach((done) => {
		Party.remove({}, err => {
			done();
		});
	});

	describe('/POST party', () => {
		it('it should POST a party', (done) => {
			let party = {
				name: "democrats"
				hqAddress : "Kigali";
				logoUrl : "jideiji"
			}

			chai.request(server)
			.post('/api/v1/parties')
			.send(party)
			.end((err, res) => {
				res.should.have.status(201);
				res.should.have.a('object');
				res.should.have.property('name');
				res.should.have.property('hqAddress');
				res.should.have.property('logoUrl');
			done();
			});
		});
	});
});
