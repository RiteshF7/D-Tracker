"use client";

import { useState, useEffect } from "react";
import { Dumbbell, Plus, Trash2, Save, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExerciseSet {
    id: number;
    reps: number;
    weight: number;
}

interface Exercise {
    id: number;
    name: string;
    sets: ExerciseSet[];
}

interface WorkoutLog {
    id: number;
    date: string;
    exercises: Exercise[];
}

export function WorkoutLogger() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [logs, setLogs] = useState<WorkoutLog[]>([]);
    const [view, setView] = useState<"log" | "history">("log");

    useEffect(() => {
        const saved = localStorage.getItem("d-tracker-workouts");
        if (saved) {
            setLogs(JSON.parse(saved));
        }
    }, []);

    const addExercise = () => {
        setExercises([
            ...exercises,
            {
                id: Date.now(),
                name: "",
                sets: [{ id: Date.now(), reps: 0, weight: 0 }],
            },
        ]);
    };

    const updateExerciseName = (id: number, name: string) => {
        setExercises(exercises.map((ex) => (ex.id === id ? { ...ex, name } : ex)));
    };

    const addSet = (exerciseId: number) => {
        setExercises(
            exercises.map((ex) =>
                ex.id === exerciseId
                    ? { ...ex, sets: [...ex.sets, { id: Date.now(), reps: 0, weight: 0 }] }
                    : ex
            )
        );
    };

    const updateSet = (exerciseId: number, setId: number, field: "reps" | "weight", value: number) => {
        setExercises(
            exercises.map((ex) =>
                ex.id === exerciseId
                    ? {
                        ...ex,
                        sets: ex.sets.map((s) => (s.id === setId ? { ...s, [field]: value } : s)),
                    }
                    : ex
            )
        );
    };

    const removeSet = (exerciseId: number, setId: number) => {
        setExercises(
            exercises.map((ex) =>
                ex.id === exerciseId
                    ? { ...ex, sets: ex.sets.filter((s) => s.id !== setId) }
                    : ex
            )
        );
    };

    const saveWorkout = () => {
        if (exercises.length === 0) return;
        const newLog: WorkoutLog = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            exercises,
        };
        const updatedLogs = [newLog, ...logs];
        setLogs(updatedLogs);
        localStorage.setItem("d-tracker-workouts", JSON.stringify(updatedLogs));
        setExercises([]);
        setView("history");
    };

    return (
        <div className="space-y-6">
            {/* Toggle View */}
            <div className="flex p-1 bg-white/5 rounded-xl">
                <button
                    onClick={() => setView("log")}
                    className={cn(
                        "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
                        view === "log" ? "bg-orange-500 text-white shadow-lg" : "text-muted-foreground hover:text-white"
                    )}
                >
                    Log Workout
                </button>
                <button
                    onClick={() => setView("history")}
                    className={cn(
                        "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
                        view === "history" ? "bg-orange-500 text-white shadow-lg" : "text-muted-foreground hover:text-white"
                    )}
                >
                    History
                </button>
            </div>

            {view === "log" ? (
                <div className="space-y-6">
                    {exercises.map((exercise, index) => (
                        <div key={exercise.id} className="glass-card p-4 rounded-2xl space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-orange-500/20 text-orange-500">
                                    <Dumbbell className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Exercise Name (e.g. Bench Press)"
                                    value={exercise.name}
                                    onChange={(e) => updateExerciseName(exercise.id, e.target.value)}
                                    className="flex-1 bg-transparent border-none text-lg font-bold placeholder:text-muted-foreground/50 focus:outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="grid grid-cols-10 gap-2 text-xs text-muted-foreground font-bold uppercase tracking-wider text-center mb-1">
                                    <div className="col-span-2">Set</div>
                                    <div className="col-span-3">kg</div>
                                    <div className="col-span-3">Reps</div>
                                    <div className="col-span-2"></div>
                                </div>
                                {exercise.sets.map((set, setIndex) => (
                                    <div key={set.id} className="grid grid-cols-10 gap-2 items-center">
                                        <div className="col-span-2 flex justify-center">
                                            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold">
                                                {setIndex + 1}
                                            </div>
                                        </div>
                                        <div className="col-span-3">
                                            <input
                                                type="number"
                                                placeholder="0"
                                                value={set.weight || ""}
                                                onChange={(e) => updateSet(exercise.id, set.id, "weight", parseFloat(e.target.value))}
                                                className="w-full bg-white/5 rounded-lg px-2 py-1 text-center font-bold focus:outline-none focus:ring-1 focus:ring-orange-500"
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <input
                                                type="number"
                                                placeholder="0"
                                                value={set.reps || ""}
                                                onChange={(e) => updateSet(exercise.id, set.id, "reps", parseFloat(e.target.value))}
                                                className="w-full bg-white/5 rounded-lg px-2 py-1 text-center font-bold focus:outline-none focus:ring-1 focus:ring-orange-500"
                                            />
                                        </div>
                                        <div className="col-span-2 flex justify-center">
                                            <button
                                                onClick={() => removeSet(exercise.id, set.id)}
                                                className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => addSet(exercise.id)}
                                className="w-full py-2 rounded-xl border border-dashed border-white/20 text-sm font-medium text-muted-foreground hover:text-white hover:border-white/40 transition-colors"
                            >
                                + Add Set
                            </button>
                        </div>
                    ))}

                    <div className="flex gap-4">
                        <button
                            onClick={addExercise}
                            className="flex-1 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Add Exercise
                        </button>
                        <button
                            onClick={saveWorkout}
                            disabled={exercises.length === 0}
                            className="flex-1 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg shadow-orange-500/25"
                        >
                            <Save className="w-5 h-5" />
                            Finish Workout
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {logs.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            No workouts logged yet
                        </div>
                    ) : (
                        logs.map((log) => (
                            <div key={log.id} className="glass-card p-5 rounded-2xl space-y-3">
                                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                    <div className="font-bold text-lg">{log.date}</div>
                                    <div className="text-xs font-bold px-2 py-1 rounded-lg bg-white/5 text-muted-foreground">
                                        {log.exercises.length} Exercises
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {log.exercises.map((ex) => (
                                        <div key={ex.id} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{ex.name || "Untitled Exercise"}</span>
                                            <span className="font-bold">{ex.sets.length} sets</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
