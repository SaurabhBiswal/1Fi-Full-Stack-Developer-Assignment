import React from 'react';

const VariantSelector = ({ variants, selectedVariant, onSelect }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-premium-text">Select Variant</h3>
            <div className="grid grid-cols-2 gap-3">
                {variants?.map((v) => (
                    <button
                        key={v._id}
                        onClick={() => onSelect(v)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${selectedVariant?._id === v._id
                                ? 'border-premium-accent bg-blue-50/50'
                                : 'border-white bg-white hover:border-gray-200'
                            }`}
                    >
                        <p className="text-xs text-premium-secondary uppercase tracking-wider font-bold">{v.color}</p>
                        <p className="text-base font-bold text-premium-text">{v.storage}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default VariantSelector;
