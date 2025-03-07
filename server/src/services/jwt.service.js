const jwt = require('jsonwebtoken');

exports.generateToken = (user) => { 
    const payload = {
        id: user.id,
        email: user.email
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}