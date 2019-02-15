import moment from 'moment';
import uuid from 'uuid';

class Party {
  /* build a constructor
*{object} data
*/


  constructor() {
    this.parties = [];
  }

  /*
* returns {object} Party Object
*/

  createParty(data) {
    const newParty = {
      id: uuid.v4(),
      name: data.name || '',
      hqAdress: data.hqAdress || '',
      logoUrl: data.logoUrl || '',
      createdDate: moment.now(),
      modifiedDate: moment.now(),
    };
    this.parties.push(newParty);
    return newParty;
  }

  /*
  * @param {id} id
  * @ returns {Object} party Object
  */
  findOneParty(id) {
    return this.parties.find(party => party.id === id);
  }

  /*
  * @returns {Object} returns all parties
  */
  findAllParties() {
    return this.parties;
  }

  /*
  * @param {uuid} id
  * @param {Object} data
  */
  updateParty(id, data) {
    const party = this.findOneParty(id);
    const index = this.parties.indexOf(party);
    this.parties[index].name = data.name || party.name;
    this.parties[index].hqAdress = data.hqAdress || party.hqAdress;
    this.parties[index].logourl = data.logourl || party.logourl;
    this.parties[index].modifiedDate = moment.now();

    return this.parties[index];
  }

  /*
  * @param {uuid} id
  */
  deleteParty(id) {
    const party = this.findOneParty(id);
    const index = this.parties.indexOf(party);
    this.parties.splice(index, 1);
    return {};
  }
}

export default new Party();
