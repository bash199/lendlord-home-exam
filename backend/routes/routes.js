const Router = require("koa-router");
const router = new Router();

const ctrl = require("../controllers/users");

router.get("/user/:id", ctrl.getUserById);
router.get("/users", ctrl.getAllUsers);
router.put("/updateUser/:id", ctrl.updateUser);
router.post("/new", ctrl.createNewUser);
router.delete("/delete/:id", ctrl.deleteUser);
router.get("/manAndEmps/:id", ctrl.getManagerAndEmployees);

router.allowedMethods();

module.exports = router;
