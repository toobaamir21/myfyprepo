const express = require("express");
const {
  createCategory,
  fetchCategory,
//   updateCategory,
//   deleteCategory,
} = require("../controller/categoryController");
const router = express.Router();

router.route("/getcategory").get(fetchCategory);
router.route("/createcategory").post(createCategory);
// router.route("/updatecategory/:id").patch(updateCategory);
// router.route("/deletecategory/:id").delete(deleteCategory);

module.exports = router;
