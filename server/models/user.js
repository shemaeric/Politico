import moment from 'moment';
import uuid from 'uuid';
import Pool from '../db/index';
import Auth from '../helpers/auth';

class User {
  // ccreating the user
  async createUser(data) {
    const password = Auth.passwordHash(data.password);
    this.newUser = [
      data.firstname,
      data.lastname,
      data.othername,
      data.email,
      data.phone,
      password,
      data.passport,
      data.isadmin,
    ];

    try {
      const user = await Pool.query(`INSERT INTO 
      users (
      "firstname",
      "lastname",
      "othername",
      "email",
      "phone",
      "password",
      "passport",
      "isadmin"
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
      returning *`,
      this.newUser);
      return user.rows[0];
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default new User();
