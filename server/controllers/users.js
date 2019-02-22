/* eslint consistent-return: 0 */
import Users from '../models/user';
import Auth from '../helpers/auth';
import Pool from '../db/index';


class User {
  // Register the User
  static async register(req, res) {
    const newUser = Users.createUser(req.body);
    const token = Auth.generateToken(req.body.id);
    newUser.then((user) => {
      if (!user) {
        return res.status(400).send({
          status: 400,
          error: 'user exists',
        });
      }
      return res.status(201).send({
        status: 201,
        data: [{
          token,
          user,
        }],
      });
    });
  }

  // login the user
  static async login(req, res) {
    const { email, password } = req.body;
    const queryText = ' SELECT * FROM users WHERE email = $1 LIMIT 1';
    const data = [email];
    Pool.query(queryText, data)
      .then((response) => {
        if (!response) {
          return res.status(404).send({
            status: 404,
            error: 'User not found',
          });
        }
        const checkPassword = Auth.passwordCompare(response.rows[0].password, password);
        if (checkPassword) {
          const payload = {
            id: res.id,
            email: res.email,
            isadmin: res.isadmin,
          };
          delete payload.password;
          const token = Auth.generateToken(payload);
          return res.status(200).send({
            status: 200,
            token,
            user: response.rows[0],
          });
        }
      }).catch((err) => {
        res.status(500).send({
          status: 500,
          error: 'internal server error',
        });
      });
  }
}
export default User;
