"use client";

import { useState, useMemo, useEffect } from "react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar
} from "recharts";
import {
    ChevronLeft, ChevronRight, TrendingUp, Activity,
    Flame, Moon, Droplets, Trophy, Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { format, subDays, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, getDay } from "date-fns";

// --- Types ---
type MetricType = "weight" | "steps" | "calories" | "sleep" | "water";
type TimeRange = "7d" | "30d" | "90d";

interface DailyLog {
    date: string;
    weight: number;
    steps: number;
    calories: number;
    sleep: number;
    water: number;
    sleepQuality?: string;
}

// --- GTA Dial Component ---
const GTADial = ({ data }: { data: DailyLog }) => {
    const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

    // Goals
    const goals = {
        steps: 10000,
        calories: 2500,
        sleep: 8,
        water: 8
    };

    const metrics = [
        { id: "steps", label: "Steps", value: data.steps, max: goals.steps, color: "#00d2ff", icon: Activity, angle: 270 }, // Top
        { id: "calories", label: "Calories", value: data.calories, max: goals.calories, color: "#ff0055", icon: Flame, angle: 0 },   // Right
        { id: "sleep", label: "Sleep", value: data.sleep, max: goals.sleep, color: "#a855f7", icon: Moon, angle: 90 },     // Bottom
        { id: "water", label: "Water", value: data.water, max: goals.water, color: "#3b82f6", icon: Droplets, angle: 180 }, // Left
    ];

    // SVG Math Helpers
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    const describeArc = (x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) => {
        const start = polarToCartesian(x, y, outerRadius, endAngle);
        const end = polarToCartesian(x, y, outerRadius, startAngle);
        const start2 = polarToCartesian(x, y, innerRadius, endAngle);
        const end2 = polarToCartesian(x, y, innerRadius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return [
            "M", start.x, start.y,
            "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
            "L", end2.x, end2.y,
            "A", innerRadius, innerRadius, 0, largeArcFlag, 1, start2.x, start2.y,
            "Z"
        ].join(" ");
    };

    return (
        <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {metrics.map((metric) => {
                    const startAngle = metric.angle - 43; // 86 degree slices with 4 degree gaps
                    const endAngle = metric.angle + 43;
                    const isHovered = hoveredMetric === metric.id;

                    // Calculate fill percentage
                    const progress = Math.min(metric.value / metric.max, 1);
                    // For the fill, we want it to grow from the center outwards or fill the arc?
                    // GTA style usually highlights the whole segment. 
                    // Let's make the opacity depend on progress, or fill a sub-arc.
                    // Let's do a sub-arc for the "bar" effect within the slice.

                    const outerRadius = 140;
                    const innerRadius = 60;
                    const activeOuterRadius = isHovered ? 148 : 140;

                    // Background Slice
                    const path = describeArc(150, 150, innerRadius, activeOuterRadius, startAngle, endAngle);

                    // Icon Position
                    const iconPos = polarToCartesian(150, 150, (innerRadius + activeOuterRadius) / 2, metric.angle);

                    return (
                        <g
                            key={metric.id}
                            onMouseEnter={() => setHoveredMetric(metric.id)}
                            onMouseLeave={() => setHoveredMetric(null)}
                            className="cursor-pointer transition-all duration-300"
                            style={{ transformOrigin: "150px 150px", transform: isHovered ? "scale(1.02)" : "scale(1)" }}
                        >
                            {/* Slice Background */}
                            <path
                                d={path}
                                fill="rgba(20, 20, 20, 0.8)"
                                stroke={isHovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)"}
                                strokeWidth="1"
                            />

                            {/* Progress Fill (Overlay) */}
                            <path
                                d={path}
                                fill={metric.color}
                                fillOpacity={0.2 + (progress * 0.6)} // Opacity based on progress
                                className="transition-all duration-500"
                            />

                            {/* Progress Bar (Thin line at outer edge) */}
                            <path
                                d={describeArc(150, 150, activeOuterRadius - 4, activeOuterRadius, startAngle, startAngle + (86 * progress))}
                                fill={metric.color}
                            />

                            {/* Icon */}
                            <foreignObject x={iconPos.x - 12} y={iconPos.y - 12} width="24" height="24" className="pointer-events-none">
                                <metric.icon className="w-6 h-6 text-white drop-shadow-md" />
                            </foreignObject>
                        </g>
                    );
                })}

                {/* Center Info */}
                <foreignObject x="100" y="100" width="100" height="100">
                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                        <AnimatePresence mode="wait">
                            {hoveredMetric ? (
                                <motion.div
                                    key={hoveredMetric}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">
                                        {metrics.find(m => m.id === hoveredMetric)?.label}
                                    </div>
                                    <div className="text-2xl font-black text-white" style={{ color: metrics.find(m => m.id === hoveredMetric)?.color }}>
                                        {metrics.find(m => m.id === hoveredMetric)?.value}
                                    </div>
                                    <div className="text-[10px] text-white/50">
                                        / {metrics.find(m => m.id === hoveredMetric)?.max}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="default"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Daily</div>
                                    <div className="text-xl font-black text-white">Stats</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </foreignObject>
            </svg>
        </div>
    );
};

// --- Heatmap Component ---
const ActivityHeatmap = ({ history }: { history: DailyLog[] }) => {
    // Generate last 3 months of days
    const days = useMemo(() => {
        const end = new Date();
        const start = subDays(end, 90);
        return eachDayOfInterval({ start, end });
    }, []);

    const getIntensity = (date: Date) => {
        const dateStr = date.toDateString(); // Use toDateString to match history format which might be ISO date string or similar
        // We need to match loosely or strictly depending on how we saved. 
        // TrackerForm saves as YYYY-MM-DD.
        // Let's normalize comparison to YYYY-MM-DD
        const isoDate = format(date, "yyyy-MM-dd");

        const log = history.find(h => h.date === isoDate || new Date(h.date).toDateString() === date.toDateString());
        if (!log) return 0;

        // Intensity based on steps (0-4 scale)
        const steps = log.steps || 0;
        if (steps > 10000) return 4;
        if (steps > 7500) return 3;
        if (steps > 5000) return 2;
        if (steps > 0) return 1;
        return 0;
    };

    const colors = [
        "bg-white/5",       // 0
        "bg-green-900/40",  // 1
        "bg-green-700/60",  // 2
        "bg-green-500/80",  // 3
        "bg-green-400",     // 4
    ];

    return (
        <div className="glass-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-green-400" />
                <h3 className="font-bold text-lg">Consistency Streak</h3>
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
                {days.map((day, i) => (
                    <div
                        key={i}
                        className={cn(
                            "w-3 h-3 rounded-sm transition-all hover:scale-150 relative group",
                            colors[getIntensity(day)]
                        )}
                    >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10 border border-white/10">
                            {format(day, "MMM d")}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                    {colors.map(c => <div key={c} className={cn("w-3 h-3 rounded-sm", c)} />)}
                </div>
                <span>More</span>
            </div>
        </div>
    );
};

export function ReportsDashboard() {
    const [selectedMetric, setSelectedMetric] = useState<MetricType | null>(null);
    const [timeRange, setTimeRange] = useState<TimeRange>("7d");
    const [history, setHistory] = useState<DailyLog[]>([]);
    const [todayLog, setTodayLog] = useState<DailyLog>({
        date: new Date().toISOString().split('T')[0],
        weight: 0, steps: 0, calories: 0, sleep: 0, water: 0
    });

    // --- Data Fetching ---
    useEffect(() => {
        // 1. Fetch Fitness History (Weight, Steps, Calories)
        const fitnessHistory = JSON.parse(localStorage.getItem("d-tracker-fitness-history") || "[]");

        // 2. Fetch Sleep History
        const sleepHistory = JSON.parse(localStorage.getItem("d-tracker-sleep") || "[]");

        // 3. Fetch Water History
        const waterHistory = JSON.parse(localStorage.getItem("d-tracker-water-history") || "[]");

        // 4. Merge Data
        // Create a map of date -> data
        const mergedMap = new Map<string, DailyLog>();

        // Helper to normalize date
        const normalize = (d: string) => {
            try {
                return new Date(d).toISOString().split('T')[0];
            } catch {
                return d;
            }
        };

        // Process Fitness
        fitnessHistory.forEach((f: any) => {
            const date = normalize(f.date);
            mergedMap.set(date, { ...f, date, sleep: 0, water: 0 });
        });

        // Process Sleep
        sleepHistory.forEach((s: any) => {
            const date = normalize(s.date);
            const existing = mergedMap.get(date) || { date, weight: 0, steps: 0, calories: 0, sleep: 0, water: 0 };
            existing.sleep = s.hours;
            existing.sleepQuality = s.quality;
            mergedMap.set(date, existing);
        });

        // Process Water
        waterHistory.forEach((w: any) => {
            const date = normalize(w.date);
            const existing = mergedMap.get(date) || { date, weight: 0, steps: 0, calories: 0, sleep: 0, water: 0 };
            existing.water = w.count;
            mergedMap.set(date, existing);
        });

        // Convert to array and sort
        const mergedArray = Array.from(mergedMap.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setHistory(mergedArray);

        // Set Today's Log (or most recent)
        const todayStr = new Date().toISOString().split('T')[0];
        const today = mergedMap.get(todayStr);
        if (today) {
            setTodayLog(today);
        } else {
            // Fallback: check if we have data in the individual "today" keys if history hasn't been synced yet
            const localFitness = JSON.parse(localStorage.getItem(`d-tracker-fitness-${todayStr}`) || "null");
            const localWater = JSON.parse(localStorage.getItem("d-tracker-water") || "null");
            // Sleep is usually "last night" so it might be in history already or we check today's entry

            setTodayLog({
                date: todayStr,
                weight: localFitness?.weight || 0,
                steps: localFitness?.steps || 0,
                calories: localFitness?.calories || 0,
                sleep: 0, // Sleep is complex, usually logged for previous night
                water: localWater?.date === new Date().toDateString() ? localWater.count : 0
            });
        }

    }, []);

    // --- Chart Data Preparation ---
    const chartData = useMemo(() => {
        const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
        const endDate = new Date();
        const startDate = subDays(endDate, days - 1);

        return eachDayOfInterval({ start: startDate, end: endDate }).map(date => {
            const dateStr = format(date, "yyyy-MM-dd");
            const log = history.find(h => h.date === dateStr);
            return {
                name: format(date, days > 30 ? "MMM d" : "EEE"),
                fullDate: format(date, "MMM d, yyyy"),
                weight: log?.weight || 0,
                steps: log?.steps || 0,
                calories: log?.calories || 0,
                sleep: log?.sleep || 0,
                water: log?.water || 0,
            };
        });
    }, [history, timeRange]);

    // --- Sleep Quality Data ---
    const sleepQualityData = useMemo(() => {
        const counts = { poor: 0, fair: 0, good: 0, excellent: 0 };
        history.forEach(h => {
            if (h.sleepQuality && h.sleepQuality in counts) {
                counts[h.sleepQuality as keyof typeof counts]++;
            }
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [history]);

    const COLORS = {
        poor: "#ef4444",
        fair: "#eab308",
        good: "#3b82f6",
        excellent: "#a855f7"
    };

    const metrics = [
        { id: "weight", label: "Avg Weight", value: "75.2 kg", color: "#a855f7" },
        { id: "steps", label: "Avg Steps", value: "10,245", color: "#00d2ff" },
        { id: "calories", label: "Avg Calories", value: "2,400", color: "#ff0055" },
        { id: "sleep", label: "Avg Sleep", value: "7.2 hrs", color: "#eab308" },
        { id: "water", label: "Avg Water", value: "6 glasses", color: "#3b82f6" },
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Top Section: Activity Rings & Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Activity Rings Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-6 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                    <h3 className="text-xl font-bold mb-6">Today's Activity</h3>
                    <GTADial data={todayLog} />
                    <div className="grid grid-cols-4 gap-4 mt-8 w-full">
                        {[
                            { label: "Steps", val: todayLog.steps, color: "text-cyan-400" },
                            { label: "Cals", val: todayLog.calories, color: "text-pink-500" },
                            { label: "Sleep", val: todayLog.sleep + "h", color: "text-purple-400" },
                            { label: "Water", val: todayLog.water, color: "text-blue-400" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className={cn("font-bold text-lg", stat.color)}>{stat.val}</div>
                                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Heatmap & Insights */}
                <div className="space-y-6">
                    <ActivityHeatmap history={history} />

                    {/* Sleep Quality Mini Chart */}
                    <div className="glass-card p-6 rounded-3xl flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-lg mb-1">Sleep Quality</h3>
                            <p className="text-sm text-muted-foreground">Last 30 Days Distribution</p>
                        </div>
                        <div className="w-24 h-24">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sleepQualityData}
                                        innerRadius={25}
                                        outerRadius={40}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {sleepQualityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {metrics.map((m, i) => (
                    <motion.button
                        key={m.id}
                        onClick={() => setSelectedMetric(m.id as MetricType)}
                        className="glass-card p-4 rounded-2xl text-left hover:bg-white/5 transition-all group"
                        whileHover={{ y: -2 }}
                    >
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{m.id}</div>
                        <div className="text-lg font-bold" style={{ color: m.color }}>
                            {/* Calculate real average here if needed, for now using static/mock from array but we should fix this */}
                            {m.id === "water" ? "View" : "View"}
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                            <div className="h-full w-1/2 rounded-full" style={{ backgroundColor: m.color }} />
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Main Trend Chart (Expanded View) */}
            <AnimatePresence>
                {selectedMetric && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glass-card rounded-3xl overflow-hidden border border-white/10"
                    >
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold capitalize flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: metrics.find(m => m.id === selectedMetric)?.color }} />
                                    {selectedMetric} Trends
                                </h3>
                            </div>
                            <div className="flex bg-black/40 p-1 rounded-xl">
                                {(["7d", "30d", "90d"] as TimeRange[]).map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={cn(
                                            "px-3 py-1 text-xs font-bold rounded-lg transition-all",
                                            timeRange === range ? "bg-white/20 text-white" : "text-muted-foreground hover:text-white"
                                        )}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="h-[300px] w-full p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={metrics.find(m => m.id === selectedMetric)?.color} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={metrics.find(m => m.id === selectedMetric)?.color} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#666"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="#666"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        dx={-10}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey={selectedMetric}
                                        stroke={metrics.find(m => m.id === selectedMetric)?.color}
                                        fillOpacity={1}
                                        fill="url(#colorMetric)"
                                        strokeWidth={3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
