import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-premium-bg text-premium-text">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold text-premium-brand">1Fi Stores</h1>
            <nav className="flex gap-6 text-sm font-medium">
              <a href="#" className="hover:text-premium-accent transition-colors">Products</a>
              <a href="#" className="hover:text-premium-accent transition-colors">EMI Plans</a>
              <a href="#" className="hover:text-premium-accent transition-colors">How it Works</a>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<Navigate to="/products/iphone-17-pro" replace />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
