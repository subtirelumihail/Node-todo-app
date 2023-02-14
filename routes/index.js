const { Router } = require("express");
const passport = require("passport");

const router = Router();

const secureRoutes = require("./secure");
const publicRoutes = require("./public");

router.use("/", publicRoutes);
router.use("/", passport.authenticate("jwt", { session: false }), secureRoutes);

module.exports = router;
