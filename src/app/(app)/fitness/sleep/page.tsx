import { SleepTracker } from "@/components/fitness/SleepTracker";

export default function SleepPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-indigo-400">Sleep Tracker</h1>
            <SleepTracker />
        </div>
    );
}
