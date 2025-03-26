const User = require('../../models/User');
const Role = require('../../models/Role');
const Providers = require('../../config/providers');

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
        role: role._id,
        provider: Providers.LOCAL
    });

    return newUser;
};
 
exports.createUserWithProvider = async ({
    firstName,
    lastName,
    username,
    password,
    roleName,
    provider
}) => {
    let newUser = await this.createUser({
        firstName,
        lastName,
        username,
        password,
        roleName
    });
    newUser.provider = provider;
    return newUser;
 };