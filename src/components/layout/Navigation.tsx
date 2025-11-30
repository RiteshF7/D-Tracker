"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, Activity, BarChart2, LineChart, Settings, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
    {
        name: "Tasks",
        href: "/daily-tasks",
        icon: CheckCircle2,
        color: "text-[#a855f7]",
    },
    {
        name: "Tracker",
        href: "/f-tracker",
        icon: Activity,
        color: "text-[#d946ef]",
    },
    {
        name: "Monitor",
        href: "/monitor",
        icon: BarChart2,
        color: "text-[#c084fc]",
    },
    {
        name: "Reports",
        href: "/reports",
        icon: LineChart,
        color: "text-[#f472b6]",
    },
    {
        name: "Journal",
        href: "/journal",
        icon: BookOpen,
        color: "text-[#7c3aed]",
    },
    {
        name: "Manage",
        href: "/manager",
        icon: Settings,
        color: "text-[#ffffff]",
    },
];

export function Navigation() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-6 left-4 right-4 z-50 flex justify-center">
            <nav className="glass rounded-2xl px-2 py-2 shadow-2xl shadow-black/50 w-full max-w-md">
                <ul className="flex items-center justify-between">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <li key={item.href} className="relative">
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 relative z-10",
                                        isActive ? "text-black" : "text-muted-foreground hover:text-white"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className={cn("absolute inset-0 rounded-xl bg-gradient-to-tr from-white to-white/80 shadow-lg shadow-white/10")}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <Icon className={cn("w-6 h-6 relative z-10", isActive && "text-black")} />
                                    <span className={cn("text-[9px] font-bold mt-0.5 relative z-10", isActive ? "text-black" : "opacity-0")}>
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
