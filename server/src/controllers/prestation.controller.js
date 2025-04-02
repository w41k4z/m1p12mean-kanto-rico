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
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    let filters = {};
    if (req.query.search) {
      filters.search = req.query.search;
    }
    if (req.query.filters) {
      filters = { ...filters, ...filterFactoryService.createFilters(req.query.filters) };
    }
    const prestations = await prestationService.getAllPrestations(page, size, filters);
    const totalElements = await Prestation.countDocuments({ ...filters, status: 'OK' });
      const payload = { 
        prestations: new Pageable(prestations, page, size, totalElements) 
      };
    res.json(new ApiResponse(payload));
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorize([Roles.MANAGER]),
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
  authorize([Roles.MANAGER]),
  async (req, res, next) => {
    try {
      const result = await prestationService.deletePrestation(req.params.id);
      res.json(new ApiResponse(result, "Prestation deleted successfully"));
    } catch (error) {
      if (error.message === 'Prestation not found') {
        return res.status(404).json(new ApiResponse(null, error.message, false));
      }
      next(error);
    }
  }
);
module.exports = router;
