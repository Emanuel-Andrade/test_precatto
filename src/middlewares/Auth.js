const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const jwtSecret = process.env.SECRET;

const auth = async (req, res, next) => {
  const bearer = req.headers.authorization;

  const token = bearer && bearer.split(' ')[1];
  if (!token) return res.status(401).json({ errors: ['Usuário não autorizado'] });

  try {
    const verified = jwt.verify(token, jwtSecret);
    const user = await Admin.findByEmail(verified.email);
    req.user = { name: user[0].name, email: user[0].email };
    console.log(req.user);
    return next();
  } catch (error) {
    return res.status(400).json({ errors: ['Token inválido'] });
  }
};

module.exports = auth;
