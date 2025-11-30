"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { seedGuestData } from "@/lib/seedData";
import { useAuth } from "@/context/AuthContext";

export function Hero() {
    const router = useRouter();

    const { signInWithGoogle, user } = useAuth();

    const handleGuestAccess = () => {
        seedGuestData();
        router.push("/daily-tasks");
    };

    const handleLogin = async () => {
        await signInWithGoogle();
    };

    if (user) {
        router.push("/daily-tasks");
    }

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 max-w-4xl mx-auto"
            >
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
                    Unleash Your <br />
                    <span className="text-gradient-primary glow-text">Potential</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    The ultimate daily activity and fitness tracker for athletes who demand excellence. Track, analyze, and improve.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGuestAccess}
                        className="px-8 py-4 bg-primary text-black rounded-full font-bold text-lg flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
                    >
                        Try as Guest <ArrowRight className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogin}
                        className="px-8 py-4 glass rounded-full font-bold text-lg flex items-center gap-2 hover:bg-white/10 transition-all text-white"
                    >
                        Login <Lock className="w-4 h-4" />
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}
