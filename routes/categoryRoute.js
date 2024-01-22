import express from "express";
import { isAdmin, requireSign } from "../middlewares/authMiddleware.js";
import {
  createcategoryController,
  updatecategoryController,
  getcategoryController,
  singlecategoryController,
  deletecategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create-category", requireSign, isAdmin, createcategoryController);
router.put(
  "/update-category/:id",
  requireSign,
  isAdmin,
  updatecategoryController
);
router.get("/get-category", getcategoryController);
router.get("/single-category/:slug", singlecategoryController);
router.delete(
  "/delete-category/:id",
  requireSign,
  isAdmin,
  deletecategoryController
);
// router.post("/create-category", requireSign, isAdmin, createcategoryController);

export default router;
