"use client";

import { ManagerDashboard } from "@/components/manager/ManagerDashboard";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function ManagerPage() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold glow-text text-primary">Manager</h1>
                <p className="text-muted-foreground">Customize your tracking experience.</p>
            </header>

            <ManagerDashboard />

            <div className="pt-8 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-red-500/20"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </div>
    );
}
