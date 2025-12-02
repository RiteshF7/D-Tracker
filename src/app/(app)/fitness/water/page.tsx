import { WaterTracker } from "@/components/fitness/WaterTracker";

export default function WaterPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-blue-400">Water Intake</h1>
            <WaterTracker />
        </div>
    );
}
