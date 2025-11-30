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
        color: "from-[#00ff9d] to-[#00d2ff]",
        popular: true
    },
    {
        name: "Elite",
        price: "$19",
        features: ["AI Insights", "Coach Access", "Custom Metrics", "API Access"],
        color: "from-[#ff0055] to-[#ff5500]"
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
                    {/* Blur Overlay */}
                    <div className="absolute inset-0 z-20 backdrop-blur-sm bg-black/40 flex flex-col items-center justify-center rounded-3xl border border-white/10">
                        <Lock className="w-12 h-12 text-white mb-4" />
                        <h3 className="text-2xl font-bold">Coming Soon</h3>
                        <p className="text-muted-foreground">Memberships are currently invite-only.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50 pointer-events-none select-none filter blur-[2px]">
                        {plans.map((plan, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "glass-card p-8 rounded-3xl border relative overflow-hidden",
                                    plan.popular ? "border-primary/50" : "border-white/10"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                                        POPULAR
                                    </div>
                                )}
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className={cn("text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r", plan.color)}>
                                    {plan.price}<span className="text-lg text-muted-foreground font-normal">/mo</span>
                                </div>
                                <ul className="space-y-4">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Check className="w-4 h-4 text-primary" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <button className={cn(
                                    "w-full mt-8 py-3 rounded-xl font-bold transition-all",
                                    plan.popular ? "bg-primary text-black" : "bg-white/10 hover:bg-white/20"
                                )}>
                                    Choose {plan.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
