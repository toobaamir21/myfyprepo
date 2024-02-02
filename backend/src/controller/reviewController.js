const Review = require("../model/Review");

exports.createReview = async (req, res) => {
  const review = new Review(req.body);
  // console.log("this is cart",cart);
  try {
    const doc = await review.save();
      const result = await Review.findById(doc._id)
        .populate({ path: "product" })
        .populate({ path: "user", select: "-password" }); 
 
    // console.log("this is result",result);
    res.status(200).json(result);
  } catch (error) {
    // console.log("this is error",error);
    res.status(400).json(error.message);
  }
};

exports.fetchReview = async (req, res) => {
  const { product } = req.query;
  
  try {
    const doc = await Review.find({ product })
      .populate({ path: "product" })
      .populate({ path: "user", select: "-password" });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  console.log("this is id", id);
  try {
    const doc = await Review.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    console.log("this is doc", doc);

    // Use Review.findById to get a Mongoose document and then populate
    const result = await Review.findById(doc._id)
      .populate("product")
      .populate("user");

    res.status(200).json(result);
  } catch (error) {
    console.log("this is error", error.message);
    res.status(400).json(error.message);
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  console.log("this is user id",id);
  try {
    const doc = await Review.findByIdAndDelete({_id:id});
      console.log("this is doc", doc);
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.deleteAllReviews = async (req, res) => {
  try {
    const result = await Review.deleteMany({});
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
