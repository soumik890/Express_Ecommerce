import express from "express";
import { isAdmin, requireSign } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  singleProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create-product", requireSign, isAdmin, createProductController);
router.put(
  "/update-category/:id",
  requireSign,
  isAdmin,
  updateProductController
);
router.get("/get-category", getProductController);
router.get("/single-category/:slug", singleProductController);
router.delete(
  "/delete-product/:id",
  requireSign,
  isAdmin,
  deleteProductController
);

export default router;
