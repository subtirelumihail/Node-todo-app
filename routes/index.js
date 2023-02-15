const { Router } = require("express");
const passport = require("passport");

const router = Router();

const userContext = require("../middleware/userContext");

const secureRoutes = require("./secure");
const publicRoutes = require("./public");

router.use("/", publicRoutes);
router.use(
  "/",
  [passport.authenticate("jwt", { session: false }), userContext],
  secureRoutes
);

module.exports = router;
