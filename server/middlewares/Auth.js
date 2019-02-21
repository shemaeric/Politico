import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();
const checkToken = (req, res, next) => {
		const secrete = process.env.SECRET
		console.log(next);
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

export default checkToken();
