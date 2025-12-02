"use client";

import { useState, useEffect } from "react";
import { Moon, Star, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function SleepTracker() {
    const [hours, setHours] = useState(7);
    const [quality, setQuality] = useState<"poor" | "fair" | "good" | "excellent">("good");
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("d-tracker-sleep");
        if (saved) {
            setLogs(JSON.parse(saved));
        }
    }, []);

    const handleSave = () => {
        const newLog = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            hours,
            quality,
        };
        const updatedLogs = [newLog, ...logs];
        setLogs(updatedLogs);
        localStorage.setItem("d-tracker-sleep", JSON.stringify(updatedLogs));
    };

    return (
        <div className="space-y-6">
            {/* Input Card */}
            <div className="glass-card p-6 rounded-3xl space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                        <Moon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold">Log Last Night's Sleep</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Duration</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="1"
                                max="12"
                                step="0.5"
                                value={hours}
                                onChange={(e) => setHours(parseFloat(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                            <span className="text-2xl font-bold w-16 text-right">{hours}h</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Quality</label>
                        <div className="grid grid-cols-4 gap-2">
                            {(["poor", "fair", "good", "excellent"] as const).map((q) => (
                                <button
                                    key={q}
                                    onClick={() => setQuality(q)}
                                    className={cn(
                                        "py-2 rounded-xl text-sm font-medium transition-all border",
                                        quality === q
                                            ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                                            : "bg-white/5 border-white/5 hover:bg-white/10"
                                    )}
                                >
                                    {q.charAt(0).toUpperCase() + q.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
                    >
                        Save Log
                    </button>
                </div>
            </div>

            {/* History */}
            <div className="space-y-3">
                <h3 className="text-lg font-bold px-1">Recent History</h3>
                {logs.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No sleep logs yet</div>
                ) : (
                    logs.slice(0, 5).map((log) => (
                        <div key={log.id} className="glass-card p-4 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-white/5">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <div className="font-bold">{log.date}</div>
                                    <div className="text-xs text-muted-foreground capitalize">{log.quality} Sleep</div>
                                </div>
                            </div>
                            <div className="text-xl font-bold text-indigo-400">{log.hours}h</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
