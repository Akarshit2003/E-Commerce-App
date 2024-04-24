import express from "express";
import {brainTreePaymentController, brainTreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//Update Product Routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

// //single product
router.get("/get-product/:slug", getSingleProductController);

// //get photo
router.get("/product-photo/:pid", productPhotoController);

// //delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

// filter Products
router.post("/product-filters", productFilterController);

// Product Count
router.get("/product-count", productCountController);

// Product per page
router.get('/product-list/:page',productListController);

// Search Products
router.get('/search/:keyword',searchProductController);

// Similar Products
router.get('/related-product/:piD/:cid',relatedProductController);

//Category wise product
router.get('/product-category/:slug',productCategoryController);

//Payment Routes
// token
router.get('/braintree/token',brainTreeTokenController);

// Payments Route
router.post('/braintree/payment',requireSignIn,brainTreePaymentController);

export default router;