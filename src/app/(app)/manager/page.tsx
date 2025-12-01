"use client";

import { ManagerDashboard } from "@/components/manager/ManagerDashboard";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
export default function ManagerPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold glow-text text-primary">Manager</h1>
                <p className="text-muted-foreground">Customize your tracking experience.</p>
            </header>

            <ThemeSwitcher />
            <ManagerDashboard />

        </div>
    );
}
