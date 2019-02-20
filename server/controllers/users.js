import Users from '../models/user';
import Auth from '../helpers/auth';


class User {
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
}

export default User;
