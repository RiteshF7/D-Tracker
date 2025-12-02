"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dumbbell, Flame, Activity, Sun, Heart,
    Filter, ChevronRight, Play, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { exercises, Category, MuscleGroup, DifficultyLevel } from "./exercisesData";

const categories: { id: Category; icon: any; color: string; desc: string }[] = [
    { id: "Weight Loss", icon: Flame, color: "from-orange-500 to-red-600", desc: "Burn fat & calories" },
    { id: "Strength Build", icon: Dumbbell, color: "from-blue-500 to-purple-600", desc: "Build muscle & power" },
    { id: "Calisthenics", icon: Activity, color: "from-green-500 to-emerald-600", desc: "Bodyweight mastery" },
    { id: "Warmup/Stretches", icon: Sun, color: "from-yellow-400 to-orange-500", desc: "Prepare & recover" },
    { id: "Yoga", icon: Heart, color: "from-pink-500 to-rose-600", desc: "Flexibility & balance" },
];

const muscleGroups: MuscleGroup[] = ["Full Body", "Legs", "Biceps", "Chest", "Back", "Shoulders", "Core"];
const difficulties: DifficultyLevel[] = ["Beginner", "Intermediate", "Athlete"];

export function ExerciseLibrary() {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | "All">("All");
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | "All">("All");
    const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

    const filteredExercises = useMemo(() => {
        return exercises.filter(ex => {
            if (selectedCategory && ex.category !== selectedCategory) return false;
            if (selectedMuscle !== "All" && ex.muscleGroup !== selectedMuscle) return false;
            if (selectedDifficulty !== "All" && ex.difficulty !== selectedDifficulty) return false;
            return true;
        });
    }, [selectedCategory, selectedMuscle, selectedDifficulty]);

    return (
        <div className="space-y-8 pb-24">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Exercise Library</h1>
                    <p className="text-muted-foreground">Master your form with visual guides</p>
                </div>
            </div>

            {/* Category Selection */}
            {!selectedCategory ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categories.map((cat, i) => (
                        <motion.button
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedCategory(cat.id)}
                            className="group relative overflow-hidden rounded-3xl h-40 text-left p-6 transition-all hover:scale-[1.02]"
                        >
                            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80 transition-opacity group-hover:opacity-100", cat.color)} />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                    <cat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{cat.id}</h3>
                                    <p className="text-white/80 text-sm font-medium">{cat.desc}</p>
                                </div>
                            </div>

                            <ChevronRight className="absolute bottom-6 right-6 text-white/50 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    ))}
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Back & Filters */}
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors w-fit"
                        >
                            <ChevronRight className="w-4 h-4 rotate-180" />
                            Back to Categories
                        </button>

                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                                {selectedCategory}
                            </h2>
                            <div className="text-sm text-muted-foreground">
                                {filteredExercises.length} exercises
                            </div>
                        </div>

                        {/* Filter Bar */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Muscle Group Scroll */}
                            {/* Muscle Group Dropdown */}
                            <div className="relative min-w-[140px]">
                                <select
                                    value={selectedMuscle}
                                    onChange={(e) => setSelectedMuscle(e.target.value as MuscleGroup | "All")}
                                    className="w-full appearance-none bg-black/40 border border-white/10 text-white text-xs font-bold rounded-xl px-4 py-3 pr-8 focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
                                >
                                    <option value="All">All Muscles</option>
                                    {muscleGroups.map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90 pointer-events-none" />
                            </div>

                            {/* Difficulty Dropdown (Simple Toggle for now) */}
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {difficulties.map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setSelectedDifficulty(selectedDifficulty === d ? "All" : d)}
                                        className={cn(
                                            "px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1",
                                            selectedDifficulty === d
                                                ? d === "Beginner" ? "bg-green-500/20 text-green-400 border-green-500/50"
                                                    : d === "Intermediate" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                                                        : "bg-red-500/20 text-red-400 border-red-500/50"
                                                : "bg-black/40 text-muted-foreground border-white/10 hover:border-white/30"
                                        )}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Exercise Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredExercises.map((ex) => (
                                <motion.div
                                    layout
                                    key={ex.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all"
                                    onClick={() => setSelectedExercise(selectedExercise === ex.id ? null : ex.id)}
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={ex.image}
                                            alt={ex.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                                    </div>

                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <div className="mb-auto flex justify-between items-start">
                                            <div className={cn(
                                                "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                                                ex.difficulty === "Beginner" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                                                    ex.difficulty === "Intermediate" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                                                        "bg-red-500/20 text-red-400 border-red-500/30"
                                            )}>
                                                {ex.difficulty}
                                            </div>
                                            <div className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-white/80 border border-white/10">
                                                {ex.muscleGroup}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-black text-white mb-2">{ex.name}</h3>

                                        <AnimatePresence>
                                            {selectedExercise === ex.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside mb-4">
                                                        {ex.steps.map((step, i) => (
                                                            <li key={i}>{step}</li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                            {selectedExercise === ex.id ? "Click to close" : "Click for steps"} <ChevronRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredExercises.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            <Info className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No exercises found for these filters.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
