const router = require("express").Router();
const Roles = require("../config/roles");
const passport = require("../config/auth/passport");
const taskDetailService = require("../services/taskdetail/taskDetail.service");
const ApiResponse = require("../config/response/api.response");
const authorize = require("../middlewares/authorization.middleware");
const Pageable = require("../config/response/pageable");
const filterFactoryService = require("../services/filter.factory.service");
const TaskDetail = require("../models/TaskDetail");

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
    const taskDetail = await taskDetailService.getAllTaskDetail(page, size, filters);
    const totalElements = await TaskDetail.countDocuments(filters);
    const payload = { taskDetail: new Pageable(taskDetail, page, size, totalElements) };
    res.json(new ApiResponse(payload));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
