const User = require('../../models/User');

exports.getAllUsers = (page, size, filters) => {
    return User.find(filters).populate('role').skip(page).limit(size);
};