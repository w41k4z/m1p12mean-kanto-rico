const passport = require("passport");
const Roles = require("../config/roles");
const router = require("express").Router();
const ApiResponse = require("../config/response/api.response");
const serviceService = require("../services/services.service");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  passport.authorize([Roles.MANAGER]),
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
  passport.authenticate("jwt", { session: false }),
  passport.authorize([Roles.MANAGER]),
  async (req, res, next) => {
    try {
      const services = await serviceService.getAllServices();
      const payload = { services };
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
