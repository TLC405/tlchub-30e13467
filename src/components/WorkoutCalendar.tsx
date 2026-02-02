import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Dumbbell, 
  Clock,
  Target,
  CheckCircle,
  Edit3
} from "lucide-react";
import { format, isToday, isSameDay } from "date-fns";

interface WorkoutEntry {
  id: string;
  date: Date;
  exercises: string[];
  duration: number;
  notes?: string;
  completed: boolean;
}

const WorkoutCalendar = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([
    {
      id: "1",
      date: new Date(2025, 0, 1), // January 1, 2025
      exercises: ["Push-ups", "Pull-ups", "Handstand practice"],
      duration: 45,
      notes: "Great session, feeling strong",
      completed: true
    },
    {
      id: "2", 
      date: new Date(2025, 0, 3), // January 3, 2025
      exercises: ["Planche training", "L-sits", "Muscle-ups"],
      duration: 60,
      notes: "Progress on planche lean",
      completed: true
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    exercises: "",
    duration: "",
    notes: ""
  });

  const getChicagoTime = () => {
    return new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getWorkoutForDate = (date: Date) => {
    return workouts.find(workout => isSameDay(workout.date, date));
  };

  const hasWorkout = (date: Date) => {
    return workouts.some(workout => isSameDay(workout.date, date));
  };

  const handleAddWorkout = async () => {
    if (!newWorkout.exercises.trim()) {
      toast({
        title: "Error",
        description: "Please enter at least one exercise",
        variant: "destructive"
      });
      return;
    }

    const workout: WorkoutEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      exercises: newWorkout.exercises.split(',').map(ex => ex.trim()),
      duration: parseInt(newWorkout.duration) || 30,
      notes: newWorkout.notes,
      completed: true
    };

    setWorkouts(prev => [...prev, workout]);
    setNewWorkout({ exercises: "", duration: "", notes: "" });
    setIsDialogOpen(false);

    // Show learn bite toast after logging
    const { showLearnBiteToast } = await import('@/components/learn/LearnBiteToast');
    const { principlesMap } = await import('@/data/learningPrinciples');
    
    // Use default principles for logged exercises
    const defaultSlugs = ['distributed_practice', 'external_focus', 'feedback_dosing'];
    
    // Show a learn bite for the first exercise logged
    if (workout.exercises.length > 0) {
      showLearnBiteToast(
        workout.id,
        workout.exercises[0],
        defaultSlugs,
        (id, slugs) => {
          const key = `learn_rotation_${id}`;
          const lastIndex = parseInt(localStorage.getItem(key) || '0', 10);
          const nextIndex = (lastIndex + 1) % slugs.length;
          localStorage.setItem(key, nextIndex.toString());
          return principlesMap[slugs[nextIndex]];
        }
      );
    }

    toast({
      title: "Workout Logged! 💪",
      description: `Added workout for ${format(selectedDate, 'MMM d, yyyy')}`,
    });
  };

  const selectedWorkout = getWorkoutForDate(selectedDate);
  const todayWorkout = getWorkoutForDate(new Date());

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Workout Calendar
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Log Workout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Workout for {format(selectedDate, 'MMMM d, yyyy')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Exercises (comma-separated)</label>
                  <Input
                    placeholder="Push-ups, Pull-ups, Handstand practice"
                    value={newWorkout.exercises}
                    onChange={(e) => setNewWorkout(prev => ({ ...prev, exercises: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Duration (minutes)</label>
                  <Input
                    type="number"
                    placeholder="45"
                    value={newWorkout.duration}
                    onChange={(e) => setNewWorkout(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Notes (optional)</label>
                  <Textarea
                    placeholder="How did the workout feel?"
                    value={newWorkout.notes}
                    onChange={(e) => setNewWorkout(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>
                <Button onClick={handleAddWorkout} className="w-full">
                  Add Workout
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="text-sm text-muted-foreground">
          Chicago Time: {getChicagoTime()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Calendar */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border border-border pointer-events-auto"
            modifiers={{
              workout: (date) => hasWorkout(date),
              today: (date) => isToday(date)
            }}
            modifiersStyles={{
              workout: { 
                backgroundColor: 'hsl(var(--primary))', 
                color: 'hsl(var(--primary-foreground))',
                fontWeight: 'bold'
              }
            }}
          />
        </div>

        {/* Today's Summary */}
        {todayWorkout && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-primary" />
                  Today's Workout
                </h3>
                <Badge className="bg-green-600/20 text-green-400">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {todayWorkout.duration} minutes
                </div>
                <div className="text-foreground">
                  <strong>Exercises:</strong> {todayWorkout.exercises.join(', ')}
                </div>
                {todayWorkout.notes && (
                  <div className="text-muted-foreground italic">
                    "{todayWorkout.notes}"
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Selected Date Details */}
        <Card className="border-border">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              {isToday(selectedDate) && (
                <Badge variant="outline" className="ml-2">Today</Badge>
              )}
            </h3>
            
            {selectedWorkout ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-600/20 text-green-400">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Workout Completed
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedWorkout.duration} min
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Exercises:</h4>
                  <div className="space-y-1">
                    {selectedWorkout.exercises.map((exercise, index) => (
                      <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="h-1 w-1 bg-primary rounded-full"></div>
                        {exercise}
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedWorkout.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Notes:</h4>
                    <p className="text-sm text-muted-foreground italic">"{selectedWorkout.notes}"</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-muted-foreground mb-3">No workout logged for this date</div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsDialogOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Log Workout
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center p-3">
            <div className="text-lg font-bold text-foreground">{workouts.length}</div>
            <div className="text-xs text-muted-foreground">Total Workouts</div>
          </Card>
          <Card className="text-center p-3">
            <div className="text-lg font-bold text-foreground">
              {workouts.filter(w => w.completed).length}
            </div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </Card>
          <Card className="text-center p-3">
            <div className="text-lg font-bold text-foreground">
              {Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / 60)}h
            </div>
            <div className="text-xs text-muted-foreground">Total Time</div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutCalendar;