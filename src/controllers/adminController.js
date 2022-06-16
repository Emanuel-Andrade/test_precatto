const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const EmailValidator = require('./EmailValidator');

const jwtSecret = process.env.SECRET;

class AdminController {
  async create(req, res) {
    const { name, email, password } = req.body;

    // FormValidation
    if (!name || name === ' ') return res.status(400).json({ errors: ['Campo Nome é obrigatório.'] });
    if (name.length < 3 || name.length > 50) return res.status(400).json({ errors: ['Nome deve conter entre 3 e 50 caracteres.'] });
    if (!EmailValidator.validate(email)) return res.status(400).json({ errors: ['Email inválido'] });
    const hasEmail = await Admin.findByEmail(email);
    if (hasEmail.length > 0) return res.status(400).json({ errors: ['Email já cadastrado'] });
    if (!password || password === ' ') return res.status(400).json({ errors: ['Campo Senha é obrigatório.'] });
    if (password.length < 6) return res.status(400).json({ errors: ['Senha deve conter pelo menos 6 caracteres.'] });

    // Password hash
    const hash = bcrypt.hashSync(password, 8);

    try {
      const newAdmin = await Admin.create({ name, email, password: hash });

      return res.json(newAdmin);
    } catch (error) {
      return console.log(error.message);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      // check if email and password is correct
      if (!EmailValidator.validate(email)) return res.status(400).json({ errors: ['email inválido'] });
      const admin = await Admin.findByEmail(email);
      if (admin.length === 0) return res.status(400).json({ errors: ['Email incorreto'] });
      if (!bcrypt.compareSync(password, admin[0].password)) return res.status(400).json({ errors: ['Senha incorreta'] });

      // create a token
      const tokenGenerator = (id, emailToken) => jwt.sign({ id, email: emailToken }, jwtSecret, { expiresIn: '7d' });

      const token = tokenGenerator(admin[0].id, admin[0].email);

      return res.json({ name: admin[0].name, token });
    } catch (error) {
      return console.log(error.message);
    }
  }
}

module.exports = new AdminController();
