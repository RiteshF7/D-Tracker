import { ReportsDashboard } from "@/components/reports/ReportsDashboard";

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold glow-text text-primary">Reports</h1>
                <p className="text-muted-foreground">Analyze your progress over time.</p>
            </header>

            <ReportsDashboard />
        </div>
    );
}
