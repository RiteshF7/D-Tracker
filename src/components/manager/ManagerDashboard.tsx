
"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Task = {
    id: string;
    title: string;
    completed: boolean | null;
};

type Goals = {
    targetWeight: string;
    targetSteps: string;
    targetCalories: string;
    targetSleep: string;
};

export function ManagerDashboard() {
    // Tasks State
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");

    // Goals State
    const [goals, setGoals] = useState<Goals>({
        targetWeight: "",
        targetSteps: "",
        targetCalories: "",
        targetSleep: "",
    });

    useEffect(() => {
        const savedTasks = localStorage.getItem("d-tracker-tasks");
        if (savedTasks) setTasks(JSON.parse(savedTasks));

        const savedGoals = localStorage.getItem("d-tracker-goals");
        if (savedGoals) setGoals(JSON.parse(savedGoals));
    }, []);

    const saveTasks = (newTasks: Task[]) => {
        setTasks(newTasks);
        localStorage.setItem("d-tracker-tasks", JSON.stringify(newTasks));
    };

    const addTask = () => {
        if (!newTask.trim()) return;
        const task: Task = { id: Date.now().toString(), title: newTask, completed: null };
        saveTasks([...tasks, task]);
        setNewTask("");
    };

    const deleteTask = (id: string) => {
        saveTasks(tasks.filter(t => t.id !== id));
    };

    const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newGoals = { ...goals, [name]: value };
        setGoals(newGoals);
        localStorage.setItem("d-tracker-goals", JSON.stringify(newGoals));
    };

    return (
        <div className="space-y-8">
            {/* Task Manager */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                    <Edit2 className="w-5 h-5" />
                    Manage Daily Tasks
                </h2>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add new task..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-muted-foreground/50"
                        onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addTask}
                        className="bg-primary text-black p-4 rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20"
                    >
                        <Plus />
                    </motion.button>
                </div>

                <div className="space-y-2">
                    <AnimatePresence>
                        {tasks.map((task) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-center justify-between glass-card p-4 rounded-xl group"
                            >
                                <span className="font-medium">{task.title}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => deleteTask(task.id)} className="text-muted-foreground hover:text-destructive p-2 rounded-lg transition-colors hover:bg-white/5">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {tasks.length === 0 && <div className="text-muted-foreground text-sm text-center py-4">No tasks defined. Add one above!</div>}
                </div>
            </section>

            {/* Goal Setting */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Set Goals
                </h2>
                <div className="grid grid-cols-1 gap-4 glass-card p-6 rounded-2xl">
                    {[
                        { label: "Target Weight (kg)", name: "targetWeight", placeholder: "70" },
                        { label: "Target Steps", name: "targetSteps", placeholder: "10000" },
                        { label: "Target Calories", name: "targetCalories", placeholder: "2500" },
                        { label: "Target Sleep (hrs)", name: "targetSleep", placeholder: "8" },
                    ].map((field) => (
                        <div key={field.name} className="space-y-1 group">
                            <label className="text-xs text-muted-foreground uppercase tracking-wider group-focus-within:text-secondary transition-colors">{field.label}</label>
                            <input
                                type="number"
                                name={field.name}
                                value={goals[field.name as keyof Goals]}
                                onChange={handleGoalChange}
                                className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-secondary transition-colors text-lg font-medium"
                                placeholder={field.placeholder}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

