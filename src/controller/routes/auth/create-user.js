const domain = require('../../../domain');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');
const util = require('util');
const uuidv1 = require('uuid/v1');

const renameFile = util.promisify(fs.rename);
const mimeTypes = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
}


const TEMP_IMAGE_FOLDER = path.join(__dirname, '../../../', 'public');
const USER_IMAGE_FOLDER = path.join(__dirname, '../../../', 'public', 'images');
const USER_IMAGES_FOLDER_NAME = '/public/images/';


const storage = multer.diskStorage({
  // определяем папку куда сохранять временное изображение
  destination: (req, file, next) => {
    next(null, TEMP_IMAGE_FOLDER)
  },
  // определяем имя файла
  filename: (req, file, next) => {
    next(null, file.originalname)
  }
});

// Применяем настройки
const upload = multer({ storage });

const moveImage = (fileObject, id) => {
  //  cоздаем папку для файлов пользователя
  const userImagePath =  path.join(USER_IMAGE_FOLDER);

  if (!fs.existsSync(userImagePath)){
    fs.mkdirSync(userImagePath);
  }

  const tempFilePath = path.join(TEMP_IMAGE_FOLDER, fileObject.originalname);
  const newFilePath = path.join(userImagePath, id + mimeTypes[fileObject.mimetype]);

  return renameFile(tempFilePath, newFilePath)
    .then(() => console.log('upload success'))
    .catch((error) => console.log(error))
};


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