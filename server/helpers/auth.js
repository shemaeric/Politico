import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Auth = {

  passwordHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  passwordCompare(passwordHash, password) {
    return bcrypt.compareSync(password, passwordHash);
  },

  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    process.env.SECRET, { expiresIn: '3d' });
    return token;
  },
};

export default Auth;
