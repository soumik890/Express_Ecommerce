import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
export const createcategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ mesage: "Name is required" });
    }

    const existingCat = await categoryModel.findOne({ name });

    if (existingCat) {
      return res.status(200).send({
        success: true,
        message: "Category Already exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      succces: false,
      error,
      message: "error in category controller",
    });
  }
};
export const updatecategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "category updated",
      category,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      error,
      message: "error in category controller",
    });
  }
};

export const getcategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(201).send({
      success: true,
      message: "All categories",
      category,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      succces: false,
      error,
      message: "error in category controller",
    });
  }
};

export const singlecategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    res.status(201).send({
      success: true,
      message: "Single categories",
      category,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      error,
      message: "error in category controller",
    });
  }
};

export const deletecategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findOneAndDelete({ _id: id });
    res.status(201).send({
      success: true,
      message: "Category deleted",
      category,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      error,
      message: "error in category controller",
    });
  }
};
