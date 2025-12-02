"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, logout as firebaseLogout } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: async () => { },
    logout: async () => { },
});

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    // Guest Mode: Always provide a mock user
    const [user, setUser] = useState<User | null>({
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

    const [loading, setLoading] = useState(false);

    // Disabled Firebase Auth Listener for Guest Mode
    /*
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    */

    const handleSignInWithGoogle = async () => {
        // await signInWithGoogle();
        console.log("Guest Mode: Sign in disabled");
    };

    const logout = async () => {
        // await firebaseLogout();
        setUser(null);
        console.log("Guest Mode: Logged out");
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle: handleSignInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
