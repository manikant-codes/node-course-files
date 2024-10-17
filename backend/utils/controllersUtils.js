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
  imageField,
  isImageRequired,
  isMultipleImages,
  populateFields
) => {
  const capitailzedPluralName =
    pluralName[0].toUpperCase() + pluralName.slice(1);
  const capitailzedSingularName =
    singularName[0].toUpperCase() + singularName.slice(1);

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

    [`get${capitailzedSingularName}`]: async (req, res) => {
      try {
        const { id } = req.params;

        let data;

        if (populateFields) {
          data = await Model.findById(id).populate(populateFields);
        } else {
          data = await Model.findById(id);
        }

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
        let image = req.files && req.files[imageField];

        if (isImageRequired && !image) {
          return res
            .status(400)
            .json({ success: false, msg: `${imageField} is required!` });
        }

        if (isMultipleImages) {
          if (!Array.isArray(image)) {
            image = [image];
          }
          req.body[imageField] = await addFiles(image, singularName);
        } else {
          req.body[imageField] = await addSingleFile(image, singularName);
        }

        const data = await Model.create(req.body);
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
      }
    },

    [`update${capitailzedSingularName}`]: async (req, res) => {
      try {
        const { id } = req.params;

        const data = await Model.findById(id);

        if (!data) {
          res
            .status(404)
            .json({ success: false, msg: `No such ${singularName} found!` });
        }

        if (req.files) {
          const image = req.files[imageField];

          if (isMultipleImages) {
            await deleteFiles(
              data[imageField],
              singularName,
              req.body[imageField]
            );
            req.body[imageField] = await addFiles(image, singularName);
          } else {
            await deleteSingleFile(data[imageField], singularName);
            req.body[imageField] = await addSingleFile(image, singularName);
          }
        }

        const updatedData = await Model.findByIdAndUpdate(id, body);
        res.status(200).json({ success: true, data: updatedData });
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

        if (isMultipleImages) {
          await deleteFiles(data[imageField], singularName);
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
