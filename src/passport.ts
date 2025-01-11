import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import User from "./models/users.mongo";
import "dotenv/config";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) return done(null, { id: user._id, email: user.email });
    } catch (error) {
      return done(error);
    }
  })
);
