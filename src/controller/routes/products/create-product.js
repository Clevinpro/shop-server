const Product = require("../../../domain/db/schemas/product");
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


const TEMP_IMAGE_FOLDER = path.join(__dirname, '../../../../', 'public');
const USER_IMAGE_FOLDER = path.join(__dirname, '../../../../', 'public', 'uploads');
const USER_IMAGES_FOLDER_NAME = '/uploads/';


const storage = multer.diskStorage({
  // определяем папку куда сохранять временное изображение
  destination: (request, file, next) => {
    next(null, TEMP_IMAGE_FOLDER)
  },
  // определяем имя файла
  filename: (request, file, next) => {
    next(null, file.originalname)
  }
});

// Применяем настройки
const upload = multer({ storage });

const moveImage = (fileObject, id) => {
  //  cоздаем папку для файлов пользователя
  // const userImagePath =  path.join(USER_IMAGE_FOLDER);

  if (!fs.existsSync(USER_IMAGE_FOLDER)){
    fs.mkdirSync(USER_IMAGE_FOLDER);
  }

  const tempFilePath = path.join(TEMP_IMAGE_FOLDER, fileObject.originalname);
  const newFilePath = path.join(USER_IMAGE_FOLDER, id + mimeTypes[fileObject.mimetype]);

  return renameFile(tempFilePath, newFilePath)
    .then(() => console.log('upload success'))
    .catch((error) => console.log(error))
};

const createProduct = (request, response) => {
  const product = request.body;
  console.log('product :', product);
  console.log("request: product", product);

  
  const fileObject = request.files.image;
  console.log('request.files___________________', request.files)
  console.log('body', request.body);
  console.log('fileObject :', fileObject[0]);

  const id = uuidv1();
  moveImage(fileObject[0], id);
  const image = USER_IMAGES_FOLDER_NAME + id + mimeTypes[fileObject[0].mimetype];
  
  console.log('image___________________________ :', image);

  const productData = { ...product };
  productData.material = JSON.parse(productData.material);
  productData.image = image;

  const newProduct = new Product(productData);

  const sendResponse = product => {
    Product.find()
      // .populate('ingredients')
      .exec(function(err, products) {
        console.log(err);
        if (err) return sendError(err);
        response.json({
          status: "success",
          products
        });
      });
  };

  const sendError = err => {
    console.log(JSON.stringify(err));
    response.status(400);
    response.json({
      error: "product was not saved"
    });
  };

  newProduct
    .save()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = () => [upload.fields([{ name: 'image' }]), createProduct];
