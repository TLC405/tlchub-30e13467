import React, { useState } from 'react';
import { skillProgressions } from '@/data/skillProgressions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface SkillTreeCanvasProps {
  selectedTreeId?: string;
  onSelectTree: (id: string | undefined) => void;
  onAskCoach: (msg: string) => void;
}

const LEVEL_COLOR: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800 border-green-300',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  advanced: 'bg-orange-100 text-orange-800 border-orange-300',
  elite: 'bg-red-100 text-red-800 border-red-300',
};

export const SkillTreeCanvas: React.FC<SkillTreeCanvasProps> = ({
  selectedTreeId,
  onSelectTree,
  onAskCoach,
}) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const activeTree = skillProgressions.find((t) => t.id === selectedTreeId) ?? skillProgressions[0];

  return (
    <div className="p-4 h-full flex flex-col gap-4 overflow-auto">
      {/* Tree selector */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Select Skill</p>
        <div className="flex flex-wrap gap-2">
          {skillProgressions.map((tree) => (
            <button
              key={tree.id}
              onClick={() => onSelectTree(tree.id)}
              className={`px-3 py-1.5 rounded-[12px] text-xs font-bold border-[2px] transition-colors ${
                activeTree.id === tree.id
                  ? 'border-foreground bg-primary text-primary-foreground'
                  : 'border-foreground bg-card text-foreground hover:bg-primary/10'
              }`}
            >
              {tree.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tree info */}
      <div className="p-4 rounded-[16px] border-[3px] border-foreground bg-card">
        <h2 className="font-serif text-xl font-black text-foreground">{activeTree.name}</h2>
        <p className="text-xs text-muted-foreground mt-1">{activeTree.description}</p>
        <p className="text-xs font-bold text-primary mt-2">🎯 Elite Goal: {activeTree.eliteGoal}</p>
      </div>

      {/* Progression steps */}
      <ScrollArea className="flex-1">
        <div className="relative pr-2">
          {/* Vertical line */}
          <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-border z-0" />

          <div className="flex flex-col gap-3">
            {activeTree.progressions.map((step, index) => {
              const isExpanded = expandedStep === step.id;
              return (
                <div key={step.id} className="relative z-10 pl-12">
                  {/* Step number dot */}
                  <div className="absolute left-3.5 top-4 w-3 h-3 rounded-full border-[2px] border-foreground bg-card z-10" />

                  <div className="p-4 rounded-[16px] border-[2px] border-foreground bg-card">
                    {/* Step header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] text-muted-foreground font-semibold">
                            Step {index + 1}
                          </span>
                          <Badge className={`border text-[10px] ${LEVEL_COLOR[step.level]}`}>
                            {step.level}
                          </Badge>
                        </div>
                        <p className="font-bold text-sm text-foreground mt-0.5">{step.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {step.sets} sets × {step.reps}
                          {step.holdTime ? ` · hold ${step.holdTime}` : ''}
                          {` · ~${step.estimatedWeeksToMaster}w`}
                        </p>
                      </div>
                      <button
                        onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                        className="text-muted-foreground hover:text-foreground mt-1"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="mt-3 space-y-2 border-t border-border pt-3">
                        <p className="text-xs text-muted-foreground">{step.description}</p>

                        {step.formCues.length > 0 && (
                          <div>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-1">Form Cues</p>
                            <ul className="space-y-1">
                              {step.formCues.map((cue, i) => (
                                <li key={i} className="text-xs text-foreground flex gap-1.5">
                                  <span className="text-primary">→</span>{cue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {step.commonMistakes.length > 0 && (
                          <div>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-1">Common Mistakes</p>
                            <ul className="space-y-1">
                              {step.commonMistakes.map((m, i) => (
                                <li key={i} className="text-xs text-foreground flex gap-1.5">
                                  <span className="text-red-500">✕</span>{m}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAskCoach(`Tell me about ${step.name} in ${activeTree.name}`)}
                          className="rounded-[12px] border-[2px] border-foreground text-xs h-7 mt-1"
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Ask Coach
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
