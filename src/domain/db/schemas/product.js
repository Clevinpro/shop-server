const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    id: { type: String, default: "" },
    type: { type: String, default: "" },
    gender: { type: String, default: "" },
    material: { type: String, default: "" },
    brandName: { type: String, default: "" },
    name: { type: String, default: "" },
    size: { type: String, default: "" },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    descriptionFull: { type: String, default: "" },
    price: { type: Number, default: 0 },
    availability: { type: Number, default: 0 },
    popular: { type: Boolean, default: false },
    description: { type: String, default: "" },
    purchases: { type: Number, default: 0 },
  },
  { versionKey: false }
);
const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;
