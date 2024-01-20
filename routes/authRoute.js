import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPassController
} from "../controllers/authController.js";
import { requireSign } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
// router.post("/test", requireSign, isAdmin, testController);

router.post("/forgotpass", forgotPassController)


//protected route
router.get("/user-auth", requireSign, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
