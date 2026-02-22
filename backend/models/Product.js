const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    description: { type: String },
    category: { type: String, default: 'Smartphone' },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
