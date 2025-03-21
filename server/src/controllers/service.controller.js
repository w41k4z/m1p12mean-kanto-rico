const passport = require("passport");
const Roles = require("../config/roles");
const router = require("express").Router();
const ApiResponse = require("../config/response/api.response");
const serviceService = require("../services/services/services.service");
const authorize = require("../middlewares/authorization.middleware");
const Service = require("../models/Service");
const Pageable = require("../config/response/pageable");
const filterFactoryService = require("../services/filter.factory.service");



router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize([Roles.MANAGER]),
  async (req, res, next) => {
    try {
      const newService = await serviceService.createService({
        name: req.body.name,
      });
      await newService.save();
      const message = "Service created";
      res.json(new ApiResponse(null, message));
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 0;
      const size = parseInt(req.query.size) || 10;
      let filters = {};
      if (req.query.filters) {
          const rawFilters = req.query.filters;
          filters = filterFactoryService.createFilters(rawFilters);
      }
      const services = await serviceService.getAllServices(page, size, filters);
      const totalElements = await Service.countDocuments(filters);
      const payload = { services: new Pageable(services, page, size, totalElements) };
      res.json(new ApiResponse(payload));
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  passport.authorize([Roles.MANAGER]),
  async (req, res, next) => {
    try {
      const updatedService = await serviceService.updateService(
        req.params.id,
        req.body.name
      );
      await updatedService.save();
      const message = "Service updated";
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
      const deletedService = await serviceService.deleteService(req.params.id);
      await deletedService.remove();
      const message = "Service deleted";
      res.json(new ApiResponse(null, message));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
