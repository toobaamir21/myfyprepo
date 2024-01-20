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

//...........................GETPRODUCTS CATEGORY OR PRODUCTNAME WISE.........................
const getProducts = async (req, res) => {
  try {
    // const cacheValue = await client.get("prodlist");
    // if (cacheValue) {
    //   console.log("this is a cacheValue/..", cacheValue);
    //   return res.json(JSON.parse(cacheValue));
    // }

    let query = Product.find({ deleted: { $ne: true } });

    if (req.query.category) {
      query = query.find({ category: req.query.category.toString() });
      console.log("this is category", req.query.category);
    }

   if (req.query.productName) {
     const searchTerms = req.query.productName
       .toLowerCase() // Convert the search string to lowercase
       .split(" ")
       .filter((term) => term.trim() !== "");
      console.log("this is the searchTerms",searchTerms);
     const regexTerms = searchTerms.map((term) => new RegExp(term, "i"));

     // Use $all to match documents containing all specified terms
     query = query.find({
       prodName: { $all: regexTerms.map((term) => new RegExp(term, "i")) },
     });
   }
    
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }

    const doc = await query.exec();
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
module.exports = { createProduct, getProducts, deleteProducts, updateProducts};
