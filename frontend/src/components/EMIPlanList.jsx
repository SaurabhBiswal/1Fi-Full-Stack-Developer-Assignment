import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMIPlanList = ({ plans, selectedPlan, onSelect }) => {
    return (
        <div className="space-y-3">
            <AnimatePresence mode="popLayout">
                {plans?.map((plan) => (
                    <motion.div
                        key={plan.tenure}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => onSelect(plan)}
                        className={`group cursor-pointer rounded-2xl p-5 border-2 transition-all flex items-center justify-between shadow-sm relative overflow-hidden ${selectedPlan?.tenure === plan.tenure
                                ? 'border-premium-accent bg-blue-50/50'
                                : 'border-white bg-white hover:border-gray-200'
                            }`}
                    >
                        {/* Selection highlight bar */}
                        {selectedPlan?.tenure === plan.tenure && (
                            <motion.div
                                layoutId="active-bg"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-premium-accent"
                            />
                        )}

                        <div className="flex items-center gap-4">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPlan?.tenure === plan.tenure ? 'border-premium-accent bg-premium-accent' : 'border-gray-300'
                                }`}>
                                {selectedPlan?.tenure === plan.tenure && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-premium-text">₹{plan.monthlyAmount.toLocaleString()}</span>
                                    <span className="text-premium-secondary font-medium">x {plan.tenure} months</span>
                                </div>
                                <p className="text-xs font-semibold text-green-600 mt-1">
                                    Additional cashback of ₹{plan.cashback.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${plan.interestRate === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {plan.interestRate === 0 ? '0% Interest' : `${plan.interestRate}% Interest`}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default EMIPlanList;
