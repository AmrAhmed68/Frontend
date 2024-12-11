const Product = require('../models/products');
const Categories = require('../models/categories')

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  const { subCategory } = req.query;

  try {
    let query = {};
    if (subCategory === 'mostPopular') {
      query = { quantity: { $gt: 0 } }; 
    } else if (subCategory === 'leastPopular') {
      query = { quantity: { $gt: 0 } }; 
    } else if (subCategory === 'bestOffers') {
      query = {}; 
    }

    const mostPopular = subCategory === 'mostPopular' ? await Product.find(query).sort({ quantity: -1 }).limit(5) : [];
    const leastPopular = subCategory === 'leastPopular' ? await Product.find(query).sort({ quantity: 1 }).limit(5) : [];
    const bestOffers = subCategory === 'bestOffers' ? await Product.find(query).sort({ price: 1 }).limit(5) : [];

    res.status(200).json({
      mostPopular,
      leastPopular,
      bestOffers
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.card = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; 

  try {
    const existingItem = await Cart.findOne({ userId, productId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      const newItem = new Cart({ userId, productId, quantity });
      await newItem.save();
    }

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const newCategory = new Categories(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
