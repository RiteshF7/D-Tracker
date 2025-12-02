"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none hidden md:block">
            {/* Primary Blob */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
            />

            {/* Secondary Blob */}
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, -90, 0],
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px]"
            />

            {/* Accent Blob */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 50, -50, 0],
                    y: [0, 50, -50, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
                className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"
            />
        </div>
    );
}
