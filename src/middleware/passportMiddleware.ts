import passport from "passport";

const passportMiddleware = passport.authenticate("jwt", { session: false });

export default passportMiddleware;
