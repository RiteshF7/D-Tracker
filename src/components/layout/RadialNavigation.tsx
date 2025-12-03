"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Activity,
    BarChart2,
    LineChart,
    Settings,
    BookOpen,
    LogOut,
    Menu,
    X,
    Dumbbell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

// GTA Style Configuration
const WHEEL_RADIUS = 160;
const INNER_RADIUS = 60;
const ICON_RADIUS = (WHEEL_RADIUS + INNER_RADIUS) / 2;

export function RadialNavigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();

    const navItems = [
        { name: "Dashboard", href: "/daily-tasks", icon: LayoutDashboard, color: "text-[#a855f7]" },
        { name: "Tracker", href: "/f-tracker", icon: Activity, color: "text-[#d946ef]" },
        { name: "Monitor", href: "/monitor", icon: BarChart2, color: "text-[#c084fc]" },
        { name: "Reports", href: "/reports", icon: LineChart, color: "text-[#f472b6]" },
        { name: "Journal", href: "/journal", icon: BookOpen, color: "text-[#7c3aed]" },
        { name: "Fitness", href: "/fitness", icon: Dumbbell, color: "text-emerald-400" },
        { name: "Settings", href: "/manager", icon: Settings, color: "text-white" },
        { name: "Logout", action: "logout", icon: LogOut, color: "text-red-500" },
    ];

    const activeItem = hoveredIndex !== null
        ? navItems[hoveredIndex]
        : navItems.find((item) => item.href === pathname) || navItems[0];

    const ActiveIcon = activeItem.icon;

    const handleItemClick = async (item: typeof navItems[0]) => {
        if (item.action === "logout") {
            await logout();
            router.push("/");
        }
        setIsOpen(false);
    };

    // Calculate wedge paths
    const totalItems = navItems.length;
    const angleStep = 360 / totalItems;
    const gap = 2; // Gap between wedges in degrees

    const getWedgePath = (index: number) => {
        const startAngle = (index * angleStep) - 90 + (gap / 2);
        const endAngle = ((index + 1) * angleStep) - 90 - (gap / 2);

        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = Math.cos(startRad) * WHEEL_RADIUS;
        const y1 = Math.sin(startRad) * WHEEL_RADIUS;
        const x2 = Math.cos(endRad) * WHEEL_RADIUS;
        const y2 = Math.sin(endRad) * WHEEL_RADIUS;

        const x3 = Math.cos(endRad) * INNER_RADIUS;
        const y3 = Math.sin(endRad) * INNER_RADIUS;
        const x4 = Math.cos(startRad) * INNER_RADIUS;
        const y4 = Math.sin(startRad) * INNER_RADIUS;

        // SVG Path command
        // M start_outer A radius radius 0 large_arc sweep end_outer
        // L end_inner A radius radius 0 large_arc sweep start_inner
        // Z

        const largeArcFlag = angleStep - gap > 180 ? 1 : 0;

        return `
            M ${160 + x1} ${160 + y1}
            A ${WHEEL_RADIUS} ${WHEEL_RADIUS} 0 ${largeArcFlag} 1 ${160 + x2} ${160 + y2}
            L ${160 + x3} ${160 + y3}
            A ${INNER_RADIUS} ${INNER_RADIUS} 0 ${largeArcFlag} 0 ${160 + x4} ${160 + y4}
            Z
        `;
    };

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
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="relative w-[320px] h-[320px] flex items-center justify-center">
                            {/* Center Info Circle */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute z-30 w-28 h-28 rounded-full bg-background/95 border-2 border-primary/50 shadow-2xl flex flex-col items-center justify-center gap-1 pointer-events-none"
                            >
                                <ActiveIcon className={cn("w-10 h-10 transition-colors duration-300", activeItem.color)} />
                                <span className="text-xs font-bold uppercase tracking-wider text-foreground/80">
                                    {activeItem.name}
                                </span>
                            </motion.div>

                            {/* Wheel Segments */}
                            <svg
                                width="320"
                                height="320"
                                viewBox="0 0 320 320"
                                className="absolute inset-0 drop-shadow-2xl"
                            >
                                {navItems.map((item, index) => {
                                    const isHovered = hoveredIndex === index;
                                    const isActive = pathname === item.href;

                                    // Calculate icon position
                                    const angle = (index * angleStep) - 90;
                                    const radian = (angle * Math.PI) / 180;
                                    const iconX = 160 + Math.cos(radian) * ICON_RADIUS;
                                    const iconY = 160 + Math.sin(radian) * ICON_RADIUS;

                                    return (
                                        <g
                                            key={item.name}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleItemClick(item);
                                            }}
                                            className="cursor-pointer group"
                                        >
                                            {/* Wedge Shape */}
                                            <motion.path
                                                d={getWedgePath(index)}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0 }}
                                                transition={{ delay: index * 0.03 }}
                                                className={cn(
                                                    "transition-all duration-200",
                                                    isHovered
                                                        ? "fill-primary/90 stroke-white/20"
                                                        : isActive
                                                            ? "fill-primary/40 stroke-primary/50"
                                                            : "fill-black/80 stroke-white/10"
                                                )}
                                                strokeWidth="1"
                                            />

                                            {/* Link Wrapper (for navigation) */}
                                            {item.href ? (
                                                <Link href={item.href} onClick={(e) => e.preventDefault()}>
                                                    {/* Icon is rendered via foreignObject or just placed absolutely outside SVG? 
                                                        SVG foreignObject can be tricky. 
                                                        Let's render icons outside SVG for better control, or use SVG icons.
                                                        Actually, let's just use the group click handler and render icons on top.
                                                    */}
                                                </Link>
                                            ) : null}
                                        </g>
                                    );
                                })}
                            </svg>

                            {/* Icons Layer (Rendered on top of SVG) */}
                            {navItems.map((item, index) => {
                                const angle = (index * angleStep) + (angleStep / 2) - 90;
                                const radian = (angle * Math.PI) / 180;
                                const x = Math.cos(radian) * ICON_RADIUS;
                                const y = Math.sin(radian) * ICON_RADIUS;
                                const Icon = item.icon;
                                const isHovered = hoveredIndex === index;
                                const isActive = pathname === item.href;

                                return (
                                    <motion.div
                                        key={`icon-${item.name}`}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scale: isHovered ? 1.2 : 1,
                                            x,
                                            y
                                        }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="absolute z-20 pointer-events-none"
                                    >
                                        <Icon
                                            className={cn(
                                                "w-6 h-6 transition-colors duration-200",
                                                isHovered || isActive ? "text-white" : "text-muted-foreground"
                                            )}
                                        />
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
