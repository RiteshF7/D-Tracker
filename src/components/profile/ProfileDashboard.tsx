"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "firebase/auth";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";
import { Camera, Save, LogOut, User as UserIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

export function ProfileDashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || "");
            setPhotoURL(user.photoURL || "");
        }
    }, [user]);

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    const handleSave = async () => {
        if (!user) return;
        setIsSaving(true);
        try {
            await updateProfile(user, {
                displayName: displayName,
                photoURL: photoURL,
            });
            // Force reload to update UI context if needed, or just rely on Firebase auth listener
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0 || !user) return;

        setIsUploading(true);
        const file = e.target.files[0];
        const storageRef = ref(storage, `profile/${user.uid}/${Date.now()}_${file.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setPhotoURL(downloadURL);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload photo");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Profile Card */}
            <div className="glass-card p-8 rounded-3xl flex flex-col items-center gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

                {/* Avatar */}
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden bg-black/20 flex items-center justify-center">
                        {photoURL ? (
                            <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon className="w-12 h-12 text-muted-foreground" />
                        )}
                    </div>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="absolute bottom-0 right-0 p-2.5 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                    />
                </div>

                {/* Email */}
                <div className="text-center">
                    <div className="text-sm text-muted-foreground font-medium">{user?.email}</div>
                </div>

                {/* Edit Form */}
                <div className="w-full max-w-sm space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Display Name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors border border-red-500/20"
            >
                <LogOut className="w-5 h-5" />
                Logout
            </button>
        </div>
    );
}
