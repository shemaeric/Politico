import moment from 'moment';
import uuid from 'uuid';

class Office {
  /* build a constructor
*{object} data
*/


  constructor() {
    this.offices = [];
  }

  /*
* returns {object} Office Object
*/

  createOffice(data) {
    const newOffice = {
      id: uuid.v4(),
      name: data.name || '',
      type: data.type || '',
      createdDate: moment.now(),
      modifiedDate: moment.now(),
    };
    this.offices.push(newOffice);
    return newOffice;
  }

  /*
  * @returns {Object} returns all offices
  */
  findAllOffices() {
    return this.offices;
  }

  /*
  * @param {id} id
  * @ returns {Object} office Object
  */
  findOneOffice(id) {
    return this.offices.find(office => office.id === id);
  }

  /*
  * @param {uuid} id
  * @param {Object} data
  */
  updateOffice(id, data) {
    const office = this.findOneOffice(id);
    const index = this.offices.indexOf(office);
    this.offices[index].name = data.name || office.name;
    this.offices[index].type = data.type || office.type;
    this.offices[index].modifiedDate = moment.now();

    return this.offices[index];
  }

  /*
  * @param {uuid} id
  */
  deleteOffice(id) {
    const office = this.findOneOffice(id);
    const index = this.offices.indexOf(office);
    this.offices.splice(index, 1);
    return {};
  }
}

export default new Office();
