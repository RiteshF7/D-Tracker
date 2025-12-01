"use client";

import { ProfileDashboard } from "@/components/profile/ProfileDashboard";

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold glow-text text-primary">My Profile</h1>
                <p className="text-muted-foreground">Manage your account and settings.</p>
            </header>

            <ProfileDashboard />
        </div>
    );
}
