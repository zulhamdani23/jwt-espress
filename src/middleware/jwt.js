const jwt = require('jsonwebtoken');

exports.authenticateJWT = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const secretKey =   process.env.SECRET_KEY
		if (authHeader) {
			const token = authHeader.split(' ')[1];

			jwt.verify(token, secretKey, (err, user) => {
				if (err) {
					return res.status(403).json({"message" : "Forbidden, you don't have access"})
				}
				req.user = user
				next();
			});
		} else {
			return res.satus(401).json({message: 'Auth is required'})
		}
	} catch (error) {
		return res.status(500).json({message: error.message})
	}
    
};