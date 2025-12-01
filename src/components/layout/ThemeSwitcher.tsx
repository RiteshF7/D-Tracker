"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
    { id: "obsidian", name: "Obsidian", color: "bg-slate-900", accent: "bg-blue-500" },
    { id: "ocean", name: "Ocean", color: "bg-sky-950", accent: "bg-cyan-500" },
    { id: "sapphire", name: "Sapphire", color: "bg-slate-900", accent: "bg-blue-600" },
    { id: "crimson", name: "Crimson", color: "bg-red-950", accent: "bg-red-500" },
];

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="glass-card p-6 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-primary/10">
                    <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-bold">Appearance</h3>
                    <p className="text-sm text-muted-foreground">Customize your experience</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {themes.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id as any)}
                        className={cn(
                            "relative p-4 rounded-2xl border transition-all duration-300 group overflow-hidden",
                            theme === t.id
                                ? "border-primary bg-primary/5 ring-1 ring-primary/50"
                                : "border-white/5 hover:border-white/10 hover:bg-white/5"
                        )}
                    >
                        <div className="flex items-center gap-3 mb-3 relative z-10">
                            <div className={cn("w-8 h-8 rounded-full border border-white/10 shadow-lg flex items-center justify-center", t.color)}>
                                <div className={cn("w-3 h-3 rounded-full", t.accent)} />
                            </div>
                            <span className={cn("font-medium", theme === t.id ? "text-primary" : "text-muted-foreground")}>
                                {t.name}
                            </span>
                        </div>

                        {theme === t.id && (
                            <motion.div
                                layoutId="active-theme"
                                className="absolute top-3 right-3 text-primary"
                            >
                                <Check className="w-4 h-4" />
                            </motion.div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
