import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSign = async (req, res, next) => {
  // const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
  try {
    if (req.headers.authorization) {
      const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
    } else {
      res.send("**Please provide token**");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        sucess: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Admin middleware",
    });
  }
};
