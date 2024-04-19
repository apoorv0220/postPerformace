import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import dotenv from "dotenv"


dotenv.config();
//Local
passport.use(
    new localStrategy({
        usernameField: "username" //username or email
    }, async (username, password, done) => {
        try {
            const user = await User.findOne({ username })
            if(!user) {
                return done(null, false, "Invalid login credentials");
            }
            const passMatch = await bcrypt.compare(password, user.password);
            if(passMatch) {
                return done(null, user)
            } else {
                return done(null, false, "Invalid login credentials");
            }
        } catch (error) {
            return done(error);
        }
    })
)

//JWT Options
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
            let token = null;
            if(req && req.cookies) {
                token = req.cookies.token
                return token;
            }
        }
    ]),
    secretOrKey: process.env.JWT_SECRET,
}
//JWT
passport.use(
    new jwtStrategy(jwtOptions, async(jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            if(user) {
                return done(null, user);
            } else {
                return done(null, false)
            }
        } catch (error) {
            return done(error, false)
        }
    })
)

export default passport;