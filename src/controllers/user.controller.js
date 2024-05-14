const userModel = require('../models/user.model');
const controller = {};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

controller.signUp = async (req, res) => {
	try {
		const { username, password } = req.body
		if (!username || !password) {
			return res.status(400).json({ message: 'Username and Password are required'})
		}
		const user = await userModel.findOne({ where: { username } });
		if (user) {
			return res.status(400).json({ message: 'Username has registered'})
		}
		const hashedPassword = await bcrypt.hash(password, 10)
		await userModel.create({ username, password: hashedPassword })
        return res.status(201).json({ message: 'User registered successfully' })
	} catch (error) {
		return res.status(500).json({ message: 'User registration failed', error: error.message })
	}
}

controller.signIn = async (req, res) => {
	try {
		const { username, password } = req.body
		const secretKey =   process.env.SECRET_KEY
		if (!username || !password) {
			return res.status(400).json({ message: 'Username and Password are required'})
		}
		const user = await userModel.findOne({ where: { username } });
		if (!user) {
			return res.status(400).json({ message: 'Invalid username or password' })
		}
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' })
        }
        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' })
        return res.json({ message: 'Login successful', token });
	} catch (error) {
		return res.status(500).json({ message: 'User login failed', error: error.message })
	}
}

// controller.getListJob = async (req, res) => {
// 	try {
// 		console.log('ii')
// 		let data = null
// 		let codeStatus = 0
//         await axios.get(
//             `${process.env.API_JOB}recruitment/positions.json`
//         ).then((res) => {
//             if (res) {
//                 data = res
// 				codeStatus = 200
//             }
//         }).catch((err) => {
//             console.log('err', err)
//             data = err.response
// 			codeStatus = 500
//         })
// 		console.log('1', data)
// 		return res.status(codeStatus).json({data})
//     } catch (e) {
//         console.log('error trycatch: ', JSON.stringify(e))
// 		return res.status(500).json({message : e.message})
//     }
// }

module.exports = controller;

