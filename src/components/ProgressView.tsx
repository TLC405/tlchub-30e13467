import ProgressTracker from "@/components/ProgressTracker";

const ProgressView = () => {
  return (
    <div className="p-6">
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-card-foreground">Progress Tracking</h1>
        <p className="text-muted-foreground">Monitor your calisthenics journey and achievements</p>
      </div>
      
      <ProgressTracker />
    </div>
  );
};

export default ProgressView;