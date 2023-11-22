// controllers/authController.js
const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const { username, password } = req.body;
    try {
        await authService.createUser(username, password);
        res.status(201).send('User registered successfully!');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await authService.findUserByUsername(username);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({ userId: user._id }, 'your_secret_key');
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
}

module.exports = {
    register,
    login,
};
