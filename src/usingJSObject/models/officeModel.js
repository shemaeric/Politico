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

}

export default new Office();
