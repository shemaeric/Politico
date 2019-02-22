/* eslint class-methods-use-this: 0 */
import Pool from '../db/index';

class Result {
  /*
* returns {object} Party Object
*/

  async viewResult(id) {
    const resultQuery = 'SELECT office,  candidate, COUNT(*) AS result FROM votes WHERE office=$1 GROUP BY candidate, office';
    try {
      const result = await Pool.query(resultQuery, [id]);
      return result;
    } catch (err) {
      return false;
    }
  }
}

export default new Result();

// // name of the office is arleady taken
// // returnin an array for some staffs
// // change to lower cases on comparing the offices with joi convention
