"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, subDays, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { motion } from "framer-motion";

type ViewMode = "weekly" | "monthly" | "quarterly";

export function GlowMonitor() {
    const [viewMode, setViewMode] = useState<ViewMode>("weekly");
    const [currentDate, setCurrentDate] = useState(new Date());

    // Mock data generator for visualization
    const getGlowIntensity = (date: Date) => {
        // Simple deterministic pseudo-random based on date
        const x = Math.sin(date.getTime()) * 10000;
        return x - Math.floor(x);
    };

    const handlePrev = () => {
        if (viewMode === "weekly") setCurrentDate(subDays(currentDate, 30));
    };

    const handleNext = () => {
        if (viewMode === "weekly") setCurrentDate(addDays(currentDate, 30));
    };

    const end = currentDate;
    const start = subDays(end, 29); // Last 30 days
    const days = eachDayOfInterval({ start, end });

    const [taskStats, setTaskStats] = useState<Record<string, number>>({});

    useEffect(() => {
        // Generate consistent stats for the session
        const stats: Record<string, number> = {};
        ["Morning Jog", "Drink Water", "No Sugar", "Read", "Sleep"].forEach(task => {
            stats[task] = Math.floor(Math.random() * (98 - 40) + 40); // Random between 40% and 98%
        });
        setTaskStats(stats);
    }, []);

    const [selectedColor, setSelectedColor] = useState<string>("purple");

    const THEMES: Record<string, { hex: string; rgb: string }> = {
        green: { hex: "#00ff9d", rgb: "0, 255, 157" },
        blue: { hex: "#00d2ff", rgb: "0, 210, 255" },
        purple: { hex: "#a855f7", rgb: "168, 85, 247" },
        pink: { hex: "#ff0055", rgb: "255, 0, 85" },
        amber: { hex: "#eab308", rgb: "234, 179, 8" },
    };

    useEffect(() => {
        const savedColor = localStorage.getItem("d-tracker-theme-color");
        if (savedColor && THEMES[savedColor]) {
            setSelectedColor(savedColor);
        }
    }, []);

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        localStorage.setItem("d-tracker-theme-color", color);
    };

    const currentTheme = THEMES[selectedColor];

    return (
        <div className="space-y-8">
            {/* Controls */}
            <div className="flex flex-col gap-4 glass-card p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                    <button onClick={handlePrev} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft /></button>
                    <div className="text-center">
                        <div className="font-bold text-lg" style={{ color: currentTheme.hex }}>{format(start, "MMM d")} - {format(end, "MMM d")}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{viewMode} View</div>
                    </div>
                    <button onClick={handleNext} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronRight /></button>
                </div>

                <div className="flex items-center justify-between gap-4">
                    {/* View Mode Selector */}
                    <div className="flex gap-2 bg-black/20 p-1 rounded-xl flex-1">
                        {(["weekly", "monthly", "quarterly"] as ViewMode[]).map((m) => (
                            <button
                                key={m}
                                onClick={() => setViewMode(m)}
                                className={cn(
                                    "flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-300",
                                    viewMode === m ? "bg-white/10 text-white shadow-lg" : "text-muted-foreground hover:text-white"
                                )}
                            >
                                {m}
                            </button>
                        ))}
                    </div>

                    {/* Color Selector */}
                    <div className="flex gap-2 bg-black/20 p-1.5 rounded-xl">
                        {Object.keys(THEMES).map((color) => (
                            <button
                                key={color}
                                onClick={() => handleColorChange(color)}
                                className={cn(
                                    "w-6 h-6 rounded-full transition-all duration-300 border-2",
                                    selectedColor === color ? "border-white scale-110" : "border-transparent hover:scale-110"
                                )}
                                style={{ backgroundColor: THEMES[color].hex }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Glow Block */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider pl-2">Consistency Heatmap</h3>
                <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                    {days.map((day, i) => {
                        const intensity = getGlowIntensity(day);
                        return (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                transition={{
                                    delay: i * 0.03,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                                whileHover={{ scale: 1.1, zIndex: 10 }}
                                className="flex flex-col items-center gap-1 group relative"
                            >
                                <motion.div
                                    className="w-full aspect-square rounded-lg relative overflow-hidden"
                                    style={{
                                        backgroundColor: `rgba(${currentTheme.rgb}, ${0.05 + intensity * 0.1})`,
                                        border: `1px solid rgba(${currentTheme.rgb}, ${0.1 + intensity * 0.3})`
                                    }}
                                    animate={{
                                        boxShadow: [
                                            `0 0 ${intensity * 10}px ${intensity * 1}px rgba(${currentTheme.rgb}, ${intensity * 0.2})`,
                                            `0 0 ${intensity * 20}px ${intensity * 2}px rgba(${currentTheme.rgb}, ${intensity * 0.4})`,
                                            `0 0 ${intensity * 10}px ${intensity * 1}px rgba(${currentTheme.rgb}, ${intensity * 0.2})`
                                        ]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.1 // Stagger the breathing effect
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${intensity * 100}%` }}
                                        transition={{ duration: 1.5, delay: 0.5 + i * 0.03, ease: "easeOut" }}
                                        style={{
                                            backgroundColor: currentTheme.hex,
                                            opacity: 0.4
                                        }}
                                    />
                                </motion.div>
                                <span className="text-[9px] font-medium text-muted-foreground group-hover:text-white transition-colors">{format(day, "d")}</span>

                                {/* Tooltip */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 border border-white/10">
                                    {format(day, "MMM d")} • {Math.round(intensity * 100)}%
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Individual Tasks Breakdown (Scrollable) */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider pl-2">Task Breakdown</h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {["Morning Jog", "Drink Water", "No Sugar", "Read", "Sleep"].map((task, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="space-y-2 group"
                        >
                            <div className="flex justify-between text-xs font-medium">
                                <span className="group-hover:text-white transition-colors">{task}</span>
                                <span className="text-muted-foreground">{taskStats[task] || 0}%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${taskStats[task] || 0}%` }}
                                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                    className="h-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                                    style={{
                                        backgroundColor: currentTheme.hex,
                                        boxShadow: `0 0 10px rgba(${currentTheme.rgb}, 0.5)`
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
