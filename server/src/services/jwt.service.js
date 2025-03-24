const jwt = require('jsonwebtoken');

exports.generateToken = (user) => { 
    const payload = {
        id: user.id,
        username: user.username,
        displayName: `${user.lastName} ${user.firstName}`,
        role: user.role.name
    };

    const options = {
        expiresIn: '31d'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

exports.decodeToken = (token) => {
    return jwt.decode(token);
}