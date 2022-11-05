const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const passport = require('passport');

passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
        return done(null, false, { message: 'Username tidak ditemukan' });
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Password salah' });
        }
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ where: { id: id } });
    done(null, user);
});


