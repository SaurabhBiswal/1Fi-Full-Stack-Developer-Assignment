require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Variant = require('./models/Variant');

const products = [
    {
        name: 'iPhone 17 Pro',
        slug: 'iphone-17-pro',
        brand: 'Apple',
        description: 'The ultimate iPhone with a new titanium design and advanced camera system.',
        category: 'Smartphone'
    },
    {
        name: 'Samsung S24 Ultra',
        slug: 'samsung-s24-ultra',
        brand: 'Samsung',
        description: 'AI-powered smartphone with a 200MP camera and integrated S Pen.',
        category: 'Smartphone'
    },
    {
        name: 'Pixel 9 Pro',
        slug: 'pixel-9-pro',
        brand: 'Google',
        description: 'The most powerful Pixel yet, with a sleek design and pro-level cameras.',
        category: 'Smartphone'
    }
];

const generateEMIPlans = (price) => {
    const tenures = [3, 6, 12, 24, 36, 48, 60];
    return tenures.map(tenure => {
        let interestRate = tenure <= 24 ? 0 : 10.5;
        let monthlyAmount = (price / tenure) * (1 + (interestRate / 100)); 
        if (tenure === 3) monthlyAmount = 44967;
        if (tenure === 6) monthlyAmount = 22483;
        if (tenure === 12) monthlyAmount = 11242;
        if (tenure === 24) monthlyAmount = 5621;
        if (tenure === 36) monthlyAmount = 4297;
        if (tenure === 48) monthlyAmount = 3385;
        if (tenure === 60) monthlyAmount = 2842;

        return {
            tenure,
            monthlyAmount: Math.round(monthlyAmount),
            interestRate,
            cashback: 7500,
            description: 'Mutual Fund Backed'
        };
    });
};

const seedDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/1fi-assignment';
        await mongoose.connect(uri);
        console.log('Connected to MongoDB for seeding...');

        await Product.deleteMany({});
        await Variant.deleteMany({});

        for (const p of products) {
            const product = await Product.create(p);
            console.log(`Created product: ${product.name}`);

            const variants = [
                {
                    productId: product._id,
                    name: `${product.name} (128GB, Silver)`,
                    storage: '128GB',
                    color: 'Silver',
                    mrp: 134900,
                    price: 127400,
                    images: ['https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=800'],
                    emiPlans: generateEMIPlans(127400)
                },
                {
                    productId: product._id,
                    name: `${product.name} (256GB, Titanium)`,
                    storage: '256GB',
                    color: 'Titanium',
                    mrp: 144900,
                    price: 137400,
                    images: ['https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=800'],
                    emiPlans: generateEMIPlans(137400)
                }
            ];

            await Variant.create(variants);
            console.log(`Created ${variants.length} variants for ${product.name}`);
        }

        console.log('Seeding complete!');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();
