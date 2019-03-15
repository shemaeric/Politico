/* eslint class-methods-use-this: 0 */
import moment from 'moment';
import uuid from 'uuid';
import Pool from '../db/index';

class Party {
  /*
* returns {object} Party Object
*/

  async createParty(data) {
    this.newParty = [
      data.name,
      data.hqAdress,
      data.logoUrl,
    ];

    try {
      const party = await Pool.query(`INSERT INTO 
        parties(
        "name",
        "hqadress",
        "logourl"
        ) VALUES($1, $2, $3) returning * `,
      this.newParty);
      return party.rows[0];
    } catch (err) {
      return false;
    }
  }

  /*
  * @param {id} id
  * @ returns {Object} party Object
  */
  async findOneParty(id) {
    const findOneQuery = 'SELECT * FROM parties WHERE id = $1';
    try {
      const findOneParty = await Pool.query(findOneQuery, [id]);
      return findOneParty;
    } catch (err) {
      return false;
    }
  }

  /*
  * @returns {Object} returns all parties
  */
  async findAllParties() {
    const findAllQuery = 'SELECT * FROM parties';
    try {
      const findAllParties = await Pool.query(findAllQuery);
      return findAllParties;
    } catch (err) {
      return false;
    }
  }

  /*
  * @param {uuid} id
  * @param {Object} data
  */
  async updateParty(data) {
    const updatePartyQuery = `UPDATE parties 
      SET name=$1, hqadress=$2, logourl=$3, updateddate=$4 WHERE id=$5 returning *`;
    try {
      const updatedParty = await Pool.query(updatePartyQuery, data);
      return updatedParty.rows[0];
    } catch (err) {
      return false;
    }
  }

  /*
  * @param {uuid} id
  */
  async deleteParty(id) {
    const deletePartyQuery = 'DELETE FROM parties WHERE id=$1 returning *';
    try {
      const deletedParty = await Pool.query(deletePartyQuery, id);
      return {};
    } catch (err) {
      return false;
    }
  }

  async validateParty(name) {
    const query = 'SELECT * FROM parties WHERE name = $1';
    try {
      const validateName = await Pool.query(query, name);
      const rows = validateName.rowCount;
      return rows;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default new Party();
