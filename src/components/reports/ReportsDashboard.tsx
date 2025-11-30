
"use client";

import { useState, useMemo, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine } from "recharts";
import { ChevronLeft, ChevronRight, X, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { format, subDays, addDays, startOfDay, endOfDay } from "date-fns";

type MetricType = "weight" | "steps" | "calories" | "sleep";
type TimeRange = "7d" | "30d" | "120d";

export function ReportsDashboard() {
    const [selectedMetric, setSelectedMetric] = useState<MetricType | null>(null);
    const [timeRange, setTimeRange] = useState<TimeRange>("7d");
    const [dateOffset, setDateOffset] = useState(0);
    const [goals, setGoals] = useState<Record<string, string>>({});

    useEffect(() => {
        const savedGoals = localStorage.getItem("d-tracker-goals");
        if (savedGoals) {
            setGoals(JSON.parse(savedGoals));
        }
    }, []);

    const metrics = [
        { id: "weight", label: "Avg Weight", value: "75.2 kg", color: "#a855f7", gradient: ["#a855f7", "#7c3aed"] },
        { id: "steps", label: "Avg Steps", value: "10,245", color: "#00d2ff", gradient: ["#00d2ff", "#00aaff"] },
        { id: "calories", label: "Avg Calories", value: "2,400", color: "#ff0055", gradient: ["#ff0055", "#cc0044"] },
        { id: "sleep", label: "Avg Sleep", value: "7.2 hrs", color: "#eab308", gradient: ["#eab308", "#c29200"] },
    ];

    // Generate Data based on Range and Offset
    const chartData = useMemo(() => {
        const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 120;
        const endDate = subDays(new Date(), dateOffset * days);
        const startDate = subDays(endDate, days - 1);

        return Array.from({ length: days }, (_, i) => {
            const date = addDays(startDate, i);
            return {
                name: format(date, days > 30 ? "MMM d" : "EEE"), // Show date for longer ranges
                fullDate: format(date, "MMM d, yyyy"),
                weight: Number((75 + Math.sin(i * 0.5) * 2 + Math.random()).toFixed(1)),
                steps: Math.floor(8000 + Math.random() * 5000 + (i % 7 === 0 ? 2000 : 0)),
                calories: Math.floor(2000 + Math.random() * 500),
                sleep: Number((6 + Math.random() * 3).toFixed(1)),
            };
        });
    }, [timeRange, dateOffset]);

    const dateRangeLabel = useMemo(() => {
        if (chartData.length === 0) return "";
        const start = chartData[0].fullDate;
        const end = chartData[chartData.length - 1].fullDate;
        return `${start} - ${end}`;
    }, [chartData]);

    const handlePrev = () => setDateOffset(prev => prev + 1);
    const handleNext = () => setDateOffset(prev => Math.max(0, prev - 1));

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
                {metrics.map((m, i) => (
                    <motion.button
                        key={m.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedMetric(m.id as MetricType)}
                        className="glass-card p-5 rounded-2xl text-left hover:border-white/20 transition-all hover:scale-[1.02] group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp className="w-12 h-12" style={{ color: m.color }} />
                        </div>

                        <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2 font-medium">{m.label}</div>
                        <div className="text-2xl font-bold group-hover:glow-text transition-all" style={{ color: m.color }}>{m.value}</div>

                        <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "70%" }}
                                transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: m.color }}
                            />
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Chart Modal / Expanded View */}
            <AnimatePresence>
                {selectedMetric && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-[#0a0a0a] w-full max-w-lg rounded-3xl border border-white/10 p-6 space-y-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold capitalize text-white flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: metrics.find(m => m.id === selectedMetric)?.color }} />
                                        {selectedMetric} Report
                                    </h3>
                                    <div className="text-sm text-muted-foreground">Analysis & Trends</div>
                                </div>
                                <button
                                    onClick={() => setSelectedMetric(null)}
                                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Time Range Selector */}
                            {/* Controls Container */}
                            <div className="bg-white/5 rounded-3xl p-6 space-y-6 border border-white/5 backdrop-blur-sm">
                                {/* Date Controls */}
                                <div className="flex items-center justify-between">
                                    <button onClick={handlePrev} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft className="w-6 h-6" /></button>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-white mb-1">{dateRangeLabel}</div>
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
                                            {timeRange === "7d" ? "Weekly View" : timeRange === "30d" ? "Monthly View" : "Quarterly View"}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        disabled={dateOffset === 0}
                                        className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Time Range Selector */}
                                <div className="flex bg-black/40 p-1.5 rounded-2xl">
                                    {(["7d", "30d", "120d"] as TimeRange[]).map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => {
                                                setTimeRange(range);
                                                setDateOffset(0);
                                            }}
                                            className={cn(
                                                "flex-1 py-2 text-xs font-bold rounded-xl transition-all",
                                                timeRange === range ? "bg-white/10 text-white shadow-lg" : "text-muted-foreground hover:text-white"
                                            )}
                                        >
                                            {range === "7d" ? "Weekly" : range === "30d" ? "Monthly" : "Quarterly"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="h-[300px] w-full">
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
                                            interval={timeRange === "120d" ? 14 : timeRange === "30d" ? 6 : 0}
                                        />
                                        <YAxis
                                            stroke="#666"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            dx={-10}
                                            domain={['auto', 'auto']}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(10, 10, 10, 0.9)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '12px',
                                                backdropFilter: 'blur(8px)'
                                            }}
                                            itemStyle={{ color: '#fff' }}
                                            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                                            labelFormatter={(label, payload) => {
                                                if (payload && payload.length > 0) {
                                                    return payload[0].payload.fullDate;
                                                }
                                                return label;
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey={selectedMetric}
                                            stroke={metrics.find(m => m.id === selectedMetric)?.color}
                                            fillOpacity={1}
                                            fill="url(#colorMetric)"
                                            strokeWidth={3}
                                        />
                                        {selectedMetric && goals[`target${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}`] && (
                                            <ReferenceLine
                                                y={Number(goals[`target${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}`])}
                                                stroke="white"
                                                strokeDasharray="3 3"
                                                label={{ value: 'Target', position: 'right', fill: 'white', fontSize: 12 }}
                                            />
                                        )}
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

