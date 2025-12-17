"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, logout as firebaseLogout, signInWithEmail, signUpWithEmail } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    continueAsGuest: () => Promise<void>;
    logout: () => Promise<void>;
    signUp: (email: string, pass: string) => Promise<void>;
    signIn: (email: string, pass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: async () => { },
    continueAsGuest: async () => { },
    logout: async () => { },
    signUp: async () => { },
    signIn: async () => { },
});

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("AuthContext: onAuthStateChanged triggered", { user: user?.email, uid: user?.uid });
            if (user) {
                console.log("AuthContext: Setting user state", user.email);
                setUser(user);
            } else {
                const isGuest = localStorage.getItem("isGuest");
                console.log("AuthContext: No user. isGuest?", isGuest);
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

    const handleSignUp = async (email: string, pass: string) => {
        await signUpWithEmail(email, pass);
        localStorage.removeItem("isGuest");
    };

    const handleSignIn = async (email: string, pass: string) => {
        await signInWithEmail(email, pass);
        localStorage.removeItem("isGuest");
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signInWithGoogle: handleSignInWithGoogle,
            continueAsGuest,
            logout,
            signUp: handleSignUp,
            signIn: handleSignIn
        }}>
            {children}
        </AuthContext.Provider>
    );
}



export const useAuth = () => useContext(AuthContext);
