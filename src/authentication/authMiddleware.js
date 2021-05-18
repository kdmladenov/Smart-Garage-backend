import passport from 'passport';
var authMiddleware = passport.authenticate('jwt', { session: false });
export default authMiddleware;
