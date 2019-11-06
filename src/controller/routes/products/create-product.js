const Product = require("../../../domain/db/schemas/product");

const createProduct = (request, response) => {
  const product = request.body;
  console.log('product :', product);
  console.log("request: product", product);

  const productData = { ...product };

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

module.exports = createProduct;
