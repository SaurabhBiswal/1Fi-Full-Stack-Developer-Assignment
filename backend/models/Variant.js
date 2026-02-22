const mongoose = require('mongoose');

const emiPlanSchema = new mongoose.Schema({
    tenure: { type: Number, required: true }, 
    monthlyAmount: { type: Number, required: true },
    interestRate: { type: Number, default: 0 }, 
    cashback: { type: Number, default: 0 },
    description: { type: String, default: 'Mutual Fund Backed' },
});

const variantSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    storage: { type: String, required: true },
    color: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    emiPlans: [emiPlanSchema],
}, { timestamps: true });

module.exports = mongoose.model('Variant', variantSchema);
