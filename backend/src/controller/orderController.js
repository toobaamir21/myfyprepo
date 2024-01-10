const Order = require("../model/Order");

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const doc = await order.save();
   // const result = await doc.populate("product");
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.fetchOrder = async (req, res) => {
  const { user } = req.query;
  try {
    const doc = await Order.find({ user })
    //.populate("product");
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Order.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    const result = await doc.populate("product");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Order.findByIdAndDelete({ _id: id });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
