const core = require('../../core');
const { pick } = require('lodash');
const User = require('../db/schemas/user');
const bcrypt = require('bcrypt');

const saveUserInDB = (userData) => new User(userData).save();

const pickUserFields = (user) =>
  pick(user, [
    'email'
  ]);

const createUser = (userInput) => new Promise((resolve, reject) =>{
  const errorsList = core.inputCheck.user(userInput);

  if (errorsList.length) {
    reject(errorsList);
    return;
  }

  const hashedPassword = bcrypt.hashSync(userInput.password, 10);
  const userData = Object.assign({}, userInput, {
    password: hashedPassword
  });

  return saveUserInDB(userData)
    .then(pickUserFields)
    .then(resolve)
    .catch(reject);
});

module.exports = createUser