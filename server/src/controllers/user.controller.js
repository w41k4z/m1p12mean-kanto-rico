const router = require("express").Router();
const ApiResponse = require("../config/response/api.response");
const User = require("../models/User");
const Pageable = require("../config/response/pageable");
const userService = require("../services/user/user.service");

router.get("/", async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const size = parseInt(req.query.size) || 10;
        const users = await userService.getAllUsers(page, size);
      const totalElements = await User.countDocuments();
      const payload = {users: new Pageable(users, page, size, totalElements)};
      console.log(payload);
    res.json(new ApiResponse(payload));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {});

router.put("/:id", async (req, res, next) => {});

router.delete("/:id", async (req, res, next) => {});

module.exports = router;
