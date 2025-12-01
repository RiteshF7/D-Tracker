"use client";

import { useState, useEffect, useRef } from "react";
import { format, subDays, addDays } from "date-fns";
import { ChevronLeft, ChevronRight, Save, BookOpen, Smile, Meh, Frown, Paperclip, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "@/context/AuthContext";

type Mood = "happy" | "neutral" | "sad" | null;

export function JournalDashboard() {
    const { user } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [entry, setEntry] = useState("");
    const [mood, setMood] = useState<Mood>(null);
    const [attachments, setAttachments] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [showSaved, setShowSaved] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const dateKey = format(currentDate, "yyyy-MM-dd");

    useEffect(() => {
        // Load entry for the date
        const savedData = localStorage.getItem(`d-tracker-journal-${dateKey}`);
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setEntry(parsed.text || "");
            setMood(parsed.mood || null);
            setAttachments(parsed.attachments || []);
        } else {
            setEntry("");
            setMood(null);
            setAttachments([]);
        }
    }, [dateKey]);

    const handleSave = () => {
        setIsSaving(true);
        const data = {
            text: entry,
            mood: mood,
            attachments: attachments,
            updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(`d-tracker-journal-${dateKey}`, JSON.stringify(data));

        setTimeout(() => {
            setIsSaving(false);
            setShowSaved(true);
            setTimeout(() => setShowSaved(false), 2000);
        }, 600);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        if (!user) {
            alert("Please login to upload attachments");
            return;
        }

        setIsUploading(true);
        const file = e.target.files[0];
        const storageRef = ref(storage, `journal/${user.uid}/${dateKey}/${Date.now()}_${file.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setAttachments(prev => [...prev, downloadURL]);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload attachment");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
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

            {/* Text Area & Attachments */}
            <div className="glass-card p-1 rounded-2xl relative group">
                <textarea
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="Write about your day..."
                    className="w-full h-[300px] bg-transparent text-white p-5 rounded-xl resize-none focus:outline-none focus:bg-white/5 transition-colors placeholder:text-white/20 leading-relaxed"
                />

                {/* Attachments List */}
                {attachments.length > 0 && (
                    <div className="px-5 pb-4 flex gap-3 overflow-x-auto no-scrollbar">
                        {attachments.map((url, i) => (
                            <div key={i} className="relative flex-shrink-0 group/img">
                                <img src={url} alt="Attachment" className="h-20 w-20 object-cover rounded-lg border border-white/10" />
                                <button
                                    onClick={() => removeAttachment(i)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 pb-4 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*"
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-white disabled:opacity-50"
                            title="Add Attachment"
                        >
                            {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
                        </button>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        disabled={isSaving}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2 rounded-xl font-bold shadow-lg transition-all text-sm",
                            isSaving ? "bg-violet-500/50 cursor-wait" : "bg-violet-600 hover:bg-violet-500 hover:shadow-violet-500/25"
                        )}
                    >
                        {isSaving ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            >
                                <Save className="w-4 h-4" />
                            </motion.div>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
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
