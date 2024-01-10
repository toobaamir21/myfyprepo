const express = require('express')
const { createCart, fetchCart, updateCart, deleteCart } = require('../controller/cartController')
const router = express.Router()

router.route("/getcart").get(fetchCart);
router.route("/createcart").post(createCart);
router.route("/updatecart/:id").patch(updateCart);
router.route("/deletecart/:id").delete(deleteCart);


module.exports = router;