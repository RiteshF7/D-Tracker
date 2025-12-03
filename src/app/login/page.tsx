"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const { signInWithGoogle, user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if already logged in
    if (user) {
        router.push("/daily-tasks");
        return null;
    }

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await signInWithGoogle();
            router.push("/daily-tasks");
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-background -z-20" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to continue your fitness journey</p>
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="w-full py-4 bg-white text-black hover:bg-gray-100 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        )}
                        Sign in with Google
                    </button>

                    <p className="text-xs text-muted-foreground">
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
