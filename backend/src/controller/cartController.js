const Cart = require("../model/Cart")


exports.createCart = async (req,res)=>{
    const cart = new Cart(req.body)
   // console.log("this is cart",cart);
    try {
        const doc = await cart.save()
        const result = await doc.populate('product')
       // console.log("this is result",result);
        res.status(200).json(result)
    } catch (error) {
     // console.log("this is error",error);
         res.status(400).json(error.message);
    }
}

exports.fetchCart = async (req, res) => {
  const {user}=req.query
  console.log("this is user",user);
  try {
     const doc = await Cart.find({user}).populate("product");
     res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error.message)
  }  
};

exports.updateCart = async (req, res) => {
    const {id}=req.params
    console.log("this is id",id);
  try {
    const doc = await Cart.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      {new: true}
    );
    console.log("this is doc",doc);
     const result = await doc.populate("product");
    res.status(200).json(result);
  } catch (error) {
        console.log("this is error", error.message);
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

exports.deleteAllCarts = async (req, res) => {
  try {
    const result = await Cart.deleteMany({});
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
