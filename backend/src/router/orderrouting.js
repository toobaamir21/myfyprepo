const express = require("express");
const {
  createOrder,
  fetchOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const router = express.Router();

router.route("/getorder").get(fetchOrder);
router.route("/createorder").post(createOrder);
router.route("/updateorder/:id").patch(updateOrder);
router.route("/deleteorder/:id").delete(deleteOrder);

module.exports = router;
