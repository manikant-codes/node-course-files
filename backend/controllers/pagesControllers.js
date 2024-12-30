const Page = require("../models/Page");
const path = require("path");
const fs = require("fs/promises");

const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json({ success: true, data: pages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPageById = async (req, res) => {
  try {
    // req.params me se ham id nikal ke id naam ke variable me store kar rahe hai.
    const { id } = req.params;

    // Us id pe se page find kar rahe hai.
    const page = await Page.findById(id);

    // Agar wo page nahi milta hai to ham ye response bhej ke function se bahar aajarahe hai.
    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "No such page found." });
    }

    // Agar page milta hai to ham us page ko response me send kar rahe hai.
    res.status(200).json({ success: true, data: page });
  } catch (error) {
    // Agar koi error aati page find karne me to ham ye response bhej rahe hai.
    res.status(500).json({ success: false, message: error.message });
  }
};

const addPage = async (req, res) => {
  try {
    // images required property hai to agar nahi hoo to ham yahi se response bhej ke return kar derahe hai.
    if (!req.files || !req.files.images) {
      return res
        .status(400)
        .json({ success: false, message: "Page images are required." });
    }

    if (Array.isArray(req.files.images)) {
      // Temporary array banaya hai image urls ko store karne ke liye.
      const imagesURLs = [];

      // Yaga req.files.images ek array hai isi liye uspe loop chalarahe hai, har file hame turn by turn imageFile me mile gi.
      for (const imageFile of req.files.images) {
        // File ka unique name banaya hai.
        const fileName = Date.now() + "-" + imageFile.name;
        // Jaha file save karni hai uska path banaya hai.
        const filePath = path.join(__dirname, "../uploads", "page", fileName);
        // mv function ka use kar ke us file ko filePath pe save kiya hai.
        await imageFile.mv(filePath);
        // Image ka URL banaya hai.
        const imageURL = `http://localhost:5000/uploads/page/${fileName}`;
        // Image ke url ko array me add kiya hai.
        imagesURLs.push(imageURL);
      }

      // req.body.images me ye urls ka array store kiya hai.
      req.body.images = imagesURLs;
    } else {
      const imagesURLs = [];
      // Yaha req.files.images me hi file ka object hai. Yaha loop chalane ki jarurat nahi hai.
      const fileName = Date.now() + "-" + req.files.images.name;
      const filePath = path.join(__dirname, "../uploads", "page", fileName);
      await req.files.images.mv(filePath);

      const imageURL = `http://localhost:5000/uploads/page/${fileName}`;

      imagesURLs.push(imageURL);

      req.body.images = imagesURLs;
    }

    // Yaha ham page ko db me add kar rahe hai create function ka use kar ke.
    const page = await Page.create(req.body);

    // Ye ham success response bhej rahe hai.
    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePage = async (req, res) => {
  try {
    // req.params me se ham id nikal ke id naam ke variable me store kar rahe hai.
    const { id } = req.params;

    // Us id pe se page find kar rahe hai.
    const page = await Page.findById(id);

    // Agar wo page nahi milta hai to ham ye response bhej ke function se bahar aajarahe hai.
    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "No such page found." });
    }

    // Agar usne sirf image upload ki hai to us case me req.body undefined aaye ga isiliye ham req.body ko empty object se initialize kar rahe hai.
    if (!req.body) {
      req.body = {};
    }

    // Agar usne purani sari images delete kardi hoon to us case me req.body.images undefined aaye ga isiliye ham req.body.images ko empty array se initialize kar rahe hai
    if (!req.body.image) {
      req.body.images = [];
    }

    if (Array.isArray(req.files.images)) {
      // Agar use ne ek jada nayi images upload ki hai to req.files.images ek array aaye ga.

      // Temporary array banaya hai image urls ko store karne ke liye.
      const imagesURLs = [];

      // Yaga req.files.images ek array hai isi liye uspe loop chalarahe hai, har file hame turn by turn imageFile me mile gi.
      for (const imageFile of req.files.images) {
        // File ka unique name banaya hai.
        const fileName = Date.now() + "-" + imageFile.name;
        // Jaha file save karni hai uska path banaya hai.
        const filePath = path.join(__dirname, "../uploads", "page", fileName);
        // mv function ka use kar ke us file ko filePath pe save kiya hai.
        await imageFile.mv(filePath);
        // Image ka URL banaya hai.
        const imageURL = `http://localhost:5000/uploads/page/${fileName}`;
        // Image ke url ko array me add kiya hai.
        imagesURLs.push(imageURL);
      }

      // req.body.images me ye urls ka array store kiya hai purane images ko rakhte hue.
      req.body.images = [...req.body.images, ...imagesURLs];
    } else {
      // Agar use ne ek hi image upload ki hai to req.files.images ek file ka object aaye ga.

      const imagesURLs = [];
      // Yaha req.files.images me hi file ka object hai. Yaha loop chalane ki jarurat nahi hai.
      const fileName = Date.now() + "-" + req.files.images.name;
      const filePath = path.join(__dirname, "../uploads", "page", fileName);
      await req.files.images.mv(filePath);

      const imageURL = `http://localhost:5000/uploads/page/${fileName}`;

      imagesURLs.push(imageURL);

      // req.body.images me ye urls ka array store kiya hai purane images ko rakhte hue.
      req.body.images = [...req.body.images, ...imagesURLs];
    }

    // Jo images usne update karte waqt delete kiye hai wo ham yaha delete kar rahe hai.

    // Jis folder me se hame file delete karna hai uska path.
    const folderPath = path.join(__dirname, "../uploads", "page");

    // Us folder me rakhe files ke naam ka array.
    const filesInFolder = await fs.readdir(folderPath);

    for (const imageURL of page.images) {
      // Agar db me image ka url hai aur req.body.images me nahi hai to ham us image ko delete kar rahe hai.
      if (!req.body.images(imageURL)) {
        // Yaha ham imageURL me se file ka naam nikal rahe hai.
        const fileName = path.basename(imageURL);
        // Jis file ko delete karna hai uska path.
        const filePath = path.join(__dirname, "../uploads", "page", fileName);

        // Yaha ham check kar rahe hai ke jo file hame delete karni hai wo folder me hai ya nahi.
        if (filesInFolder.includes(fileName)) {
          // Yaha ham file ko delete kar rahe hai.
          await fs.unlink(filePath);
        }
      }
    }

    const updatedPage = await Page.findByIdAndUpdate(id, req.body, {
      new: true
    });

    res.status(200).json({ success: true, data: updatedPage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePage = async (req, res) => {
  try {
    // req.params me se ham id nikal ke id naam ke variable me store kar rahe hai.
    const { id } = req.params;

    // Us id pe se page find kar rahe hai.
    const page = await Page.findById(id);

    // Agar wo page nahi milta hai to ham ye response bhej ke function se bahar aajarahe hai.
    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "No such page found." });
    }

    // Jis folder me se hame file delete karna hai uska path.
    const folderPath = path.join(__dirname, "../uploads", "page");

    // Us folder me rakhe files ke naam ka array.
    const filesInFolder = await fs.readdir(folderPath);

    for (const imageURL of page.images) {
      // Yaha ham imageURL me se file ka naam nikal rahe hai.
      const fileName = path.basename(imageURL);
      // Jis file ko delete karna hai uska path.
      const filePath = path.join(__dirname, "../uploads", "page", fileName);

      // Yaha ham check kar rahe hai ke jo file hame delete karni hai wo folder me hai ya nahi.
      if (filesInFolder.includes(fileName)) {
        // Yaha ham file ko delete kar rahe hai.
        await fs.unlink(filePath);
      }
    }

    // Yaha ham db me se us page ko delete kar rahe hai.
    await Page.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Page deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllPages, getPageById, addPage, updatePage, deletePage };
