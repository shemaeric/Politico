/* eslint class-methods-use-this: 0 */
import moment from 'moment';
import uuid from 'uuid';
import Pool from '../db/index';

class Office {
  /*
* returns {object} Office Object
*/

  async createOffice(data) {
    this.newOffice = [
      data.name,
      data.type,
    ];

    try {
      const office = await Pool.query(`INSERT INTO 
        offices(
        "name",
        "type"
        ) VALUES($1, $2) returning * `,
      this.newOffice);
      return office.rows[0];
    } catch (err) {
      return false;
    }
  }

  /*
  * @returns {Object} returns all offices
  */
  async findAllOffices() {
    const findAllQuery = 'SELECT * FROM offices';
    try {
      const findAllOffices = await Pool.query(findAllQuery);
      return findAllOffices;
    } catch (err) {
      return false;
    }
  }

  /*
  * @param {id} id
  * @ returns {Object} office Object
  */
  async findOneOffice(id) {
    const findOneQuery = 'SELECT * FROM offices WHERE id = $1';
    try {
      const findOneOffice = await Pool.query(findOneQuery, [id]);
      return findOneOffice;
    } catch (err) {
      return false;
    }
  }

  /*
  * @param {uuid} id
  * @param {Object} data
  */
  async updateOffice(data) {
    const updateOfficeQuery = `UPDATE offices
      SET name=$1, type=$2,updateddate=$3 WHERE id=$4 returning *`;
    try {
      const updatedOffice = await Pool.query(updateOfficeQuery, data);
      return updatedOffice.rows[0];
    } catch (err) {
      return false;
    }
  }

  /*
  * @param {uuid} id
  */
  async deleteOffice(id) {
    const deleteOfficeQuery = 'DELETE FROM offices WHERE id=$1 returning *';
    try {
      const deletedOffice = await Pool.query(deleteOfficeQuery, id);
      return {};
    } catch (err) {
      return false;
    }
  }

  async validateOffice(name) {
    const query = 'SELECT * FROM offices WHERE name = $1';
    try {
      const validateName = await Pool.query(query, name);
      const rows = validateName.rowCount;
      return rows;
    } catch (err) {
      return false;
    }
  }
}

export default new Office();
