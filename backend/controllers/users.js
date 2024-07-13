const { ObjectId } = require("mongodb");
const Users = require("../lib/users");
const users = new Users();

/**
 * Gets user by id
 */
exports.getUserById = async (ctx) => {
   const { id } = ctx.params;
   try {
      console.log(1);
      const user = await users.findUser({ _id: new ObjectId(id) });

      ctx.status = 200;
      ctx.body = user;
   } catch (err) {
      ctx.status = err.status || 500;
      ctx.message = err.message || "Internal server error";
   }
};

/**
 * Gets all users
 */
exports.getAllUsers = async (ctx) => {
   try {
      console.log(2);
      const user = await users.findAllUsers();

      ctx.status = 200;
      ctx.body = user;
   } catch (err) {
      ctx.status = err.status || 500;
      ctx.message = err.message || "Internal server error";
   }
};

/**
 * Updates a user by _id
 */
exports.updateUser = async (ctx) => {
   try {
      const { id, updated } = ctx.request.body;
      const user = await users.findUserAndUpdate({ _id: new ObjectId(id) }, updated);

      ctx.status = 200;
      ctx.body = user;
   } catch (err) {
      ctx.status = err.status || 500;
      ctx.message = err.message || "Internal server error";
   }
};

/**
 * Creates a new user
 */
exports.createNewUser = async (ctx) => {
   try {
      const userData = ctx.request.body;
      const newUser = await users.createNewUser(userData);

      ctx.status = 201;
      ctx.body = newUser;
   } catch (err) {
      ctx.status = err.status || 500;
      ctx.message = err.message || "Internal server error";
   }
};

async function initialize() {
   await users.initialize();
}

initialize();
