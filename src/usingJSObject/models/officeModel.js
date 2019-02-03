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

  create(data) {
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
  findAll() {
    return this.offices;
  }

    /*
  * @param {id} id
  * @ returns {Object} office Object
  */
  findOne(id) {
    return this.offices.find(office => office.id === id);
  }

}

export default new Office();
