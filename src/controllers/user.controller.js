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

controller.getUserName = async (req, res) => {
	try {
		const { id } = req.params
		const data = await userModel.findOne({ where: { id } });
		if (!data) {
			return res.status(400).json({ message: 'Invalid username or password' })
		}
        return res.json({ message: 'Login successful', data : data.username });
	} catch (error) {
		return res.status(500).json({ message: 'User login failed', error: error.message })
	}
}

module.exports = controller;

