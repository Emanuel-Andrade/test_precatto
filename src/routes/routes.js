const express = require('express');
const Subscription = require('../controllers/subscriptionController');
const Message = require('../controllers/messageController');
const Admin = require('../controllers/adminController');
const Auth = require('../middlewares/Auth');

const routes = express.Router();

// Subcribe route
routes.post('/subscribe', Subscription.create);
// Set new message in message_flow
routes.post('/message', Auth, Message.create);
// Create new admin
routes.post('/admin', Admin.create);
// admin login
routes.post('/login', Admin.login);

module.exports = routes;
