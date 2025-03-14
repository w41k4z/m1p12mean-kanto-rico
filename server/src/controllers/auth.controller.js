const router = require("express").Router();
const passport = require("passport");
const ApiResponse = require("../config/response/api.response");
const jwtService = require("../services/jwt.service");

router.post(
  "/sign-in",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = jwtService.generateToken(req.user);
    const payload = { accessToken: token };
    res.json(new ApiResponse(payload));
  }
);

module.exports = router;
