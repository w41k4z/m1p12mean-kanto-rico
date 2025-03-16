const User = require('../../models/User');

exports.getAllUsers = async () => {
    return User.find().populate('role');
};