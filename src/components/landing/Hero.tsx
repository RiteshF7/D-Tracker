"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export function Hero() {
    const router = useRouter();

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            router.push("/daily-tasks");
        }
    }, [user, router]);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Background Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px] -z-10"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, -90, 0],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[128px] -z-10"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8 max-w-4xl mx-auto z-10"
            >
                <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-muted-foreground mb-4">
                    ✨ The Ultimate Fitness Companion
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
                    Unleash Your <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-secondary glow-text">Potential</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    The ultimate daily activity and fitness tracker for athletes who demand excellence. Track, analyze, and improve.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/daily-tasks")}
                        className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg flex items-center gap-2 shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(139,92,246,0.6)] transition-all"
                    >
                        Enter App <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}
