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

  checkToken(req, res, next) {
    const token = req.headers['x-access-token'] || req.body['x-access-token'] || null;

    if (!token) {
      return res.status(401).json({
        error: 'Please, sign-in!',
      });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          error: 'Failed to authenticate token',
        });
      }
      req.id = decoded.id || null;
      req.email = decoded.email || null;
      next();
      return true;
    });
    return true;
  },
};

export default Auth;
