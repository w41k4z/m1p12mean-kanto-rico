const router = require("express").Router();
const ApiResponse = require("../config/response/api.response");
const userService = require("../services/user/user.service");

router.get(
  "/",
    async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        const payload = { users }
        res.json(new ApiResponse(payload));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  async (req, res) => {
  }
);

router.put(
  "/:id",
  async (req, res, next) => {
  }
);

router.delete(
  "/:id",
  async (req, res, next) => {
  }
);

module.exports = router;