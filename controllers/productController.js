import productModel from "../models/productModel.js";

export const createProductController = async (req, res) => {
  try {
    const product=await productModel
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      error,
      message: "error in product controller",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      error,
      message: "error in product controller",
    });
  }
};

export const singleProductController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      error,
      message: "error in product controller",
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      error,
      message: "error in product controller",
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      error,
      message: "error in product controller",
    });
  }
};
