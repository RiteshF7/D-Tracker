"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
    const { signInWithGoogle, continueAsGuest, user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

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
            <div className="absolute inset-0 bg-background -z-20" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center space-y-8">
                    <LoginForm />

                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background/50 backdrop-blur-xl px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="w-full space-y-3">
                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className="w-full py-3 bg-white text-black hover:bg-gray-100 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                            )}
                            Google
                        </button>

                        <button
                            onClick={async () => {
                                setIsLoading(true);
                                await continueAsGuest();
                                router.push("/daily-tasks");
                            }}
                            disabled={isLoading}
                            className="w-full py-3 bg-white/10 text-white hover:bg-white/20 rounded-xl font-bold flex items-center justify-center gap-3 transition-all disabled:opacity-70"
                        >
                            Guest Mode
                        </button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
