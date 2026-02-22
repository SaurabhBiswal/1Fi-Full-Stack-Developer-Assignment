import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, ShieldCheck, Zap, Info } from 'lucide-react';
import EMIPlanList from '../components/EMIPlanList';
import VariantSelector from '../components/VariantSelector';

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
                const res = await axios.get(`${API_BASE_URL}/api/products/${slug}`);
                setProduct(res.data);
                if (res.data.variants && res.data.variants.length > 0) {
                    setSelectedVariant(res.data.variants[0]);
                    if (res.data.variants[0].emiPlans && res.data.variants[0].emiPlans.length > 0) {
                        setSelectedPlan(res.data.variants[0].emiPlans[0]);
                    }
                }
                setLoading(false);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to load product details. Please ensure the backend is running.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    const handleVariantChange = (variant) => {
        setSelectedVariant(variant);
        if (variant.emiPlans && variant.emiPlans.length > 0) {
            setSelectedPlan(variant.emiPlans[0]);
        } else {
            setSelectedPlan(null);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                <div className="w-64 h-64 bg-gray-200 rounded-2xl mb-8"></div>
                <div className="w-48 h-8 bg-gray-200 rounded-lg mb-4"></div>
                <div className="w-32 h-6 bg-gray-200 rounded-lg"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-red-700 max-w-2xl mx-auto mt-10">
                <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
                <p>{error || 'Product not found.'}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Product Image Card */}
            <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100 flex flex-col items-center">
                    <span className="self-start text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full mb-6">NEW</span>
                    <h2 className="text-4xl font-bold text-premium-text text-center mb-2">{product.name}</h2>
                    <p className="text-lg text-premium-secondary mb-8">{selectedVariant?.storage}</p>

                    <div className="relative group">
                        <img
                            src={selectedVariant?.images[0]}
                            alt={product.name}
                            className="w-full max-w-sm transform group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-premium-secondary text-sm mb-4">Available in {product.variants?.length} finishes</p>
                        <div className="flex justify-center gap-3">
                            {product.variants?.map((v) => (
                                <button
                                    key={v._id}
                                    onClick={() => handleVariantChange(v)}
                                    className={`w-4 h-4 rounded-full border-2 transition-all ${selectedVariant?._id === v._id ? 'border-premium-accent ring-2 ring-premium-accent/20 scale-125' : 'border-transparent bg-gray-300'
                                        }`}
                                    style={{ backgroundColor: v.color.toLowerCase() }}
                                    title={v.color}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Confidence Badges */}
                <div className="bg-white/50 border border-white rounded-2xl p-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-sm text-premium-secondary">
                        <CheckCircle className="text-green-500 w-5 h-5" />
                        <span>2 Days Service Replacement</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-premium-secondary">
                        <ShieldCheck className="text-blue-500 w-5 h-5" />
                        <span>Secure Transaction</span>
                    </div>
                </div>
            </div>

            {/* Right Column: Details & EMI Plans */}
            <div className="space-y-8">
                <div>
                    <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-4xl font-bold text-premium-text">₹{selectedVariant?.price.toLocaleString()}</span>
                        <span className="text-xl text-premium-secondary line-through">₹{selectedVariant?.mrp.toLocaleString()}</span>
                    </div>
                    <p className="text-premium-secondary font-medium">EMI plans backed by mutual funds</p>
                </div>

                <VariantSelector
                    variants={product.variants}
                    selectedVariant={selectedVariant}
                    onSelect={handleVariantChange}
                />

                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-premium-text flex items-center gap-2">
                        Choose EMI Tenure
                        <Info className="w-4 h-4 text-premium-secondary" />
                    </h3>
                    <EMIPlanList
                        plans={selectedVariant?.emiPlans}
                        selectedPlan={selectedPlan}
                        onSelect={setSelectedPlan}
                    />
                </div>

                <div className="pt-4">
                    <button
                        disabled={!selectedPlan}
                        onClick={() => alert(`Proceeding with ${selectedPlan.tenure} months EMI plan for ${selectedVariant.name}. Success!`)}
                        className="w-full py-4 bg-premium-brand text-white rounded-xl font-bold text-lg hover:bg-black/90 transition shadow-xl shadow-black/10 flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        Buy on {selectedPlan?.tenure || ''} months EMI
                        <Zap className="w-5 h-5 group-hover:fill-yellow-400 group-hover:text-yellow-400 transition-colors" />
                    </button>
                    <p className="text-center text-xs text-premium-secondary mt-4">
                        *Total extra payment per month/order value. Sold by: 1Fi Authorized Seller
                    </p>
                </div>

                {/* Product Details Section */}
                <div className="pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-bold mb-4">Product Details</h3>
                    <ul className="space-y-3 text-sm text-premium-secondary">
                        <li className="flex justify-between"><span>Storage</span> <span className="text-premium-text font-medium">{selectedVariant?.storage}</span></li>
                        <li className="flex justify-between"><span>Color</span> <span className="text-premium-text font-medium">{selectedVariant?.color}</span></li>
                        <li className="flex justify-between"><span>Condition</span> <span className="text-premium-text font-medium">Brand New</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
