"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Droplets } from "lucide-react";

export function WaterTracker() {
    const [glasses, setGlasses] = useState(0);
    const goal = 8;

    useEffect(() => {
        const saved = localStorage.getItem("d-tracker-water");
        if (saved) {
            const { date, count } = JSON.parse(saved);
            const today = new Date().toDateString();
            if (date === today) {
                setGlasses(count);
            } else {
                setGlasses(0);
            }
        }
    }, []);

    useEffect(() => {
        const today = new Date().toDateString();
        localStorage.setItem("d-tracker-water", JSON.stringify({ date: today, count: glasses }));
    }, [glasses]);

    const progress = Math.min((glasses / goal) * 100, 100);

    return (
        <div className="space-y-8">
            <div className="glass-card p-8 rounded-3xl text-center space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />

                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">Hydration Tracker</h2>
                    <p className="text-muted-foreground">Daily Goal: {goal} Glasses</p>
                </div>

                <div className="relative w-48 h-48 mx-auto">
                    {/* Background Circle */}
                    <div className="absolute inset-0 rounded-full border-4 border-white/5" />

                    {/* Progress Circle */}
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-blue-500/20"
                        />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-blue-500"
                            strokeDasharray="283"
                            strokeDashoffset={283 - (283 * progress) / 100}
                            initial={{ strokeDashoffset: 283 }}
                            animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </svg>

                    {/* Center Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Droplets className="w-8 h-8 text-blue-400 mb-1" />
                        <span className="text-4xl font-black">{glasses}</span>
                        <span className="text-xs text-muted-foreground">/ {goal}</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-6">
                    <button
                        onClick={() => setGlasses(Math.max(0, glasses - 1))}
                        className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                        <Minus className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => setGlasses(glasses + 1)}
                        className="w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/30 flex items-center justify-center transition-all active:scale-95"
                    >
                        <Plus className="w-8 h-8 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
