/* eslint class-methods-use-this: 0 */
import Pool from '../db/index';

class Vote {
  /*
* returns {object} Party Object
*/

  async createVote(data) {
    this.newVote = [
      data[0],
      data[1],
      data[2],
    ];

    try {
      const vote = await Pool.query(`INSERT INTO 
        votes(
        "candidate",
        "office",
        "users"
        ) VALUES($1, $2, $3) returning * `,
      this.newVote);
      return vote.rows[0];
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default new Vote();

// // name of the office is arleady taken
// // returnin an array for some staffs
// // change to lower cases on comparing the offices with joi convention
