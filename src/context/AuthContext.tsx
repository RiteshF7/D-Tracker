"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, logout as firebaseLogout } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    continueAsGuest: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: async () => { },
    continueAsGuest: async () => { },
    logout: async () => { },
});

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                // Check if guest mode is active in local state/storage if we wanted persistence, 
                // but for now we'll just let it be null unless explicitly set.
                // Actually, if we want guest persistence across reloads without Firebase, we'd need localStorage.
                // For simplicity, let's just rely on state for this session or check localStorage.
                const isGuest = localStorage.getItem("isGuest");
                if (isGuest === "true") {
                    setGuestUser();
                } else {
                    setUser(null);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const setGuestUser = () => {
        setUser({
            uid: "guest-user",
            displayName: "Guest User",
            email: "guest@dtracker.app",
            photoURL: null,
            emailVerified: true,
            isAnonymous: true,
            metadata: {},
            providerData: [],
            refreshToken: "",
            tenantId: null,
            delete: async () => { },
            getIdToken: async () => "",
            getIdTokenResult: async () => ({} as any),
            reload: async () => { },
            toJSON: () => ({}),
            phoneNumber: null,
        } as unknown as User);
    };

    const handleSignInWithGoogle = async () => {
        await signInWithGoogle();
        localStorage.removeItem("isGuest");
    };

    const continueAsGuest = async () => {
        localStorage.setItem("isGuest", "true");
        setGuestUser();
    };

    const logout = async () => {
        await firebaseLogout();
        localStorage.removeItem("isGuest");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle: handleSignInWithGoogle, continueAsGuest, logout }}>
            {children}
        </AuthContext.Provider>
    );
}



export const useAuth = () => useContext(AuthContext);
