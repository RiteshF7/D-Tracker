"use client";

import { useState, useEffect } from "react";
import { format, subDays, addDays } from "date-fns";
import { ChevronLeft, ChevronRight, Save, BookOpen, Smile, Meh, Frown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Mood = "happy" | "neutral" | "sad" | null;

export function JournalDashboard() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [entry, setEntry] = useState("");
    const [mood, setMood] = useState<Mood>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [showSaved, setShowSaved] = useState(false);

    const dateKey = format(currentDate, "yyyy-MM-dd");

    useEffect(() => {
        // Load entry for the date
        const savedData = localStorage.getItem(`d-tracker-journal-${dateKey}`);
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setEntry(parsed.text || "");
            setMood(parsed.mood || null);
        } else {
            setEntry("");
            setMood(null);
        }
    }, [dateKey]);

    const handleSave = () => {
        setIsSaving(true);
        const data = {
            text: entry,
            mood: mood,
            updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(`d-tracker-journal-${dateKey}`, JSON.stringify(data));

        setTimeout(() => {
            setIsSaving(false);
            setShowSaved(true);
            setTimeout(() => setShowSaved(false), 2000);
        }, 600);
    };

    const handlePrevDay = () => setCurrentDate(prev => subDays(prev, 1));
    const handleNextDay = () => setCurrentDate(prev => addDays(prev, 1));

    return (
        <div className="space-y-6 pb-24">
            {/* Header / Date Controls */}
            <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
                <button onClick={handlePrevDay} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2 justify-center">
                        <BookOpen className="w-5 h-5 text-violet-400" />
                        Journal
                    </h2>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {format(currentDate, "MMMM d, yyyy")}
                    </div>
                </div>
                <button
                    onClick={handleNextDay}
                    disabled={format(currentDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Mood Selector */}
            <div className="glass-card p-4 rounded-2xl space-y-3">
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold text-center">How was your day?</div>
                <div className="flex justify-center gap-6">
                    {[
                        { id: "happy", icon: Smile, color: "text-green-400", bg: "bg-green-400/20" },
                        { id: "neutral", icon: Meh, color: "text-yellow-400", bg: "bg-yellow-400/20" },
                        { id: "sad", icon: Frown, color: "text-red-400", bg: "bg-red-400/20" },
                    ].map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setMood(m.id as Mood)}
                            className={cn(
                                "p-3 rounded-2xl transition-all duration-300 transform hover:scale-110",
                                mood === m.id ? `${m.bg} scale-110 ring-2 ring-white/20` : "bg-white/5 hover:bg-white/10"
                            )}
                        >
                            <m.icon className={cn("w-8 h-8", m.color)} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Text Area */}
            <div className="glass-card p-1 rounded-2xl relative group">
                <textarea
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="Write about your day..."
                    className="w-full h-[400px] bg-transparent text-white p-5 rounded-xl resize-none focus:outline-none focus:bg-white/5 transition-colors placeholder:text-white/20 leading-relaxed"
                />

                {/* Save Button (Floating) */}
                <div className="absolute bottom-4 right-4">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        disabled={isSaving}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-all",
                            isSaving ? "bg-violet-500/50 cursor-wait" : "bg-violet-600 hover:bg-violet-500 hover:shadow-violet-500/25"
                        )}
                    >
                        {isSaving ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            >
                                <Save className="w-5 h-5" />
                            </motion.div>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                <span>Save</span>
                            </>
                        )}
                    </motion.button>
                </div>

                {/* Success Toast */}
                <AnimatePresence>
                    {showSaved && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-20 right-4 bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-xl"
                        >
                            Entry Saved!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
