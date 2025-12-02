"use client";

import { motion } from "framer-motion";
import { Dumbbell, Droplets, Moon, Camera, Trophy, Flame } from "lucide-react";
import Link from "next/link";

const features = [
    {
        name: "Workout Logger",
        description: "Track sets, reps, and weights",
        icon: Dumbbell,
        href: "/fitness/workout",
        color: "bg-orange-500",
        delay: 0.1,
    },
    {
        name: "Water Intake",
        description: "Stay hydrated daily",
        icon: Droplets,
        href: "/fitness/water",
        color: "bg-blue-500",
        delay: 0.2,
    },
    {
        name: "Sleep Tracker",
        description: "Monitor rest & recovery",
        icon: Moon,
        href: "/fitness/sleep",
        color: "bg-indigo-500",
        delay: 0.3,
    },
    {
        name: "Progress Photos",
        description: "Visual body transformation",
        icon: Camera,
        href: "/fitness/photos",
        color: "bg-pink-500",
        delay: 0.4,
    },
    {
        name: "Achievements",
        description: "Badges & Streaks",
        icon: Trophy,
        href: "/fitness/achievements",
        color: "bg-yellow-500",
        delay: 0.5,
    },
];

export function FitnessDashboard() {
    return (
        <div className="space-y-8 pb-24">
            <header className="space-y-2">
                <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Fitness Hub
                </h1>
                <p className="text-muted-foreground text-lg">
                    Your personal command center for health & wellness.
                </p>
            </header>

            {/* Quick Stats Row (Placeholder for now) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-2xl flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-orange-500/20 text-orange-500">
                        <Flame className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">0</div>
                        <div className="text-xs text-muted-foreground">Active Streak</div>
                    </div>
                </div>
                <div className="glass-card p-4 rounded-2xl flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/20 text-blue-500">
                        <Droplets className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">0/8</div>
                        <div className="text-xs text-muted-foreground">Glasses Today</div>
                    </div>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 gap-4">
                {features.map((feature) => (
                    <Link key={feature.name} href={feature.href}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: feature.delay }}
                            className="glass-card p-6 rounded-3xl flex items-center gap-4 hover:bg-white/5 transition-colors group"
                        >
                            <div className={`p-4 rounded-2xl ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold">{feature.name}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
