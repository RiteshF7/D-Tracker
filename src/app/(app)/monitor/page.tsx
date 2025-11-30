import { GlowMonitor } from "@/components/monitor/GlowMonitor";

export default function MonitorPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold glow-text text-primary">Monitor</h1>
                <p className="text-muted-foreground">Visualize your consistency.</p>
            </header>

            <GlowMonitor />
        </div>
    );
}
