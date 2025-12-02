"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    CheckCircle2,
    Activity,
    BarChart2,
    LineChart,
    Settings,
    BookOpen,
    User as UserIcon,
    Menu,
    X,
    Dumbbell
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Tasks", href: "/daily-tasks", icon: CheckCircle2, color: "text-[#a855f7]" },
    { name: "Tracker", href: "/f-tracker", icon: Activity, color: "text-[#d946ef]" },
    { name: "Monitor", href: "/monitor", icon: BarChart2, color: "text-[#c084fc]" },
    { name: "Reports", href: "/reports", icon: LineChart, color: "text-[#f472b6]" },
    { name: "Journal", href: "/journal", icon: BookOpen, color: "text-[#7c3aed]" },
    { name: "Fitness", href: "/fitness", icon: Dumbbell, color: "text-emerald-400" },
    { name: "Manage", href: "/manager", icon: Settings, color: "text-white" },
    { name: "Profile", href: "/profile", icon: UserIcon, color: "text-[#38bdf8]" },
];

export function RadialNavigation() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const activeItem = navItems.find((item) => item.href === pathname) || navItems[0];
    const ActiveIcon = activeItem.icon;

    // Single Ring Configuration
    const radius = 140; // Larger radius for single circle
    const totalItems = navItems.length;
    const angleStep = 360 / totalItems;

    return (
        <>
            {/* Trigger Button (Bottom Center) */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-primary/30 flex items-center justify-center text-white transition-transform active:scale-95 hover:scale-105"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X className="w-8 h-8" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                            >
                                <Menu className="w-8 h-8" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Radial Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="relative w-[400px] h-[400px] flex items-center justify-center">
                            {/* Center Circle (Current Page) */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                className="absolute z-30 w-24 h-24 rounded-full bg-card border-2 border-primary/50 shadow-2xl flex flex-col items-center justify-center gap-1"
                            >
                                <ActiveIcon className={cn("w-8 h-8", activeItem.color)} />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                    Current
                                </span>
                            </motion.div>

                            {/* Single Ring Items */}
                            {navItems.map((item, index) => {
                                // Start from top (-90 degrees)
                                const angle = (index * angleStep) - 90;
                                const radian = (angle * Math.PI) / 180;
                                const x = Math.cos(radian) * radius;
                                const y = Math.sin(radian) * radius;
                                const isActive = pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <motion.div
                                        key={item.name}
                                        initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                        animate={{ x, y, opacity: 1, scale: 1 }}
                                        exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                        transition={{ delay: index * 0.03, type: "spring", stiffness: 200, damping: 20 }}
                                        className="absolute z-20"
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsOpen(false);
                                            }}
                                            className={cn(
                                                "flex flex-col items-center justify-center w-16 h-16 rounded-full border transition-all duration-200 group relative overflow-hidden",
                                                isActive
                                                    ? "bg-primary text-white border-primary shadow-lg scale-110"
                                                    : "bg-card/90 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30"
                                            )}
                                        >
                                            {/* Hover Glow Effect */}
                                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <Icon className="w-6 h-6 mb-0.5 relative z-10" />
                                            <span className="text-[8px] font-bold relative z-10">{item.name}</span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
