const jwt = require('jsonwebtoken');
const User = require('../../../domain/db/schemas/user');
const app = require('../../app/app');
const bcrypt = require('bcrypt');

const errorUser = {
  error: 'User in not defined'
};

const errorPassword = {
  error: 'Password is invalid'
};

const passwMatches = (passw, hash) => bcrypt.compareSync(passw, hash);

const generateToken = paramsForTokenGeneration => {
  const secretKey = app.get('superSecret');

  return jwt.sign(paramsForTokenGeneration, secretKey, {
    expiresIn: 60 * 60 * 24 * 7
  });
};

const authenticate = (req, res) => {
  const { email, password } = req.body;

  const userId = { email: email };

  User.findOne(userId)
  .exec(onFind);

  function onFind(err, user) {
    if (err) throw err;

    if (!user) {
      res.json(errorUser);
      return;
    }
    const correctPassword = passwMatches(password, user.password);

    if (!correctPassword) {
      res.json(errorPassword);
      return;
    }

    const { _id: id, name } = user;

    const payload = {
      id
    };

    const token = generateToken(payload);

    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token,
      user: {
        id,
        name,
      }
    });
  }
};

module.exports = authenticate;
