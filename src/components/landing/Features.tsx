"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Activity, BarChart2, LineChart, Settings } from "lucide-react";

const features = [
    {
        icon: CheckCircle2,
        title: "Daily Tasks",
        description: "Stay organized with a simple, intuitive daily checklist.",
        color: "#a855f7"
    },
    {
        icon: Activity,
        title: "Fitness Tracker",
        description: "Log weight, steps, calories, and sleep in seconds.",
        color: "#00d2ff"
    },
    {
        icon: BarChart2,
        title: "Monitor",
        description: "Visualize your consistency with our signature glow blocks.",
        color: "#ff0055"
    },
    {
        icon: LineChart,
        title: "Reports",
        description: "Deep dive into your progress with interactive charts.",
        color: "#eab308"
    },
    {
        icon: Settings,
        title: "Manager",
        description: "Customize your goals and tasks to fit your routine.",
        color: "#ffffff"
    }
];

export function Features() {
    return (
        <section className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
                    <p className="text-muted-foreground">All the tools to track your journey in one place.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="glass-card p-8 rounded-3xl relative overflow-hidden group transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-0 border border-white/10 rounded-3xl group-hover:border-primary/50 transition-colors duration-300" />

                                <div className="relative z-10">
                                    <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:bg-white/10 transition-colors shadow-inner">
                                        <Icon className="w-8 h-8" style={{ color: feature.color }} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
