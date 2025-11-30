import { TrackerForm } from "@/components/f-tracker/TrackerForm";

export default function FTrackerPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold glow-text text-secondary">F Tracker</h1>
                <p className="text-muted-foreground">Log your daily fitness metrics.</p>
            </header>

            <TrackerForm />
        </div>
    );
}
