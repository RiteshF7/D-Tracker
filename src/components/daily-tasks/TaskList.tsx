"use client";

import { useState, useEffect } from "react";
import { Check, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Task = {
    id: string;
    title: string;
    completed: boolean | null; // null = pending, true = done, false = skipped/failed
};

// Mock initial data - in real app, this comes from Manager/LocalStorage
const INITIAL_TASKS: Task[] = [
    { id: "1", title: "Morning Jog (5km)", completed: null },
    { id: "2", title: "Drink 3L Water", completed: null },
    { id: "3", "title": "No Sugar", completed: null },
    { id: "4", title: "Read 30 mins", completed: null },
    { id: "5", title: "Sleep by 11 PM", completed: null },
];

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem("d-tracker-tasks");
        if (saved) {
            setTasks(JSON.parse(saved));
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("d-tracker-tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleStatusChange = (id: string, status: boolean) => {
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, completed: status } : t
        ));
    };

    const resetTask = (id: string) => {
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, completed: null } : t
        ));
    };

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {tasks.map((task, index) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                            "relative overflow-hidden rounded-2xl p-4 transition-all duration-300 glass-card group",
                            task.completed === true
                                ? "border-primary/30"
                                : task.completed === false
                                    ? "border-destructive/30"
                                    : "hover:border-white/20"
                        )}
                    >
                        <div className="flex items-center justify-between relative z-10">
                            <span className={cn(
                                "font-medium text-lg transition-colors",
                                task.completed === true ? "text-primary glow-text" :
                                    task.completed === false ? "text-destructive glow-text" : "text-foreground"
                            )}>
                                {task.title}
                            </span>

                            <div className="flex items-center gap-2">
                                {task.completed === null ? (
                                    <>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleStatusChange(task.id, true)}
                                            className="p-2 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-black transition-colors"
                                        >
                                            <Check className="w-5 h-5" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleStatusChange(task.id, false)}
                                            className="p-2 rounded-full bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-white transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </motion.button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => resetTask(task.id)}
                                        className="text-xs text-muted-foreground hover:text-foreground underline"
                                    >
                                        Undo
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Background Glow Effect */}
                        {task.completed === true && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent blur-xl"
                            />
                        )}
                        {task.completed === false && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-gradient-to-r from-destructive/10 to-transparent blur-xl"
                            />
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>

            {tasks.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    No tasks for today. Add some in Manager!
                </div>
            )}
        </div>
    );
}
