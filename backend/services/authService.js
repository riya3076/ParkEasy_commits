// services/authService.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    return newUser.save();
}

async function findUserByUsername(username) {
    return User.findOne({ username });
}

module.exports = {
    createUser,
    findUserByUsername,
};
