const express = require("express");
const routers = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");
const productController = require("../controllers/product.controller");
const {ensureAuthenticated,ensureAdmin} = require("../middleware/adminCheck");
const authenticateToken = require("../middleware/auth");
const upload = require("../middleware/multer");

// User

routers.get("/users/:id", authenticateToken, authController.getUserById);
routers.get("/dashboard", authController.isLoggedIn, (req, res) => {res.json({ message: "Welcome to the dashboard", user: req.user });});
routers.get("/photo/:id", authController.getUserPhoto);
routers.post("/register", authController.register);
routers.post("/login", passport.authenticate("local"), authController.login);
routers.post("/photo/:id",upload.single("profilePhoto"),authController.uploadPhoto);
routers.put("/updateProfile/:id",authenticateToken,authController.updateUserProfile);

// Product Routes
routers.get("/products", productController.getAllProducts);
routers.get("/categories", productController.getAllCategories);
routers.get("/product", productController.getProducts);
routers.get("/products/:id", productController.getProductById);
routers.post("/products",ensureAuthenticated,ensureAdmin,productController.addProduct);
routers.post("/categories", ensureAuthenticated,ensureAdmin,productController.addCategory);
routers.put("/products/:id",ensureAuthenticated,ensureAdmin,productController.updateProduct);
routers.delete("/products/:id",ensureAuthenticated,ensureAdmin,productController.deleteProduct);

routers.post("/card", productController.card);

module.exports = routers;
