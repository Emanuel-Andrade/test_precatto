const Message = require('../models/Message');

class MessageController {
  async create(req, res) {
    const { message } = req.body;
    const messages = await Message.getAll();
    let position;
    // Get new message position
    if (messages.length === 0) position = 1;
    if (messages.length > 0) position = messages.length + 1;
    // Message Validation
    if (!message || message === ' ') return res.status(400).json({ errors: ['Campo messagem é obrigatório.'] });
    if (message.length < 3 || message.length > 300) return res.status(400).json({ errors: ['Mensagem deve conter entre 3 e 300 caracteres.'] });

    try {
      const response = await Message.create(message, position);

      return res.json(response);
    } catch (error) {
      return console.log(error.message);
    }
  }
}

module.exports = new MessageController();
