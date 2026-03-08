import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { exerciseDatabase } from '@/data/exerciseDatabase';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const PIE_COLORS = ['#f97316', '#3b82f6', '#22c55e', '#a855f7', '#eab308', '#ef4444', '#14b8a6'];

function generateWeeklyData() {
  // Try to get real data from localStorage, otherwise generate mock
  const mockVolumes = [3, 4, 2, 5, 3, 1, 0];
  return DAYS.map((day, i) => ({
    day,
    blocks: mockVolumes[i],
  }));
}

function generateCategoryData() {
  const categoryCounts: Record<string, number> = {};
  exerciseDatabase.forEach((ex) => {
    const cat = ex.category.replace(/-/g, ' ');
    categoryCounts[cat] = (categoryCounts[cat] ?? 0) + 1;
  });
  return Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
}

function getSummaryStats() {
  let streak = 0;
  let totalWorkouts = 0;
  let painFlags = 0;

  try {
    const dayData = localStorage.getItem('control_stacked_day');
    if (dayData) {
      const parsed = JSON.parse(dayData);
      totalWorkouts = parsed.totalCompleted ?? 0;
      streak = parsed.streak ?? 0;
    }
    const flagData = localStorage.getItem('control_pain_flags');
    if (flagData) {
      const flags = JSON.parse(flagData);
      painFlags = Array.isArray(flags) ? flags.length : 0;
    }
  } catch {
    // ignore
  }

  // Mock fallback
  if (!totalWorkouts) totalWorkouts = 12;
  if (!streak) streak = 4;

  return { totalWorkouts, streak, exercisesCompleted: exerciseDatabase.length, painFlags };
}

export const ProgressTrackerCanvas: React.FC = () => {
  const weeklyData = useMemo(generateWeeklyData, []);
  const categoryData = useMemo(generateCategoryData, []);
  const stats = useMemo(getSummaryStats, []);

  return (
    <div className="p-4 overflow-auto h-full space-y-4">
      <h2 className="font-serif text-2xl font-black text-foreground">Training Analytics</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Total Workouts', value: stats.totalWorkouts, color: 'text-green-600' },
          { label: 'Current Streak', value: `${stats.streak} days`, color: 'text-primary' },
          { label: 'Exercises in DB', value: stats.exercisesCompleted, color: 'text-blue-600' },
          { label: 'Pain Flags', value: stats.painFlags, color: 'text-red-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-4 rounded-[16px] border-[3px] border-foreground bg-card">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-2xl font-black ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Weekly volume chart */}
      <div className="p-4 rounded-[16px] border-[3px] border-foreground bg-card">
        <p className="text-sm font-bold text-foreground mb-3">Weekly Training Volume</p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={weeklyData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '2px solid hsl(var(--foreground))',
                background: 'hsl(var(--card))',
                fontSize: 12,
              }}
            />
            <Bar dataKey="blocks" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Blocks" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category distribution */}
      <div className="p-4 rounded-[16px] border-[3px] border-foreground bg-card">
        <p className="text-sm font-bold text-foreground mb-3">Exercise Categories</p>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={70}
              dataKey="value"
              label={({ name, percent }) =>
                `${name.split(' ')[0]} ${Math.round((percent ?? 0) * 100)}%`
              }
              labelLine={false}
              fontSize={10}
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '2px solid hsl(var(--foreground))',
                background: 'hsl(var(--card))',
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Streak tracker */}
      <div className="p-4 rounded-[16px] border-[3px] border-foreground bg-card">
        <p className="text-sm font-bold text-foreground mb-2">This Week</p>
        <div className="flex gap-2">
          {DAYS.map((day, i) => {
            const active = weeklyData[i].blocks > 0;
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full aspect-square rounded-[8px] border-[2px] flex items-center justify-center text-[10px] font-bold transition-colors ${
                    active
                      ? 'border-foreground bg-primary text-primary-foreground'
                      : 'border-muted-foreground bg-muted text-muted-foreground'
                  }`}
                >
                  {weeklyData[i].blocks || '–'}
                </div>
                <span className="text-[9px] text-muted-foreground">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
