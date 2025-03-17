const User = require('../../models/User');

exports.getAllUsers = (page, size) => {
    return User.find().populate('role').skip(page).limit(size);
};