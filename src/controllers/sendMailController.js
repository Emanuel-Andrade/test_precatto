const nodeMailer = require('nodemailer');
const Subscription = require('../models/Subscription');
const Message = require('../models/Message');

// NodeMailer Transporter
const transporter = nodeMailer.createTransport({
  host: process.env.SMTPHOST,
  port: process.env.SMTPPORT,
  secure: true,
  auth: {
    user: process.env.GMAILUSER,
    pass: process.env.GMAILPASSWORD,
  },
});

// NodeMailer
const sendMail = (user, message) => {
  transporter.sendMail({
    from: `Precatto <${process.env.GMAILUSER}>`,
    to: user.email,
    subject: 'Notificações Precatto',
    text: message,
  });
};

// Update User
const updateUser = async (user) => {
  try {
    const messages = await Message.getAll();
    // check if user need to be disabled
    if (user.last_message + 1 >= messages.length) {
      await Subscription.update(user.id, { active: 0 });
    }

    // update last message user has recieved
    await Subscription.update(user.id, { last_message: user.last_message + 1 });
  } catch (error) {
    console.log(error.message);
  }
};

const Timer = async () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  if (hour === 14 && minutes === 7) {
    const messages = await Message.getAll();
    const users = await Subscription.getAll();
    users.map(async (user) => {
      if (user.active == 0) return;
      if (user.last_message >= messages.length) return;
      const message = await Message.findMessageByPosition(user.last_message + 1);
      sendMail(user, message[0].message);
      console.log(`nome:${user.name} mensagem:${message[0].message}`);
      updateUser(user);
    });
  }
};

setInterval(() => {
  Timer();
}, 1000 * 50);

module.exports = Timer;
