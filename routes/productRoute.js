import express from "express";
import { isAdmin, requireSign } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  singleProductController,
  updateProductController,
  deleteProductController,
  productPhotoController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSign,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSign,
  isAdmin,
  formidable(),
  updateProductController
);
router.get("/get-product", getProductController);
router.get("/single-product/:slug", singleProductController);

router.get("/product-photo/:pid", productPhotoController);

router.delete(
  "/delete-product/:pid",
  requireSign,
  isAdmin,
  deleteProductController
);

export default router;
