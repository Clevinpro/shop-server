const express = require("express");

const mainRoute = require("./main/main");

// Middleware
const verifyToken = require("../app/check-token");

// Auth
const authenticate = require("./auth/authenticate");
const currentUser = require("./auth/current");
const logout = require("./auth/logout");

// Users
const createUser = require("./auth/create-user");
const getUser = require("./user/get-user");
const getUsers = require("./user/get-users");
const updateUser = require("./user/update-user");
const deleteUser = require("./user/delete-user");
const uploadImages = require("./user/upload-igames");
const submitForm = require("./user/submit-form");

// Posts
const createProduct = require("./products/create-product");
const getProduct = require("./products/get-product");
const getProducts = require("./products/get-products");
const updateProduct = require("./products/update-product");
const deleteProduct = require("./products/delete-product");


const apiRoutes = express.Router();

apiRoutes
  .get("/", mainRoute)

  .post("/auth/signup", createUser)
  .post("/auth/signin", authenticate)

  .post("/submit", submitForm)

  .get("/auth/logout", logout)
  .get("/auth/current", currentUser)

  // Products
  .get("/products/:slug", getProduct)
  .get("/products", getProducts)

  .use(verifyToken)

  .get("/users", getUsers)
  .get("/users/:id", getUser)
  .put("/users/:id", updateUser)
  .delete("/users/:id", deleteUser)
  .post("/upload", uploadImages)

  // Products
  .post("/products", createProduct())
  .put("/products/:id", updateProduct)
  .delete('/products/:id', deleteProduct)

module.exports = apiRoutes;
