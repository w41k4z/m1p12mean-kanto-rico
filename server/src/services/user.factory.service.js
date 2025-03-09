const User = require('../models/User');
const Role = require('../models/Role');

exports.createUser = async ({
    firstName,
    lastName,
    username,
    password,
    roleName
}) => {
    let role = await Role.findOne({ name: roleName });
    if (!role) {
        throw new Error(`Role '${roleName}' not found.`);
    }

    let newUser = new User({
        firstName,
        lastName,
        username,
        password,
        role: role._id
    });

    return newUser;
 };