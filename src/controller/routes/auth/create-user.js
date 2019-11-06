const domain = require('../../../domain');

const createUser = (request, response) => {
  console.log('reques', request.body)
  const user = request.body;

  const sendResponse = (user) => {
    response.json({
      status: 'success',
      user
    });
  };

  const sendError = (errMessages) => {
    response.status(400);
    response.json({
      error: 'users was not saved',
      errMessages
    });
  };

  domain.userAPI.createUser(user)
    .then(sendResponse)
    .catch(sendError)
};

module.exports = createUser;