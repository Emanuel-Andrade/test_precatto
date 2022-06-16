const knex = require('../database/connection');

class Admin {
  async create(name, email, password) {
    try {
      const newUser = await knex.insert(name, email, password).table('admins');

      return newUser;
    } catch (error) {
      return console.log(error.message);
    }
  }

  async findByEmail(email) {
    try {
      const res = await knex.where({ email }).table('admins');
      return res;
    } catch (error) {
      return console.log(error.message);
    }
  }
}

module.exports = new Admin();
