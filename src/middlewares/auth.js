import passport from 'passport';

const passportJwt = passport.authenticate('jwt', {session: false});
const passportLocal = passport.authenticate('local', {session: false});

export default {passportJwt, passportLocal};
