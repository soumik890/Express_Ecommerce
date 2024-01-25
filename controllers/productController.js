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
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};


// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};