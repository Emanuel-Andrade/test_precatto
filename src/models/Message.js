const knex = require('../database/connection');

class Message {
  async create(messageText, position) {
    try {
      const newMessage = await knex.insert({ message: messageText, position }).table('message_flow');
      return newMessage;
    } catch (error) {
      return console.log(error.message);
    }
  }

  async getAll() {
    try {
      const messages = await knex.select('*').table('message_flow');
      return messages;
    } catch (error) {
      return console.log(error.message);
    }
  }

  async findMessageByPosition(position) {
    try {
      const message = await knex.where({ position }).table('message_flow').select(['message']);
      return message;
    } catch (error) {
      return console.log(error.message);
    }
  }
}

module.exports = new Message();
