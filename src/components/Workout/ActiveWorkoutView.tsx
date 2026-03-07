import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MuscleMapViewer } from "@/components/MuscleMap";
import { exerciseDatabase } from "@/data/exerciseDatabase";
import type { StackedDay, TrainingBlock } from "@/data/appContent";
import { CheckCircle, ChevronRight, Flag, X, Timer, AlertTriangle } from "lucide-react";

interface ActiveWorkoutViewProps {
  day: StackedDay;
  onFinish: () => void;
  onClose: () => void;
}

const REST_DURATION = 60; // seconds

export default function ActiveWorkoutView({ day, onFinish, onClose }: ActiveWorkoutViewProps) {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [completedBlocks, setCompletedBlocks] = useState<Set<number>>(new Set());
  const [isResting, setIsResting] = useState(false);
  const [restSeconds, setRestSeconds] = useState(REST_DURATION);
  const [painFlagged, setPainFlagged] = useState<Set<number>>(new Set());
  const [showCompletionAnim, setShowCompletionAnim] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const blocks = day.blocks;
  const currentBlock: TrainingBlock | undefined = blocks[currentBlockIndex];
  const progress = (completedBlocks.size / blocks.length) * 100;
  const isFinished = completedBlocks.size === blocks.length;

  // Find exercise for current block
  const currentExercise = currentBlock?.action?.type === 'skill'
    ? exerciseDatabase.find((e) =>
        currentBlock.label.toLowerCase().includes(e.name.toLowerCase().slice(0, 8)) ||
        (currentBlock.action?.treeId && e.id.includes(currentBlock.action.treeId.slice(0, 10)))
      )
    : undefined;

  // Rest timer
  useEffect(() => {
    if (!isResting) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    setRestSeconds(REST_DURATION);
    timerRef.current = setInterval(() => {
      setRestSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsResting(false);
          return REST_DURATION;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current!); };
  }, [isResting]);

  const completeBlock = () => {
    const newCompleted = new Set(completedBlocks);
    newCompleted.add(currentBlockIndex);
    setCompletedBlocks(newCompleted);
    setShowCompletionAnim(true);
    setTimeout(() => setShowCompletionAnim(false), 800);

    if (newCompleted.size < blocks.length) {
      setIsResting(true);
      // Advance to next uncompleted block
      const next = blocks.findIndex((_, i) => i > currentBlockIndex && !newCompleted.has(i));
      if (next !== -1) setTimeout(() => setCurrentBlockIndex(next), 200);
    }
  };

  const flagPain = () => {
    const newFlagged = new Set(painFlagged);
    newFlagged.add(currentBlockIndex);
    setPainFlagged(newFlagged);
  };

  const restPercent = ((REST_DURATION - restSeconds) / REST_DURATION) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b-[3px] border-foreground">
        <div>
          <h1 className="font-serif text-lg font-black text-foreground">{day.label} — {day.title}</h1>
          <p className="text-xs text-muted-foreground">{day.emphasis}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-[12px] hover:bg-muted transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-4 pt-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>{completedBlocks.size} / {blocks.length} blocks</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2 rounded-full" />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {isFinished ? (
          /* Completion screen */
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-10">
            <div className="h-20 w-20 rounded-full bg-primary/10 border-[3px] border-primary flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-serif text-3xl font-black text-foreground">Day Complete!</h2>
            <p className="text-muted-foreground text-sm">{day.label} — {day.title}</p>
            {painFlagged.size > 0 && (
              <Badge variant="outline" className="border-destructive text-destructive rounded-full">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {painFlagged.size} pain flag{painFlagged.size > 1 ? 's' : ''} — rest those areas
              </Badge>
            )}
            <p className="text-xs text-muted-foreground italic">"Every rep is an act of self-care."</p>
            <Button className="rounded-[16px] w-full max-w-xs font-bold" onClick={onFinish}>
              Finish & Return 🏁
            </Button>
          </div>
        ) : (
          <>
            {/* Rest timer overlay */}
            {isResting && (
              <div className="border-[3px] border-primary rounded-[24px] p-5 bg-primary/5 text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  <span className="font-bold text-primary">Rest</span>
                </div>
                {/* Circular progress */}
                <div className="flex justify-center">
                  <div className="relative h-20 w-20">
                    <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/30" />
                      <circle
                        cx="40" cy="40" r="34"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="6"
                        strokeDasharray={`${2 * Math.PI * 34}`}
                        strokeDashoffset={`${2 * Math.PI * 34 * (1 - restPercent / 100)}`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-black text-primary">{restSeconds}s</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-full border-primary text-primary" onClick={() => setIsResting(false)}>
                  Skip Rest
                </Button>
              </div>
            )}

            {/* Current block */}
            {currentBlock && (
              <div className={`border-[3px] border-foreground rounded-[24px] p-5 space-y-3 transition-all ${showCompletionAnim ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="rounded-full border-foreground/30 text-xs">
                    Block {currentBlockIndex + 1} of {blocks.length}
                  </Badge>
                  {painFlagged.has(currentBlockIndex) && (
                    <Badge variant="outline" className="rounded-full border-destructive text-destructive text-xs">
                      <Flag className="h-3 w-3 mr-1" />Pain flagged
                    </Badge>
                  )}
                </div>
                <h2 className="font-serif text-2xl font-black text-foreground leading-tight">
                  {currentBlock.label}
                </h2>
                {currentExercise?.musclesWorked && (
                  <div className="flex items-center gap-3">
                    <MuscleMapViewer activeMuscles={currentExercise.musclesWorked} compact />
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-foreground">Muscles</p>
                      <div className="flex flex-wrap gap-1">
                        {currentExercise.musclesWorked.primary.slice(0, 3).map((m) => (
                          <Badge key={m} className="text-[9px] bg-red-500/20 text-red-600 border-red-400/30">{m}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Upcoming blocks */}
            {blocks.slice(currentBlockIndex + 1, currentBlockIndex + 3).length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Up next</p>
                {blocks.slice(currentBlockIndex + 1, currentBlockIndex + 3).map((block, i) => (
                  <div key={i} className="border border-border rounded-[16px] p-3 flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full border-[2px] border-border flex items-center justify-center text-[10px] text-muted-foreground font-bold">
                      {currentBlockIndex + i + 2}
                    </div>
                    <span className="text-sm text-muted-foreground">{block.label}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Action buttons */}
      {!isFinished && (
        <div className="p-4 border-t-[3px] border-foreground space-y-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-none border-[2px] border-destructive/40 text-destructive rounded-[16px] gap-1"
              onClick={flagPain}
              disabled={painFlagged.has(currentBlockIndex)}
            >
              <Flag className="h-4 w-4" />
              {painFlagged.has(currentBlockIndex) ? 'Flagged' : 'Pain'}
            </Button>
            <Button
              className="flex-1 h-12 rounded-[16px] font-bold text-base gap-2"
              onClick={completeBlock}
              disabled={completedBlocks.has(currentBlockIndex)}
            >
              {completedBlocks.has(currentBlockIndex) ? (
                <><CheckCircle className="h-5 w-5" /> Done</>
              ) : (
                <>Complete Block <ChevronRight className="h-5 w-5" /></>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
