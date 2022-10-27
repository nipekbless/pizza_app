const passport = require('passport');
const localStrategy = require("passport-local").Strategy
const UserModel = require('../model/userModel');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require("dotenv").config()

module.exports = (passport) => {passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
        
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() 
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);



passport.use(
    'signup',
    new localStrategy(
        {
            
            usernameField: 'username',
            passwordField: 'password',
            passRequestToCallback: 'true'

        },
        async ( req, username, password, done) => {
            try {
                const email = req.body.email
                const user = await UserModel.create({ username, password, email });

                return done(null, user);
            } catch (error) {
                console.log(error)
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ username });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);
    }