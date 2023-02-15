const jwt = require("jsonwebtoken");

const userContext = (req, res, next) => {
  const authorizationHeader = req.header("authorization");
  const token = authorizationHeader.split(" ")[1];

  var user = jwt.verify(token, process.env.TOKEN_SECRET);
  req.ctx = user;
  return next();
};

module.exports = userContext;
