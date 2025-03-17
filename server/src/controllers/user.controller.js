const router = require("express").Router();
const ApiResponse = require("../config/response/api.response");
const User = require("../models/User");
const Pageable = require("../config/response/pageable");
const userService = require("../services/user/user.service");
const filterFactoryService = require("../services/filter.factory.service");

router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
      const size = parseInt(req.query.size) || 10;
      let filters = {};
      if (req.query.filters) {
          const rawFilters = req.query.filters;
          filters = filterFactoryService.createFilters(rawFilters);
      }
    const users = await userService.getAllUsers(page, size, filters);
    const totalElements = await User.countDocuments(filters);
    const payload = { users: new Pageable(users, page, size, totalElements) };
    res.json(new ApiResponse(payload));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {});

router.put("/:id", async (req, res, next) => {});

router.delete("/:id", async (req, res, next) => {});

module.exports = router;
