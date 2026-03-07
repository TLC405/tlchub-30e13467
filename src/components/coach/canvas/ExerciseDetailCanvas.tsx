import React, { useState } from 'react';
import { exerciseDatabase } from '@/data/exerciseDatabase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { learningPrinciples } from '@/data/learningPrinciples';
import { MessageCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ExerciseDetailCanvasProps {
  exerciseId?: string;
  onAskCoach: (msg: string) => void;
}

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800 border-green-300',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  advanced: 'bg-orange-100 text-orange-800 border-orange-300',
  elite: 'bg-red-100 text-red-800 border-red-300',
};

export const ExerciseDetailCanvas: React.FC<ExerciseDetailCanvasProps> = ({
  exerciseId,
  onAskCoach,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState(exerciseId);

  const exercise = exerciseDatabase.find((e) => e.id === (selectedId ?? exerciseId));

  const filteredExercises = exerciseDatabase.filter(
    (e) =>
      !searchQuery ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!exercise) {
    return (
      <div className="p-4 h-full flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-[16px] border-[2px] border-foreground"
          />
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 pr-2">
            {filteredExercises.map((ex) => (
              <button
                key={ex.id}
                onClick={() => setSelectedId(ex.id)}
                className="text-left p-3 rounded-[16px] border-[2px] border-foreground bg-card hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground">{ex.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLOR[ex.difficulty]}`}>
                    {ex.difficulty}
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground">{ex.category}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col gap-4 overflow-auto">
      {/* Back + header */}
      <div>
        <button
          onClick={() => setSelectedId(undefined)}
          className="text-[11px] text-muted-foreground hover:text-foreground mb-2"
        >
          ← All exercises
        </button>
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h2 className="font-serif text-2xl font-black text-foreground leading-tight">
            {exercise.name}
          </h2>
          <div className="flex gap-2 flex-wrap">
            <Badge className={`border ${DIFFICULTY_COLOR[exercise.difficulty]}`}>
              {exercise.difficulty}
            </Badge>
            <Badge variant="outline" className="border-[2px] border-foreground text-[11px]">
              {exercise.category}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{exercise.description}</p>
      </div>

      <Tabs defaultValue="training" className="flex-1">
        <TabsList className="rounded-[16px] border-[2px] border-foreground bg-muted w-full">
          <TabsTrigger value="training" className="flex-1 text-xs rounded-[14px]">Training</TabsTrigger>
          <TabsTrigger value="muscles" className="flex-1 text-xs rounded-[14px]">Muscles</TabsTrigger>
          <TabsTrigger value="recovery" className="flex-1 text-xs rounded-[14px]">Recovery</TabsTrigger>
          <TabsTrigger value="learn" className="flex-1 text-xs rounded-[14px]">Learn</TabsTrigger>
        </TabsList>

        <TabsContent value="training" className="mt-3 space-y-3">
          <div className="p-4 rounded-[16px] border-[2px] border-foreground bg-card">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sets / Reps</p>
            <p className="font-bold text-foreground text-lg">
              {exercise.sets}
              {exercise.reps ? ` × ${exercise.reps}` : ''}
              {exercise.duration ? ` · ${exercise.duration}` : ''}
            </p>
          </div>
          {exercise.formCues && exercise.formCues.length > 0 && (
            <div className="p-4 rounded-[16px] border-[2px] border-foreground bg-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Form Cues</p>
              <ul className="space-y-1.5">
                {exercise.formCues.map((cue, i) => (
                  <li key={i} className="flex gap-2 text-sm text-foreground">
                    <span className="text-primary font-bold shrink-0">→</span>
                    {cue}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {exercise.progression && (
            <div className="p-4 rounded-[16px] border-[2px] border-foreground bg-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Next Progression</p>
              <p className="font-semibold text-foreground text-sm">{exercise.progression}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="muscles" className="mt-3 space-y-3">
          {exercise.musclesWorked ? (
            <>
              {exercise.musclesWorked.primary.length > 0 && (
                <div className="p-4 rounded-[16px] border-[2px] border-foreground bg-card">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Primary</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exercise.musclesWorked.primary.map((m) => (
                      <Badge key={m} className="bg-primary text-primary-foreground border-[2px] border-foreground text-xs">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {exercise.musclesWorked.secondary.length > 0 && (
                <div className="p-4 rounded-[16px] border-[2px] border-foreground bg-card">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Secondary</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exercise.musclesWorked.secondary.map((m) => (
                      <Badge key={m} variant="outline" className="border-[2px] border-foreground text-xs">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {exercise.musclesWorked.stabilizers.length > 0 && (
                <div className="p-4 rounded-[16px] border-[2px] border-foreground bg-card">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Stabilizers</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exercise.musclesWorked.stabilizers.map((m) => (
                      <Badge key={m} variant="secondary" className="border-[2px] border-border text-xs">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-4 rounded-[16px] border-[2px] border-foreground bg-card">
              <div className="flex flex-wrap gap-1.5">
                {exercise.muscleGroups.map((m) => (
                  <Badge key={m} className="bg-primary text-primary-foreground border-[2px] border-foreground text-xs">
                    {m}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recovery" className="mt-3 space-y-3">
          {exercise.recoveryTime ? (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Muscle', value: exercise.recoveryTime.muscle, color: 'text-green-600' },
                { label: 'Tendon', value: exercise.recoveryTime.tendon, color: 'text-orange-600' },
                { label: 'Nervous', value: exercise.recoveryTime.nervous, color: 'text-blue-600' },
              ].map(({ label, value, color }) => (
                <div key={label} className="p-4 rounded-[16px] border-[2px] border-foreground bg-card text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                  <p className={`font-bold text-sm ${color}`}>{value}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-[16px] border-[2px] border-foreground bg-card">
              <p className="text-sm text-muted-foreground">Allow 24–48h recovery between sessions.</p>
            </div>
          )}
          {exercise.tendonsInvolved && exercise.tendonsInvolved.length > 0 && (
            <div className="p-4 rounded-[16px] border-[2px] border-foreground bg-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Tendons Involved</p>
              <div className="flex flex-wrap gap-1.5">
                {exercise.tendonsInvolved.map((t) => (
                  <Badge key={t} variant="outline" className="text-xs border-[2px] border-orange-300 text-orange-700">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="learn" className="mt-3 space-y-3">
          <p className="text-xs text-muted-foreground px-1">Science-backed principles for mastering this movement:</p>
          {learningPrinciples.slice(0, 4).map((p) => (
            <div key={p.id} className="p-4 rounded-[16px] border-[2px] border-foreground bg-card">
              <p className="font-bold text-sm text-foreground mb-1">{p.title}</p>
              <p className="text-xs text-muted-foreground mb-1">{p.micro_summary}</p>
              <p className="text-xs text-foreground italic">
                {p.how_to_apply_template.replace('{exercise}', exercise.name)}
              </p>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <Button
        onClick={() => onAskCoach(`Tell me about ${exercise.name}`)}
        className="rounded-[16px] border-[2px] border-foreground w-full"
        variant="outline"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        Ask Coach about this
      </Button>
    </div>
  );
};
