import { WorkoutLogger } from "@/components/fitness/WorkoutLogger";

export default function WorkoutPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-500">Workout Logger</h1>
            <WorkoutLogger />
        </div>
    );
}
