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

  checkToken(req, res, next){
    const secrete = process.env.SECRET
    const token = req.headers.authorization;
    console.log(token);
    if (token.startsWith('Bearer')) {
      //Remove Bearer from string 
      token = token.slice(7, token.length);
    }

    if (token) {
      jwt.verify(token, secrete, (err, decode) => {
        if (err) {
          return res.json({
            success : false,
            message : 'Token is not valid'
          });
        } else {
          req.decode = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success : false,
        message : 'Auth is not supplied'
      });
    }
}
};

export default Auth;
