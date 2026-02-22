const Product = require('../models/Product');
const Variant = require('../models/Variant');


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProductBySlug = async (req, res) => {
    try {
        const slug = req.params.slug.toLowerCase().replace(/\s+/g, '-');
        const product = await Product.findOne({ slug });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const variants = await Variant.find({ productId: product._id });
        res.json({ ...product._doc, variants });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
