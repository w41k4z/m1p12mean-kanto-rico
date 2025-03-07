const jwt = require('jsonwebtoken');

exports.generateToken = (user) => { 
    const payload = {
        id: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}