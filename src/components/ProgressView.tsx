import ProgressTracker from "@/components/ProgressTracker";
import { NonNegotiables } from "./NonNegotiables";

const ProgressView = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-4 space-y-2">
        <h1 className="font-serif text-3xl font-black text-foreground tracking-tight">
          Progress
        </h1>
        <p className="text-sm text-muted-foreground">
          Gates passed, best holds, and your training journal.
        </p>
      </div>
      
      <NonNegotiables compact />
      
      <ProgressTracker />
    </div>
  );
};

export default ProgressView;
