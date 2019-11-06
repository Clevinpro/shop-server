const Product = require("../../../domain/db/schemas/product");

const deleteProduct = (request, response) => {
  const product = request.body;
  const id = request.params.id;

  const sendError = () => {
    response.status(400);
    response.json({
      status: "error",
      text: "there is no such product"
    });
  };

  const sendResponse = () => {
    Product.find()
    .exec(function(err, products) {
      console.log(err);
      if (err) return sendError(err);
      response.json({
        status: "success",
        products
      });
    });
  };

  Product.deleteOne({ _id: id }, { new: true })
    .then(sendResponse)
    .catch(sendError);
};

module.exports = deleteProduct;
