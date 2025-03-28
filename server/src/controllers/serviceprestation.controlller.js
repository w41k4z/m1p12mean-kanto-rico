const passport = require("passport");
const Roles = require("../config/roles");
const filterFactoryService = require("../services/filter.factory.service");
const ServicePrestation = require("../models/ServicePrestation");
const Pageable = require("../config/response/pageable");
const router = require("express").Router();
const ApiResponse = require("../config/response/api.response");
const servprestService = require("../services/serviceprestation/servprest.service");
const authorize = require("../middlewares/authorization.middleware");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize([Roles.MANAGER]),
  async (req, res, next) => {
    try {
        const newServicePrestation = await servprestService.createServicePrestation({
        service: req.body.service,
        prestation: req.body.prestation,
      });
      await newServicePrestation.save();
      const message = "Prestation in service created";
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
    const servicePrestations = await servprestService.getAllServicePrestations(page, size, filters);
    const totalElements = await servicePrestations.countDocuments(filters);
    const payload = { servicePrestations: new Pageable(servicePrestations, page, size, totalElements) };
    res.json(new ApiResponse(payload));
  } catch (error) {
    next(error);
  }
});


router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorize([Roles.MANAGER]),
  async (req, res, next) => {
    try {
      const result = await servprestService.deleteServicePrestation(req.params.id);
      res.json(new ApiResponse(result, "Prestation in service deleted successfully"));
    } catch (error) {
      if (error.message === 'Prestation in service not found') {
        return res.status(404).json(new ApiResponse(null, error.message, false));
      }
      next(error);
    }
  }
);

router.get(
  "/:serviceName", 
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      console.log("Searching for service:", req.params.serviceName);
const prestations = await servprestService.getPrestationsByService(req.params.serviceName);
console.log("Found:", prestations);
      res.json(new ApiResponse(prestations, "Prestations retrieved successfully"));
    } catch (error) {
      if (error.message === 'No prestations found for this service') {
        return res.status(404).json(new ApiResponse([], error.message, false));
      }
      next(error);
    }
  }
);


module.exports = router;

