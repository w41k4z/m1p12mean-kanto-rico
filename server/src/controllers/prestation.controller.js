const router = require("express").Router();
const passport = require("../config/auth/passport");
const Roles = require("../config/roles");
const ApiResponse = require("../config/response/api.response");
const prestationService = require("../services/prestation/prestation.service");
const authorize = require("../middlewares/authorization.middleware");
const Prestation = require("../models/Prestation");
const Pageable = require("../config/response/pageable");
const filterFactoryService = require("../services/filter.factory.service");


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
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    let filters = {};
    if (req.query.filters) {
      const rawFilters = req.query.filters;
      filters = filterFactoryService.createFilters(rawFilters);
    }
    const prestations = await prestationService.getAllPrestations(page, size, filters);
    const totalElements = await Prestation.countDocuments(filters);
    const payload = { prestations: new Pageable(prestations, page, size, totalElements) };
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
