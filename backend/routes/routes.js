const Router = require("koa-router");
const router = new Router();

const ctrl = require("../controllers/users");

router.get("/user/:id", ctrl.getUserById);
router.get("/users", ctrl.getAllUsers);
router.put("/updateUser", ctrl.updateUser);

router.allowedMethods();

module.exports = router;
