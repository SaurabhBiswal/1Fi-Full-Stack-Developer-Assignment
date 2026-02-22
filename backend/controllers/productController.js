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
        // Handle encoded characters and normalize spaces/case
        const slug = decodeURIComponent(req.params.slug)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-');

        console.log(`Searching for product with slug: ${slug}`);
        const product = await Product.findOne({ slug });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const variants = await Variant.find({ productId: product._id });
        res.json({ ...product._doc, variants });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
