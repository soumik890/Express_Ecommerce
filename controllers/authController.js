import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name) {
      return res.send({ error: "name is Required" });
    }
    if (!email) {
      return res.send({ error: "email is Required" });
    }
    if (!password) {
      return res.send({ error: "password is Required" });
    }
    if (!phone) {
      return res.send({ error: "phone is Required" });
    }
    if (!address) {
      return res.send({ error: "address is Required" });
    }
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(200)
        .send({ success: true, message: "User all ready existed" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "user registerd",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in registration controller",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registerged",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "logged In successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.send("Protected Test Conroller");
};
