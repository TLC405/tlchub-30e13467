import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Flame, Trophy, Calendar, Activity } from "lucide-react";
import { MuscleMapViewer } from "@/components/MuscleMap";
import { exerciseDatabase } from "@/data/exerciseDatabase";

// Pull workout data from localStorage
function getWorkoutData() {
  const raw = localStorage.getItem('tlc_workout_history');
  if (!raw) return [];
  try {
    return JSON.parse(raw) as { date: string; category: string; muscles: string[] }[];
  } catch {
    return [];
  }
}

const categoryColors: Record<string, string> = {
  'handstand-inverted': '#8b5cf6',
  'pulling-rows': '#3b82f6',
  'planche-parallettes': '#ef4444',
  'rings-dynamic': '#f59e0b',
  'dynamic-showstoppers': '#ec4899',
  'mobility-yoga': '#10b981',
  'swimming-cardio': '#06b6d4',
  'yoga-flow': '#84cc16',
  'mobility-corrective': '#f97316',
  'endurance-conditioning': '#ef4444',
  'longevity-recovery': '#22c55e',
};

const categoryLabels: Record<string, string> = {
  'handstand-inverted': 'Handstand',
  'pulling-rows': 'Pulling',
  'planche-parallettes': 'Planche',
  'rings-dynamic': 'Rings',
  'dynamic-showstoppers': 'Elite',
  'mobility-yoga': 'Mobility',
  'swimming-cardio': 'Cardio',
  'yoga-flow': 'Yoga',
  'mobility-corrective': 'Corrective',
  'endurance-conditioning': 'Endurance',
  'longevity-recovery': 'Longevity',
};

// Generate demo data if none exists
function getDemoWeeklyData() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day) => ({
    day,
    sets: Math.floor(Math.random() * 15) + 5,
  }));
}

function getDemoCategoryData() {
  return [
    { name: 'Handstand', value: 30, color: categoryColors['handstand-inverted'] },
    { name: 'Pulling', value: 25, color: categoryColors['pulling-rows'] },
    { name: 'Planche', value: 20, color: categoryColors['planche-parallettes'] },
    { name: 'Yoga', value: 15, color: categoryColors['yoga-flow'] },
    { name: 'Other', value: 10, color: '#6b7280' },
  ];
}

function ConsistencyCalendar() {
  // Generate last 7 weeks (49 days)
  const today = new Date();
  const days: { date: Date; active: boolean }[] = [];
  for (let i = 48; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push({ date: d, active: Math.random() > 0.55 });
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
        <div key={i} className="text-[9px] text-muted-foreground text-center font-semibold">{d}</div>
      ))}
      {days.map((d, i) => (
        <div
          key={i}
          title={d.date.toLocaleDateString()}
          className={`h-5 w-full rounded-sm transition-colors ${d.active ? 'bg-primary' : 'bg-muted'}`}
        />
      ))}
    </div>
  );
}

export default function StatsView() {
  const workouts = getWorkoutData();
  const weeklyData = getDemoWeeklyData();
  const categoryData = getDemoCategoryData();

  // Demo streak
  const streak = 7;

  // Demo trained muscles (top muscles from random exercises)
  const trainedMuscles = {
    primary: ["Anterior Deltoid", "Serratus Anterior"],
    secondary: ["Rectus Abdominis", "Trapezius", "Latissimus Dorsi"],
    stabilizers: ["Erector Spinae", "Hip Flexors"],
  };

  // Demo PRs
  const prs = [
    { exercise: "Handstand Hold", record: "23 seconds", date: "Mar 5, 2026" },
    { exercise: "Pull-ups", record: "15 reps", date: "Mar 3, 2026" },
    { exercise: "Planche Lean", record: "45 seconds", date: "Feb 28, 2026" },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center py-2">
        <h1 className="font-serif text-3xl font-black text-foreground tracking-tight">Stats</h1>
        <p className="text-sm text-muted-foreground">Your training overview</p>
      </div>

      {/* Streak */}
      <Card className="border-[3px] border-foreground rounded-[24px] bg-gradient-to-r from-primary/10 to-transparent">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="h-14 w-14 rounded-[16px] border-[3px] border-primary bg-primary/10 flex items-center justify-center">
            <Flame className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-black text-foreground">{streak} days</p>
            <p className="text-xs text-muted-foreground">Current streak — keep it going!</p>
          </div>
        </CardContent>
      </Card>

      {/* Muscles trained this week */}
      <Card className="border-[3px] border-foreground rounded-[24px]">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif text-base font-bold flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Muscles Trained This Week
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4 pb-4">
          <MuscleMapViewer activeMuscles={trainedMuscles} compact />
          <div className="space-y-1 flex-1">
            <p className="text-xs font-semibold text-foreground">Primary focus</p>
            <div className="flex flex-wrap gap-1">
              {trainedMuscles.primary.map((m) => (
                <Badge key={m} className="text-[9px] bg-red-500/20 text-red-600 border-red-300">{m}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {trainedMuscles.secondary.map((m) => (
                <Badge key={m} className="text-[9px] bg-yellow-400/20 text-yellow-700 border-yellow-300">{m}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category breakdown */}
      <Card className="border-[3px] border-foreground rounded-[24px]">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif text-base font-bold">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 flex-1">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-foreground">{cat.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly volume */}
      <Card className="border-[3px] border-foreground rounded-[24px]">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif text-base font-bold">Weekly Volume</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={weeklyData} barSize={20}>
              <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '2px solid hsl(var(--foreground))', fontSize: 12 }}
                cursor={{ fill: 'hsl(var(--muted))' }}
              />
              <Bar dataKey="sets" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Personal Records */}
      <Card className="border-[3px] border-foreground rounded-[24px]">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif text-base font-bold flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Personal Records
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4 space-y-2">
          {prs.map((pr, i) => (
            <div key={i} className="flex items-center justify-between border border-border rounded-[14px] p-3">
              <div>
                <p className="font-semibold text-sm text-foreground">{pr.exercise}</p>
                <p className="text-xs text-muted-foreground">{pr.date}</p>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/30 rounded-full font-bold">
                {pr.record}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Consistency Calendar */}
      <Card className="border-[3px] border-foreground rounded-[24px]">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif text-base font-bold flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Consistency (Last 7 Weeks)
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <ConsistencyCalendar />
        </CardContent>
      </Card>

      <div className="text-center pb-4">
        <p className="text-[10px] text-muted-foreground">Powered by TLC · Every rep is an act of self-care</p>
      </div>
    </div>
  );
}
