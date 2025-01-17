const { saveFile, deleteFile } = require("../helpers/fileHelpers");
const {
  sendErrorResponse,
  sendDataResponse
} = require("../helpers/resHelpers");
const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    sendDataResponse(res, products);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getAllProductsBySubCategorySlug = async (req, res) => {
  try {
    const { subCategorySlug } = req.params;

    const subCategory = await SubCategory.findOne({ slug: subCategorySlug });

    if (!subCategory) {
      return sendErrorResponse(res, "No such sub-category found.", 404);
    }

    const products = await Product.find({ subCategory: subCategory._id });

    sendDataResponse(res, products);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return sendErrorResponse(res, "No such product found.", 404);
    }

    sendDataResponse(res, product);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });

    if (!product) {
      return sendErrorResponse(res, "No such product found.", 404);
    }

    sendDataResponse(res, product);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    if (!req.files || !req.files.images) {
      return sendErrorResponse(res, "Product image is required.", 400);
    }

    if (Array.isArray(req.files.images)) {
      const temp = [];

      for (const image of req.files.images) {
        const imageURL = await saveFile(image, "product");
        temp.push(imageURL);
      }

      req.body.images = temp;
    } else {
      const imageURL = await saveFile(req.files.images, "product");
      req.body.images = [imageURL];
    }

    if (req.body.sizes) {
      req.body.sizes = req.body.sizes.split(",");
    }

    if (req.body.colors) {
      req.body.colors = req.body.colors.split(",");
    }

    const product = await Product.create(req.body);

    sendDataResponse(res, product);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return sendErrorResponse(res, "No such product found.", 404);
    }

    if (!req.body) {
      req.body = {};
    }

    if (!req.body.images) {
      req.body.images = [];
    }

    if (req.files && req.files.images) {
      if (Array.isArray(req.files.images)) {
        const temp = [];
        for (const imageFile of req.files.images) {
          const imageURL = await saveFile(imageFile, "product");
          temp.push(imageURL);
        }

        for (const imageURL of product.images) {
          if (!req.body.images.includes(imageURL)) {
            await deleteFile(imageURL, "product");
          }
        }

        req.body.images = [...req.body.images, ...temp];
      } else {
        const imageURL = await saveFile(req.files.images, "product");

        for (const image of product.images) {
          if (!req.body.images.includes(image)) {
            await deleteFile(image, "product");
          }
        }

        req.body.images = [...req.body.images, imageURL];
      }
    }

    if (req.body.sizes) {
      req.body.sizes = req.body.sizes.split(",");
    }

    if (req.body.colors) {
      req.body.colors = req.body.colors.split(",");
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true
    });

    sendDataResponse(res, updatedProduct);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return sendErrorResponse(res, "No such product found.", 404);
    }

    // Delete Image
    for (const image of product.images) {
      await deleteFile(image, "product");
    }

    await Product.findByIdAndDelete(id);

    sendDataResponse(res, null);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllProducts,
  getAllProductsBySubCategorySlug,
  getProductById,
  getProductBySlug,
  addProduct,
  updateProduct,
  deleteProduct
};
