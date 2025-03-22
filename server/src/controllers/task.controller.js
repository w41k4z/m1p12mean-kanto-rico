const router = require("express").Router();
const Roles = require("../config/roles");
const passport = require("../config/auth/passport");
const ApiResponse = require("../config/response/api.response");
const authorize = require("../middlewares/authorization.middleware");
const taskService = require("../services/task/task.service");
const Pageable = require("../config/response/pageable");
const filterFactoryService = require("../services/filter.factory.service");
const Task = require("../models/Task");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize([Roles.MANAGER]),
  async (req, res, next) => { 
      const { idClient, prestations, dateDebut } = req.body;

      try {
          const task = await taskService.createTaskWithPrestations(idClient, prestations, dateDebut);
          const message = "Task created successfully";
          res.status(201).json(new ApiResponse(task, message));
      } catch (error) {
          next(error); 
      }
  }
);
// router.post(
//     "/",
//     passport.authenticate("jwt", { session: false }),
//     authorize([Roles.MANAGER]),
//     async (req, res) => {
//         try {
//             const newTask = await taskService.createTask({
//                 idClient: req.user.id,
//                 dateDebut: req.body.dateDebut,
//                 status: req.body.status
//             });
//             await newTask.save();
//             const message = "Task created";
//             res.json(new ApiResponse(null, message));
//         } catch (error) {
//             next(error);
//         }
// });

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    authorize([Roles.MANAGER]),
    async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    let filters = {};
    if (req.query.filters) {
      const rawFilters = req.query.filters;
      filters = filterFactoryService.createFilters(rawFilters);
    }
    const tasks = await taskService.getAllTasks(page, size, filters);
    const totalElements = await Task.countDocuments(filters);
    const payload = { tasks: new Pageable(tasks, page, size, totalElements) };
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
      const updatedService = await taskService.updateTask(
        req.params.id,
        req.body.dateDebut.
        req.body.status
      );
      await updatedService.save();
      const message = "Task updated";
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
      const deletedTask = await taskService.deleteService(req.params.id);
      await deletedTask.remove();
      const message = "Task deleted";
      res.json(new ApiResponse(null, message));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;