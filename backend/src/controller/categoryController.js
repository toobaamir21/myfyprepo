const Category = require("../model/Category");

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const doc = await category.save()
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.fetchCategory = async (req, res) => {

  try {
    const doc = await Category.find({})
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// exports.updateCategory = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const doc = await Category.findByIdAndUpdate(
//       { _id: id },
//       { ...req.body },
//       { new: true }
//     );
//     const result = await doc.populate("product");
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// };

// exports.deleteCategory = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const doc = await Category.findByIdAndDelete({ _id: id });
//     res.status(200).json(doc);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// };
