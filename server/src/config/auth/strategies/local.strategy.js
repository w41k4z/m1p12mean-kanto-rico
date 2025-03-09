const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/User');

module.exports = new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User
            .findOne({ username: username })
            .select('+password')
            .exec();
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        if (!await user.comparePassword(password)) {
            return done(null, false, { message: 'Invalid credentials' });
        }
        return done(null, await user.populate('role'));
    } catch (error) {
        return done(error, false);
    }
});