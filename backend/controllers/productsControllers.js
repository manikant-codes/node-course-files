const Product = require("../models/Product");
const path = require("path");
const fs = require("fs/promises");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No such product found." });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ success: false, message: "Product images are required." });
    }

    if (Array.isArray(req.files.images)) {
      const imagesURLs = [];

      for (const imageFile of req.files.images) {
        const fileName = Date.now() + "-" + imageFile.name;
        const filePath = path.join(
          __dirname,
          "../uploads",
          "product",
          fileName
        );
        await imageFile.mv(filePath);
        const imageURL = `http://localhost:5000/uploads/product/${fileName}`;
        imagesURLs.push(imageURL);
      }

      req.body.images = imagesURLs;
    } else {
      const imagesURLs = [];

      const fileName = Date.now() + "-" + req.files.images.name;
      const filePath = path.join(__dirname, "../uploads", "product", fileName);
      await req.files.images.mv(filePath);
      const imageURL = `http://localhost:5000/uploads/product/${fileName}`;
      imagesURLs.push(imageURL);

      req.body.images = imagesURLs;
    }

    const product = await Product.create(req.body);

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No such product found." });
    }

    if (!req.body) {
      req.body = {};
    }

    if (!req.body.images) {
      req.body.images = [];
    }

    if (req.files && req.files.images) {
      if (Array.isArray(req.files.images)) {
        const imagesURLs = [];

        for (const imageFile of req.files.images) {
          const fileName = Date.now() + "-" + imageFile.name;
          const filePath = path.join(
            __dirname,
            "../uploads",
            "product",
            fileName
          );
          await imageFile.mv(filePath);
          const imageURL = `http://localhost:5000/uploads/product/${fileName}`;
          imagesURLs.push(imageURL);
        }

        req.body.images = [...req.body.images, ...imagesURLs];
      } else {
        const imagesURLs = [];

        const fileName = Date.now() + "-" + req.files.images.name;
        const filePath = path.join(
          __dirname,
          "../uploads",
          "product",
          fileName
        );
        await req.files.images.mv(filePath);
        const imageURL = `http://localhost:5000/uploads/product/${fileName}`;
        imagesURLs.push(imageURL);

        req.body.images = [...req.body.images, ...imagesURLs];
      }
    }

    for (const imageURL of product.images) {
      if (!req.body.images.includes(imageURL)) {
        const fileName = path.basename(imageURL);
        const folderPath = path.join(__dirname, "../uploads", "product");
        const filePath = path.join(
          __dirname,
          "../uploads",
          "product",
          fileName
        );
        const filesInFolder = await fs.readdir(folderPath);

        if (filesInFolder.includes(fileName)) {
          await fs.unlink(filePath);
        }
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true
    });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No such product found." });
    }

    for (const imageURL of product.images) {
      const fileName = path.basename(imageURL);
      const folderPath = path.join(__dirname, "../uploads", "product");
      const filePath = path.join(__dirname, "../uploads", "product", fileName);
      const filesInFolder = await fs.readdir(folderPath);

      if (filesInFolder.includes(fileName)) {
        await fs.unlink(filePath);
      }
    }

    await Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
