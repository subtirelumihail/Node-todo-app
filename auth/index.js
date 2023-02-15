const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { User } = require("$models");

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { name } = req.body;
      try {
        const data = {
          name,
          email,
          password: await bcrypt.hash(password, 10),
        };

        const user = await User.create(data);
        delete user.password;

        return done(null, user);
      } catch (error) {
        return done(null, false, {
          message: error?.errors[0]?.message,
          key: error?.errors[0]?.message.replace(/ /g, "."),
        });
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return done(null, false, {
            message: "User not found",
            key: "user.not.found",
          });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {
            message: "Wrong Password",
            key: "wrong.password",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.TOKEN_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
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
