const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("All Users List");
});

router.post("/", (req, res) => {
  res.send("New User Created");
});

router.get("/:id", (req, res) => {
  console.log(req.user);
  res.send(`User ${req.params.id} Details`);
});

// OR

// router
//   .route("/")
//   .get((req, res) => {
//     res.send("All Users List");
//   })
//   .post((req, res) => {
//     res.send("New User Created");
//   });

// router.get("/new", (req, res) => {
//   res.send(`User New`);
// }); // Won't Work!

router.patch("/:id", (req, res) => {
  res.send(`User ${req.params.id} Updated`);
});

router.delete("/:id", (req, res) => {
  res.send(`User ${req.params.id} Deleted`);
});

const users = [{ name: "Jethalal" }, { name: "Bhide" }];

router.param("id", (req, res, next, id) => {
  console.log(id);
  req.user = users[id];
  next();
});
