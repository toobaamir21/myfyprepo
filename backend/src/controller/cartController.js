const Cart = require("../model/Cart")


exports.createCart = async (req,res)=>{
    const cart = new Cart(req.body)
    try {
        const doc = await cart.save()
        const result = await doc.populate('product')
        res.status(200).json(result)
    } catch (error) {
         res.status(400).json(error.message);
    }
}

exports.fetchCart = async (req, res) => {
  const {user}=req.query
  try {
     const doc = await Cart.find({user}).populate("product");
     res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error.message)
  }  
};

exports.updateCart = async (req, res) => {
    const {id}=req.params
  try {
    const doc = await Cart.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      {new: true}
    );
     const result = await doc.populate("product");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.deleteCart = async (req, res) => {
     const { id } = req.params;
  try {
    const doc = await Cart.findByIdAndDelete({_id:id});
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error.message);
  }
};


