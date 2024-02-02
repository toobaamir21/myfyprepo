const express = require("express");
const {
  createProduct,
  getProducts,
  deleteProducts,
  updateProducts,
  getProductsByArtist,
  
} = require("../controller/prodcntrl");
const router = express.Router();

router.get("/", getProducts);
router.get("/bysellar", getProductsByArtist);
router.post("/createprod", createProduct);
router.delete("/:id", deleteProducts);
router.put("/:id", updateProducts);


module.exports = router;
