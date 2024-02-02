const express = require("express");
const { fetchReview, createReview, updateReview, deleteReview, deleteAllReviews } = require("../controller/reviewController");
const router = express.Router();

router.route("/getreview").get(fetchReview);
router.route("/createreview").post(createReview);
router.route("/updatereview/:id").patch(updateReview);
router.route("/deletereview/:id").delete(deleteReview);
router.route("/deleteall").delete(deleteAllReviews);

module.exports = router;
