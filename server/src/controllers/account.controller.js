const router = require("express").Router();
const Roles = require("../config/roles");
const userFactoryService = require("../services/user.factory.service");

router.post("/create/client", async (req, res, next) => {
  try {
    const newUser = await userFactoryService.createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      roleName: Roles.CLIENT,
    });
    await newUser.save();
    res.json({ message: "CLIENT account created" });
  } catch (error) {
    next(error);
  }
});

router.post("/create/mechanic", async (req, res, next) => {
  try {
    const newUser = await userFactoryService.createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      roleName: Roles.MECHANIC,
    });
    await newUser.save();
    res.json({ message: "Mechanic account created" });
  } catch (error) {
    next(error);
  }
});

router.post("/create/manager", async (req, res, next) => {
  try {
    const newUser = await userFactoryService.createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      roleName: Roles.MANAGER,
    });
    await newUser.save();
    res.json({ message: "Manager account created" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
