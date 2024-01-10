//const client = require("../client");
const Product = require("../model/Product");

//...........................CREATEPRODUCT.........................
const createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//...........................GETPRODUCTS.........................
const getProducts = async (req, res) => {
  try {
    // const cacheValue = await client.get("prodlist");
    // if (cacheValue) {
    //   console.log(
    //     "this is a cacheValue..........................................................................................................................................................................................................................................................................................................................................",
    //     cacheValue
    //   );
    //   return res.json(JSON.parse(cacheValue));
    // }

    // let products = await Product.find({ deleted: { $ne: true } });
    let query = Product.find({ deleted: { $ne: true } });

    if (req.query.category) {
     
      query = query.find({ category: req.query.category.toString() });
      console.log("this is category", req.query.category);
    }
     if (req.query._sort && req.query._order) {
       query = query.sort({ [req.query._sort]: req.query._order });
     }
     const doc = await query.exec()
    // client.set("prodlist", JSON.stringify(doc));
    // client.expire("prodlist", 10);
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//.........................DELETEPRODUCTS.........................
const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const del_product = await Product.findOneAndDelete({ _id: id });
  res.status(200).json(del_product);
};

//.........................UPDATEPRODUCTS.........................
const updateProducts = async (req, res) => {
  const { id } = req.params;
  const up_product = await Product.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );
  res.status(200).json(up_product);
};
module.exports = { createProduct, getProducts, deleteProducts, updateProducts };
