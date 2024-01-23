import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(400).send({ error: "name is required" });
      case !description:
        return res.status(400).send({ error: "description is required" });
      case !price:
        return res.status(400).send({ error: "price is required" });
      case !category:
        return res.status(400).send({ error: "category is required" });
      case !quantity:
        return res.status(400).send({ error: "quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(400)
          .send({ error: "photo is required and less than 1 mb" });
    }

    const product = new productModel({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product Created",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in product controller",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(201).send({
      success: true,
      message: "All Products",
      product,
      total: product.length,
    });
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
    const { slug } = req.params;
    const product = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");

    res.status(201).send({
      success: true,
      message: "Single Product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      error,
      message: "error in product controller",
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }

    res.status(201).send({
      success: true,
      message: "Single Product photo",
      product,
    });
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
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(400).send({ error: "name is required" });
      case !description:
        return res.status(400).send({ error: "description is required" });
      case !price:
        return res.status(400).send({ error: "price is required" });
      case !category:
        return res.status(400).send({ error: "category is required" });
      case !quantity:
        return res.status(400).send({ error: "quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(400)
          .send({ error: "photo is required and less than 1 mb" });
    }

    const { pid } = req.params;

    const product = await productModel.findByIdAndUpdate(
      pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product updated",
      product,
    });
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
    await findByIdAndDelete(req.params.pid).select("-photo");

    res.status(200).send({
      success: true,
      message: "product deleted",
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      error,
      message: "error in product controller",
    });
  }
};
