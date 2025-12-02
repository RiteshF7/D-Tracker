"use client";

import { useState, useEffect } from "react";
import { Save, Activity, Flame, Moon, Scale, Plus, Minus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type FitnessData = {
    weight: number;
    steps: number;
    calories: number;
    sleep: number;
    date: string;
};

export function TrackerForm() {
    const [data, setData] = useState<FitnessData>({
        weight: 75.0,
        steps: 8000,
        calories: 2000,
        sleep: 7.0,
        date: new Date().toISOString().split('T')[0],
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const stored = localStorage.getItem(`d-tracker-fitness-${today}`);
        if (stored) {
            setData(JSON.parse(stored));
        }
    }, []);

    const updateData = (key: keyof FitnessData, value: number) => {
        setData(prev => ({ ...prev, [key]: value }));
        setSaved(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const today = new Date().toISOString().split('T')[0];

        // Save daily snapshot
        localStorage.setItem(`d-tracker-fitness-${today}`, JSON.stringify({ ...data, date: today }));

        // Update history
        const history = JSON.parse(localStorage.getItem("d-tracker-fitness-history") || "[]");
        const existingIndex = history.findIndex((h: any) => h.date === today);

        if (existingIndex >= 0) {
            history[existingIndex] = { ...data, date: today };
        } else {
            history.push({ ...data, date: today });
        }

        localStorage.setItem("d-tracker-fitness-history", JSON.stringify(history));

        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const cards = [
        {
            id: "weight",
            label: "Body Weight",
            unit: "kg",
            icon: Scale,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            border: "group-hover:border-pink-500/50",
            control: "slider",
            min: 40,
            max: 150,
            step: 0.1
        },
        {
            id: "sleep",
            label: "Sleep Duration",
            unit: "hrs",
            icon: Moon,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            border: "group-hover:border-indigo-500/50",
            control: "slider",
            min: 0,
            max: 12,
            step: 0.5
        },
        {
            id: "steps",
            label: "Daily Steps",
            unit: "steps",
            icon: Activity,
            color: "text-cyan-500",
            bg: "bg-cyan-500/10",
            border: "group-hover:border-cyan-500/50",
            control: "stepper",
            step: 500
        },
        {
            id: "calories",
            label: "Calories Burned",
            unit: "kcal",
            icon: Flame,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            border: "group-hover:border-orange-500/50",
            control: "stepper",
            step: 50
        }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards.map((card, index) => {
                    const Icon = card.icon;
                    const value = data[card.id as keyof FitnessData] as number;

                    return (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "glass-card p-6 rounded-3xl border border-white/5 transition-all duration-300 group",
                                card.border
                            )}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2.5 rounded-xl", card.bg, card.color)}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold text-lg">{card.label}</span>
                                </div>
                                <div className="text-2xl font-black font-mono">
                                    {value}
                                    <span className="text-sm text-muted-foreground ml-1 font-sans font-normal">{card.unit}</span>
                                </div>
                            </div>

                            {card.control === "slider" ? (
                                <div className="space-y-4">
                                    <input
                                        type="range"
                                        min={card.min}
                                        max={card.max}
                                        step={card.step}
                                        value={value}
                                        onChange={(e) => updateData(card.id as keyof FitnessData, parseFloat(e.target.value))}
                                        className={cn(
                                            "w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-current",
                                            card.color
                                        )}
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground font-bold uppercase tracking-wider">
                                        <span>{card.min}</span>
                                        <span>{card.max}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between gap-4">
                                    <button
                                        type="button"
                                        onClick={() => updateData(card.id as keyof FitnessData, Math.max(0, value - (card.step || 1)))}
                                        className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors active:scale-95"
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className={cn("h-full rounded-full", card.bg.replace("/10", ""))}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((value / (card.id === 'steps' ? 15000 : 4000)) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => updateData(card.id as keyof FitnessData, value + (card.step || 1))}
                                        className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors active:scale-95 text-white shadow-lg",
                                            card.bg.replace("/10", ""),
                                            `shadow-${card.color.split('-')[1]}-500/20`
                                        )}
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={cn(
                    "w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl",
                    saved
                        ? "bg-green-500 text-white shadow-green-500/25"
                        : "bg-white text-black hover:bg-gray-100 shadow-white/10"
                )}
            >
                {saved ? (
                    <>
                        <Check className="w-6 h-6" />
                        Saved Successfully
                    </>
                ) : (
                    <>
                        <Save className="w-6 h-6" />
                        Save Daily Progress
                    </>
                )}
            </motion.button>
        </form>
    );
}
