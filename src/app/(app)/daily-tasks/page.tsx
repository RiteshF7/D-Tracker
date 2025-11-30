import { TaskList } from "@/components/daily-tasks/TaskList";

export default function DailyTasksPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold glow-text text-primary">Daily Tasks</h1>
                <p className="text-muted-foreground">Tick off your goals for today.</p>
            </header>

            <TaskList />
        </div>
    );
}
