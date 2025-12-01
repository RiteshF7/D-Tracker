"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-background text-foreground p-4 text-center">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Something went wrong!</h2>
                <p className="text-muted-foreground">We apologize for the inconvenience.</p>
            </div>
            <button
                onClick={() => reset()}
                className="rounded-full bg-primary px-8 py-3 font-bold text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
            >
                Try again
            </button>
        </div>
    );
}
