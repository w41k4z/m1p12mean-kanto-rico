const router = require("express").Router();
const passport = require("../config/auth/passport");
const Roles = require("../config/roles");
const ApiResponse = require("../config/response/api.response");
const prestationService = require("../services/prestation.service");
const authorize = require("../middlewares/authorization.middleware");


router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize([Roles.MANAGER]),
  async (req, res, next) => {
    try {
      const newPrestation = await prestationService.createPrestation({
        name: req.body.name,
        price: req.body.price,
      });
      await newPrestation.save();
      const message = "Prestation created";
      res.json(new ApiResponse(null, message));
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const prestations = await prestationService.getAllPrestations();
    const payload = { prestations };
    res.json(new ApiResponse(payload));
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  passport.authorize([Roles.MANAGER]),
  async (req, res, next) => {
    try {
      const updatedPrestation = await prestationService.updatePrestation(
        req.params.id,
        req.body.name,
        req.body.price
      );
      await updatedPrestation.save();
      const message = "Prestation updated";
      res.json(new ApiResponse(null, message));
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  passport.authorize([Roles.MANAGER]),
  async (req, res, next) => {
    try {
      const deletedPrestation = await prestationService.deletePrestation(
        req.params.id
      );
      await deletedPrestation.remove();
      const message = "Prestation deleted";
      res.json(new ApiResponse(null, message));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
