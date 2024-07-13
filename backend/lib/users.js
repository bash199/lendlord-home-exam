const UsersRepo = require("../repository/users");

class Users {
   async initialize() {
      this.repo = new UsersRepo();
   }

   async findUser(query, projection = {}) {
      const user = await this.repo.findOne(query);
      return user;
   }

   async findAllUsers(query, projection = {}) {
      const users = await this.repo.findAll(query);
      return users;
   }

   async findUserAndUpdate(query, update = {}) {
      const updatedUser = await this.repo.findUserAndUpdate(query, update);
      return updatedUser;
   }
}

module.exports = Users;
