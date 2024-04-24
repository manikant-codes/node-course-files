const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("All To-Dos");
// });

// router.get("/:id", (req, res) => {
//   res.send("To-Do with ID: " + req.params.id);
// });

// router.post("/", (req, res) => {
//   res.send("Added New Todo");
// });

// router.patch("/:id", (req, res) => {
//   res.send("Updated Todo with ID: " + req.params.id);
// });

// router.delete("/:id", (req, res) => {
//   res.send("Deleted Todo with ID: " + req.params.id);
// });

router
  .route("/")
  .get((req, res) => {
    res.send("All To-Dos");
  })
  .post((req, res) => {
    res.send("Added New Todo");
  });

router
  .route("/:id")
  .get((req, res) => {
    res.send("To-Do with ID: " + req.params.id);
  })
  .patch((req, res) => {
    res.send("Updated Todo with ID: " + req.params.id);
  })
  .delete((req, res) => {
    res.send("Deleted Todo with ID: " + req.params.id);
  });

module.exports = router;
