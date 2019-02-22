/* eslint class-methods-use-this: 0 */
import Pool from '../db/index';

class Candidate {
  /*
* returns {object} Party Object
*/

  async createCandidate(data) {
    this.newCandidate = [
      data[0],
      data[1],
    ];

    try {
      const candidate = await Pool.query(`INSERT INTO 
        candidates(
        "candidate",
        "office"
        ) VALUES($1, $2) returning * `,
      this.newCandidate);
      return candidate.rows[0];
    } catch (err) {
      return false;
    }
  }
}

export default new Candidate();

// // name of the office is arleady taken
// // returnin an array for some staffs
// // change to lower cases on comparing the offices with joi convention
