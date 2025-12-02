"use client";

import { Trophy, Flame, Target, Zap, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

const achievements = [
    {
        id: "early-bird",
        name: "Early Bird",
        description: "Log a workout before 8 AM",
        icon: Zap,
        color: "text-yellow-400",
        bg: "bg-yellow-400/20",
        unlocked: true,
    },
    {
        id: "streak-7",
        name: "7 Day Streak",
        description: "Log activity for 7 days in a row",
        icon: Flame,
        color: "text-orange-500",
        bg: "bg-orange-500/20",
        unlocked: false,
    },
    {
        id: "heavy-lifter",
        name: "Heavy Lifter",
        description: "Log a workout with total volume > 5000kg",
        icon: DumbbellIcon,
        color: "text-blue-500",
        bg: "bg-blue-500/20",
        unlocked: false,
    },
    {
        id: "hydrated",
        name: "Hydro Homie",
        description: "Hit water goal for 3 days",
        icon: DropletsIcon,
        color: "text-cyan-400",
        bg: "bg-cyan-400/20",
        unlocked: true,
    },
    {
        id: "sleep-master",
        name: "Sleep Master",
        description: "Log 8+ hours of sleep for 5 days",
        icon: MoonIcon,
        color: "text-indigo-400",
        bg: "bg-indigo-400/20",
        unlocked: false,
    },
];

// Helper icons
function DumbbellIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6.5 6.5 11 11" />
            <path d="m21 21-1-1" />
            <path d="m3 3 1 1" />
            <path d="m18 22 4-4" />
            <path d="m2 6 4-4" />
            <path d="m3 10 7-7" />
            <path d="m14 21 7-7" />
        </svg>
    );
}

function DropletsIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.8-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
        </svg>
    );
}

function MoonIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    );
}

export function Achievements() {
    return (
        <div className="space-y-6">
            <div className="glass-card p-6 rounded-3xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Level 3</h2>
                    <p className="text-muted-foreground text-sm">250 XP to next level</p>
                </div>
                <div className="p-4 rounded-full bg-yellow-500/20 text-yellow-500">
                    <Trophy className="w-8 h-8" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {achievements.map((achievement) => (
                    <div
                        key={achievement.id}
                        className={cn(
                            "glass-card p-4 rounded-2xl flex items-center gap-4 transition-all",
                            !achievement.unlocked && "opacity-50 grayscale"
                        )}
                    >
                        <div className={cn("p-3 rounded-xl", achievement.bg, achievement.color)}>
                            <achievement.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold">{achievement.name}</h3>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                        {achievement.unlocked && (
                            <div className="text-xs font-bold px-2 py-1 rounded-lg bg-green-500/20 text-green-500">
                                Unlocked
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
