import { subDays, format } from "date-fns";

export function seedGuestData() {
    // Clear existing data
    localStorage.clear();

    // Seed Tasks
    const tasks = [
        { id: "1", title: "Morning Jog (5km)", completed: true },
        { id: "2", title: "Drink 3L Water", completed: true },
        { id: "3", title: "No Sugar", completed: false },
        { id: "4", title: "Read 30 mins", completed: true },
        { id: "5", title: "Sleep by 11 PM", completed: null },
    ];
    localStorage.setItem("d-tracker-tasks", JSON.stringify(tasks));

    // Seed Goals
    const goals = {
        targetWeight: "70",
        targetSteps: "10000",
        targetCalories: "2500",
        targetSleep: "8",
    };
    localStorage.setItem("d-tracker-goals", JSON.stringify(goals));

    // Seed Fitness Data (Last 30 Days)
    const today = new Date();
    for (let i = 0; i < 30; i++) {
        const date = subDays(today, i);
        const dateString = format(date, "yyyy-MM-dd");

        const data = {
            weight: (75 + Math.random() * 2 - 1).toFixed(1),
            steps: Math.floor(8000 + Math.random() * 5000).toString(),
            calories: Math.floor(2000 + Math.random() * 800).toString(),
            sleep: (6 + Math.random() * 3).toFixed(1),
            date: dateString,
        };

        localStorage.setItem(`d-tracker-fitness-${dateString}`, JSON.stringify(data));
    }
}
