const router = require("express").Router();
const passport = require("passport");
const crypto = require("crypto");
const ApiResponse = require("../config/response/api.response");
const User = require("../models/User");
const Roles = require("../config/roles");
const Providers = require("../config/providers");
const jwtService = require("../services/jwt.service");
const userFactoryService = require("../services/user/user.factory.service");

router.post(
  "/sign-in",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = jwtService.generateToken(req.user);
    const payload = { accessToken: token };
    res.json(new ApiResponse(payload));
  }
);

router.post("/google", async (req, res, next) => {
  const googleUser = jwtService.decodeToken(req.body.token);
  let user = await User.findOne({ username: googleUser.email });
  if (!user) {
    const randomPassword = crypto.randomBytes(8).toString("hex");
    user = await userFactoryService.createUserWithProvider({
      firstName: googleUser.given_name,
      lastName: googleUser.familyName,
      username: googleUser.email,
      password: randomPassword,
      roleName: Roles.CLIENT,
      provider: Providers.GOOGLE,
    });
    await user.save();
  }
  const token = jwtService.generateToken(await user.populate('role'));
  const payload = { accessToken: token };
  res.json(new ApiResponse(payload));
});

module.exports = router;
