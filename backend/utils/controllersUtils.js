const {
  deleteFiles,
  deleteSingleFile,
  addSingleFile,
  addFiles
} = require("./fileUtils");

const getBasicContollers = (
  pluralName,
  singularName,
  Model,
  populateFields,
  imageField,
  isImageRequered,
  isMultipleImages
) => {
  const capitailzedPluralName = pluralName[0].toUpperCase + pluralName.slice(1);
  const capitailzedSingularName =
    singularName[0].toUpperCase + singularName.slice(1);

  return {
    [`getAll${capitailzedPluralName}`]: async (req, res) => {
      try {
        let data;
        if (populateFields) {
          data = await Model.find().populate(populateFields);
        } else {
          data = await Model.find();
        }
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
      }
    },

    [`getSingle${capitailzedSingularName}`]: async (req, res) => {
      try {
        const { id } = req.params;
        const data = await Model.findById(id);

        if (!data) {
          return res
            .status(404)
            .json({ success: false, msg: `No such ${singularName} found!` });
        }

        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
      }
    },

    [`add${capitailzedSingularName}`]: async (req, res) => {
      try {
        const image = req.files[imageField];

        if (isImageRequered && !image) {
          return res
            .status(400)
            .json({ success: false, msg: `${imageField} is required!` });
        }

        if (isMultipleImages) {
          req.body[imageField] = await addFiles(image, singularName);
        } else {
          req.body[imageField] = await addSingleFile(image, singularName);
        }

        const data = await SubCategory.create(req.body);
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
      }
    },

    [`update${capitailzedSingularName}`]: async (req, res) => {
      try {
        const { id } = req.params;
        let body = req.body;

        const data = await Model.findById(id);

        if (!data) {
          res
            .status(404)
            .json({ success: false, msg: `No such ${singularName} found!` });
        }

        if (req.files) {
          // Image is updated.
          const image = req.files[imageField];
          const fileToBeDeleted = path.parse(data.image).base;
          const filesInSubCategories = await fs.readdir(
            path.join(__dirname, "../uploads/subCategories")
          );
          if (filesInSubCategories.includes(fileToBeDeleted)) {
            await fs.unlink(
              path.join(__dirname, "../uploads/subCategories", fileToBeDeleted)
            );
          }
          const uniqueFileName = Date.now() + "-" + image.name;
          const uploadPath = path.join(
            __dirname,
            "../uploads/subCategories",
            uniqueFileName
          );
          await image.mv(uploadPath);
          body = {
            ...body,
            image: `${process.env.BASE_URL}/uploads/subCategories/${uniqueFileName}`
          };
        }

        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
          id,
          body
        );
        res.status(200).json({ success: true, data: updatedSubCategory });
      } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
      }
    },

    [`delete${capitailzedSingularName}`]: async (req, res) => {
      try {
        const { id } = req.params;

        const data = await Model.findById(id);

        if (!data) {
          return res
            .status(404)
            .json({ success: false, msg: `No such ${singularName} found!` });
        }

        if (Array.isArray(data[imageField])) {
          await deleteFiles(data[imageField], singularName);
          await Model.findByIdAndDelete(id);
        } else {
          await deleteSingleFile(data[imageField], singularName);
        }

        await Model.findByIdAndDelete(id);

        res
          .status(200)
          .json({ success: true, msg: `${singularName} deleted!` });
      } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
      }
    }
  };
};

module.exports = { getBasicContollers };
