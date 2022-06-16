const Subscription = require('../models/Subscription');
const EmailValidator = require('./EmailValidator');
const Timer = require('./sendMailController');

class SubscriptionController {
  async create(req, res) {
    const { name, email } = req.body;
    Timer();

    // Form Validation
    if (!name || name === ' ') return res.status(400).json({ errors: ['Campo Nome é obrigatório.'] });
    if (name.length < 3 || name.length > 50) return res.status(400).json({ errors: ['Nome deve conter entre 3 e 50 caracteres.'] });
    if (!EmailValidator.validate(email)) return res.status(400).json({ errors: ['Email inválido'] });
    const hasEmail = await Subscription.findByEmail(email);
    if (hasEmail.length !== 0) return res.status(400).json({ errors: ['Email já cadastrado'] });

    try {
      const response = await Subscription.create(name, email);

      return res.json(response);
    } catch (error) {
      return console.log(error.message);
    }
  }
}

module.exports = new SubscriptionController();
