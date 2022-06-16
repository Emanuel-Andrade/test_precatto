class EmailValidator {
  validate(email) {
    const res = /\S+@\S+\.\S+/;
    return res.test(email);
  }
}

module.exports = new EmailValidator();
