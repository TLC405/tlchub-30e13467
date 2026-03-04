import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { NonNegotiables } from "./NonNegotiables";
import { stackedWeek } from "@/data/controlContent";
import {
  Dumbbell,
  ArrowUp,
  Zap,
  Target,
  Star,
  Play,
  CheckCircle,
  Clock,
  ChevronLeft,
  CircleDot,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Dumbbell: <Dumbbell className="h-5 w-5" />,
  ArrowUp: <ArrowUp className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  Target: <Target className="h-5 w-5" />,
  Star: <Star className="h-5 w-5" />,
};

// Get today's recommended day based on rotation
const getTodayDay = (): number => {
  const key = "control_stacked_day";
  const saved = localStorage.getItem(key);
  if (saved) {
    const { day, date } = JSON.parse(saved);
    const today = new Date().toDateString();
    if (date === today) return day;
    // New day — advance
    const next = (day + 1) % 4; // cycle through A-D
    localStorage.setItem(key, JSON.stringify({ day: next, date: today }));
    return next;
  }
  localStorage.setItem(key, JSON.stringify({ day: 0, date: new Date().toDateString() }));
  return 0;
};

const TrainingView = () => {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [completedBlocks, setCompletedBlocks] = useState<Record<string, boolean[]>>({});
  const [painFlags, setPainFlags] = useState<Record<string, boolean[]>>({});
  const todayIndex = getTodayDay();

  const toggleBlock = (dayId: string, blockIndex: number) => {
    setCompletedBlocks((prev) => {
      const blocks = [...(prev[dayId] || [])];
      blocks[blockIndex] = !blocks[blockIndex];
      return { ...prev, [dayId]: blocks };
    });
    toast({
      title: "Block updated",
      description: stackedWeek[selectedDay!].typicalBlocks[blockIndex],
    });
  };

  // Day detail view
  if (selectedDay !== null) {
    const day = stackedWeek[selectedDay];
    const blocks = completedBlocks[day.id] || [];
    const completed = blocks.filter(Boolean).length;

    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => setSelectedDay(null)}
          className="border-[2px] border-foreground rounded-[16px]"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          All Days
        </Button>

        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-3">
            <div className="h-12 w-12 rounded-[16px] border-[3px] border-foreground flex items-center justify-center bg-card">
              {iconMap[day.icon]}
            </div>
            <div className="text-left">
              <h1 className="font-serif text-2xl font-black text-foreground">
                {day.label} — {day.title}
              </h1>
              <p className="text-sm text-muted-foreground">{day.emphasis}</p>
            </div>
          </div>
        </div>

        <NonNegotiables />

        <div className="space-y-3">
          {day.typicalBlocks.map((block, i) => {
            const isDone = blocks[i] || false;
            return (
              <Card
                key={i}
                className={`border-[3px] rounded-[24px] transition-colors cursor-pointer ${
                  isDone ? "border-primary/50 bg-primary/5" : "border-foreground"
                }`}
                onClick={() => toggleBlock(day.id, i)}
              >
                <CardContent className="py-4 px-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isDone ? (
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      ) : (
                        <Play className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span
                        className={`font-medium text-sm ${
                          isDone ? "line-through text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {block}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {completed}/{day.typicalBlocks.length} blocks complete
        </div>
      </div>
    );
  }

  // Day selection view
  return (
    <div className="space-y-6">
      <div className="text-center py-4 space-y-2">
        <h1 className="font-serif text-3xl font-black text-foreground tracking-tight">
          STACKED
        </h1>
        <p className="text-sm text-muted-foreground">
          Your 4-day training cycle. Tap a day to begin.
        </p>
      </div>

      <NonNegotiables compact />

      <div className="space-y-4">
        {stackedWeek.map((day, index) => {
          const isToday = index === todayIndex;
          const blocks = completedBlocks[day.id] || [];
          const completed = blocks.filter(Boolean).length;

          return (
            <Card
              key={day.id}
              className={`border-[3px] rounded-[24px] cursor-pointer transition-all hover:bg-muted/30 ${
                isToday ? "border-primary" : "border-foreground"
              } ${day.optional ? "opacity-60 border-dashed" : ""}`}
              onClick={() => setSelectedDay(index)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-[12px] border-[2px] border-foreground flex items-center justify-center bg-card">
                      {iconMap[day.icon]}
                    </div>
                    <div>
                      <CardTitle className="font-serif text-lg font-bold">
                        {day.label} — {day.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">{day.emphasis}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isToday && (
                      <Badge className="bg-primary text-primary-foreground text-[10px] rounded-full">
                        TODAY
                      </Badge>
                    )}
                    {day.optional && (
                      <Badge variant="outline" className="text-[10px] rounded-full border-foreground/30">
                        Optional
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{day.typicalBlocks.length} blocks</span>
                  {completed > 0 && (
                    <>
                      <span>·</span>
                      <span className="text-primary">{completed} done</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingView;
