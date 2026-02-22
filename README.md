# 1Fi Full Stack Developer Assignment - EMI Plans with Mutual Funds

A premium full-stack web application that displays products with dynamic EMI plans backed by mutual funds. Built with the MERN stack and a focus on visual excellence.

## 🚀 Features
- **Dynamic Product Page**: Fetches live data from a Node.js/Express backend.
- **Variant Switching**: Seamlessly switch between storage and color variants with instant price updates.
- **EMI Plan Selection**: Interactive choice of tenure with integrated cashback information.
- **Premium UI**: Clean, responsive design inspired by high-end consumer tech stores.
- **Micro-interactions**: Smooth transitions and animations using Framer Motion.

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion, Lucide React, Axios.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB (PostgreSQL compatible schema).

## 📄 Database Schema

### Product
- `name`: String
- `slug`: String (unique)
- `brand`: String
- `description`: String

### Variant
- `productId`: Ref Product
- `name`: String
- `mrp`: Number
- `price`: Number
- `emiPlans`: Array of Objects

### EMI Plan (Nested in Variant)
- `tenure`: Number (months)
- `monthlyAmount`: Number
- `interestRate`: Number
- `cashback`: Number

## ⚡ API Endpoints

### Products
- `GET /api/products`: Fetch all products.
- `GET /api/products/:slug`: Fetch detailed information for a specific product including all variants.

### Example Response (`/api/products/iphone-17-pro`)
```json
{
  "name": "iPhone 17 Pro",
  "slug": "iphone-17-pro",
  "variants": [
    {
      "name": "iPhone 17 Pro (256GB, Titanium)",
      "price": 127400,
      "emiPlans": [
        { "tenure": 6, "monthlyAmount": 22483, "interestRate": 0, "cashback": 7500 }
      ]
    }
  ]
}
```

## ⚙️ Setup Instructions

### 1. Clone & Install
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Database Setup
Ensure MongoDB is running locally or set your `MONGODB_URI` in `backend/.env`.
```bash
# In backend folder
node seed.js
```

### 3. Run Application
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev
```

## 🎥 Demo Video
[]
