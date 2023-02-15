const passport = require("passport");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (info && (err || !user)) {
        return res.status(401).json(info);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { id: user.id, email: user.email };

        const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const signup = async (req, res, next) => {
  passport.authenticate("signup", async (err, user, info) => {
    try {
      if (info && (err || !user)) {
        return res.status(401).json(info);
      }

      res.json({
        message: "Signup successful",
        user,
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

module.exports = {
  login,
  signup,
};
