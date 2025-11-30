import { JournalDashboard } from "@/components/journal/JournalDashboard";

export default function JournalPage() {
    return (
        <div className="min-h-screen pb-24">
            <header className="mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                    Daily Journal
                </h1>
                <p className="text-muted-foreground mt-1">Reflect on your journey.</p>
            </header>

            <JournalDashboard />
        </div>
    );
}
