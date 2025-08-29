
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Flame,
  Target,
  Clock,
  Trophy,
  TrendingUp,
  Calendar
} from "lucide-react";

export default function CompactStats() {
  const stats = [
    {
      title: "Current Streak",
      value: "12",
      unit: "days",
      icon: Flame,
      trend: "+3 from last week",
      color: "text-orange-500"
    },
    {
      title: "Weekly Goal",
      value: "4/5",
      unit: "workouts",
      icon: Target,
      trend: "80% complete",
      color: "text-blue-500"
    },
    {
      title: "Total Time",
      value: "45.2",
      unit: "hours",
      icon: Clock,
      trend: "+2.5hrs this month",
      color: "text-green-500"
    },
    {
      title: "Skills Unlocked",
      value: "23",
      unit: "skills",
      icon: Trophy,
      trend: "+2 this week",
      color: "text-purple-500"
    },
    {
      title: "Weight",
      value: "175",
      unit: "lbs",
      icon: TrendingUp,
      trend: "-2 lbs",
      color: "text-red-500"
    },
    {
      title: "Height",
      value: "5'10\"",
      unit: "",
      icon: Calendar,
      trend: "US Imperial",
      color: "text-gray-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm font-medium">
              <span className="truncate">{stat.title}</span>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold">{stat.value}</span>
                {stat.unit && <span className="text-sm text-muted-foreground">{stat.unit}</span>}
              </div>
              <Badge variant="secondary" className="text-xs">
                {stat.trend}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
