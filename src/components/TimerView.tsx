import WorkoutTimer from "@/components/WorkoutTimer";

const TimerView = () => {
  return (
    <div className="p-6">
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-card-foreground">Workout Timer</h1>
        <p className="text-muted-foreground">Time your training sessions and rest periods</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <WorkoutTimer />
      </div>
    </div>
  );
};

export default TimerView;