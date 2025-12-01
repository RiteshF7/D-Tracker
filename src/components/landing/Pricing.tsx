"use client";

import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Starter",
        price: "$0",
        features: ["Daily Tasks", "Basic Tracking", "7-day History"],
        color: "from-white to-white/50"
    },
    {
        name: "Pro",
        price: "$9",
        features: ["Unlimited History", "Advanced Reports", "Goal Setting", "Priority Support"],
        color: "from-[#a855f7] to-[#d946ef]",
        popular: true
    },
    {
        name: "Elite",
        price: "$19",
        features: ["AI Insights", "Coach Access", "Custom Metrics", "API Access"],
        color: "from-[#d946ef] to-[#ec4899]"
    }
];

export function Pricing() {
    return (
        <section className="py-24 px-4 relative">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
                    <p className="text-muted-foreground">Start for free, upgrade for power.</p>
                </motion.div>

                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                    "glass-card p-8 rounded-3xl border relative overflow-hidden transition-all duration-300",
                                    plan.popular
                                        ? "border-primary/50 shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] scale-105 z-10"
                                        : "border-white/10 hover:border-white/20 hover:scale-105"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-bl from-primary to-secondary text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-lg">
                                        MOST POPULAR
                                    </div>
                                )}
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className={cn("text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r", plan.color)}>
                                    {plan.price}<span className="text-lg text-muted-foreground font-normal">/mo</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <div className="p-1 rounded-full bg-primary/10">
                                                <Check className="w-3 h-3 text-primary" />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button className={cn(
                                    "w-full py-3 rounded-xl font-bold transition-all duration-300",
                                    plan.popular
                                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-primary/25"
                                        : "bg-white/5 hover:bg-white/10 border border-white/5"
                                )}>
                                    Choose {plan.name}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
