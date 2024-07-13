const usersModel = require("../models/users");

class Users {
   async findOne(query, projection = {}) {
      const user = await usersModel.findOne(query).select(projection);
      return user;
   }

   async findAll(query, projection = {}) {
      const users = await usersModel.find(query).select(projection);
      return users;
   }

   async findUserAndUpdate(query, update = {}) {
      const updatedUser = await usersModel.findOneAndUpdate(query, update, { new: true });
      return updatedUser;
   }

   async createNewUser(user) {
      const newUser = await usersModel.create(user);
      return newUser;
   }
}

module.exports = Users;
