import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';

function App() {
  const products = [
    { name: 'iPhone 17 Pro', slug: 'iphone-17-pro' },
    { name: 'Samsung S24 Ultra', slug: 'samsung-s24-ultra' },
    { name: 'Pixel 9 Pro', slug: 'pixel-9-pro' }
  ];

  return (
    <Router>
      <div className="min-h-screen bg-premium-bg text-premium-text">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold text-premium-brand">1Fi Stores</h1>
            <nav className="flex gap-6 text-sm font-medium">
              {products.map(p => (
                <NavLink
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  className={({ isActive }) =>
                    `transition-colors ${isActive ? 'text-premium-accent' : 'hover:text-premium-accent text-premium-secondary'}`
                  }
                >
                  {p.name}
                </NavLink>
              ))}
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