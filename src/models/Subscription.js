const knex = require('../database/connection');

class Subscription {
  async create(name, email) {
    try {
      const newSubscription = await knex.insert({
        name, email, last_message: 0, active: true,
      }).table('subscriptions');

      return newSubscription;
    } catch (error) {
      return console.log(error.message);
    }
  }

  async getAll() {
    try {
      const users = await knex.select('*').table('subscriptions');
      return users;
    } catch (error) {
      return console.log(error.message);
    }
  }

  async findByEmail(email) {
    try {
      const res = await knex.where({ email }).table('subscriptions').select(['email']);
      return res;
    } catch (error) {
      return console.log(error.message);
    }
  }

  async update(userId, data) {
    try {
      const res = await knex.update(data).table('subscriptions').where({ id: userId });
      return res;
    } catch (error) {
      return console.log(error.message);
    }
  }
}

module.exports = new Subscription();
