"use client";

import { useState, useEffect } from "react";
import { Save, Activity, Flame, Moon, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type FitnessData = {
    weight: string;
    steps: string;
    calories: string;
    sleep: string;
    date: string;
};

export function TrackerForm() {
    const [data, setData] = useState<FitnessData>({
        weight: "",
        steps: "",
        calories: "",
        sleep: "",
        date: new Date().toISOString().split('T')[0],
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Load today's data if exists
        const today = new Date().toISOString().split('T')[0];
        const stored = localStorage.getItem(`d-tracker-fitness-${today}`);
        if (stored) {
            setData(JSON.parse(stored));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
        setSaved(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(`d-tracker-fitness-${today}`, JSON.stringify({ ...data, date: today }));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const inputs = [
        { name: "weight", label: "Body Weight", unit: "kg", icon: Scale, placeholder: "75.5" },
        { name: "steps", label: "Step Count", unit: "steps", icon: Activity, placeholder: "10000" },
        { name: "calories", label: "Calories Burned", unit: "kcal", icon: Flame, placeholder: "500" },
        { name: "sleep", label: "Sleep Duration", unit: "hrs", icon: Moon, placeholder: "7.5" },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
                {inputs.map((input, index) => {
                    const Icon = input.icon;
                    return (
                        <motion.div
                            key={input.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-secondary transition-colors">
                                <Icon className="w-5 h-5" />
                            </div>
                            <input
                                type="number"
                                name={input.name}
                                value={data[input.name as keyof FitnessData]}
                                onChange={handleChange}
                                placeholder={input.placeholder}
                                step="0.1"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-lg focus:outline-none focus:border-secondary focus:bg-white/10 focus:ring-1 focus:ring-secondary transition-all placeholder:text-muted-foreground/50"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                {input.unit}
                            </div>
                            <label className="absolute -top-2 left-4 px-2 bg-[#050505] text-[10px] font-bold text-muted-foreground uppercase tracking-wider group-focus-within:text-secondary transition-colors">
                                {input.label}
                            </label>
                        </motion.div>
                    );
                })}
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={cn(
                    "w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg",
                    saved
                        ? "bg-green-500 text-white shadow-green-500/25"
                        : "bg-secondary text-black hover:bg-secondary/90 shadow-secondary/25"
                )}
            >
                <Save className="w-5 h-5" />
                {saved ? "Saved Successfully!" : "Save Daily Entry"}
            </motion.button>
        </form>
    );
}
