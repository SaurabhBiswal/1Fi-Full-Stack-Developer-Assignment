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
        category: 'Smartphone',
        basePrice: 127400,
        mrp: 134900
    },
    {
        name: 'Samsung S24 Ultra',
        slug: 'samsung-s24-ultra',
        brand: 'Samsung',
        description: 'AI-powered smartphone with a 200MP camera and integrated S Pen.',
        category: 'Smartphone',
        basePrice: 124900,
        mrp: 132900
    },
    {
        name: 'Pixel 9 Pro',
        slug: 'pixel-9-pro',
        brand: 'Google',
        description: 'The most powerful Pixel yet, with a sleek design and pro-level cameras.',
        category: 'Smartphone',
        basePrice: 109900,
        mrp: 119900
    }
];

const generateEMIPlans = (price) => {
    const tenures = [3, 6, 12, 24, 36, 48, 60];
    return tenures.map(tenure => {
        let interestRate = tenure <= 24 ? 0 : 10.5;
        // Calculation: (Principal + Total Interest) / Tenure
        // For 0% interest: price / tenure
        // For 10.5% interest: (price * (1 + (0.105 * tenure/12))) / tenure (simple interest approximation)
        let monthlyAmount;
        if (interestRate === 0) {
            monthlyAmount = price / tenure;
        } else {
            const annualRate = 0.105;
            const totalAmount = price * (1 + (annualRate * (tenure / 12)));
            monthlyAmount = totalAmount / tenure;
        }

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
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error('ERROR: MONGODB_URI not found in .env');
            process.exit(1);
        }
        await mongoose.connect(uri);
        console.log('Connected to MongoDB for seeding...');

        await Product.deleteMany({});
        await Variant.deleteMany({});

        for (const p of products) {
            const { basePrice, mrp, ...productData } = p;
            const product = await Product.create(productData);
            console.log(`Created product: ${product.name}`);

            const variants = [
                {
                    productId: product._id,
                    name: `${product.name} (128GB, Silver)`,
                    storage: '128GB',
                    color: 'Silver',
                    mrp: mrp,
                    price: basePrice,
                    images: ['https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=800'],
                    emiPlans: generateEMIPlans(basePrice)
                },
                {
                    productId: product._id,
                    name: `${product.name} (256GB, Titanium)`,
                    storage: '256GB',
                    color: 'Black',
                    mrp: mrp + 10000,
                    price: basePrice + 10000,
                    images: ['https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=800'],
                    emiPlans: generateEMIPlans(basePrice + 10000)
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
