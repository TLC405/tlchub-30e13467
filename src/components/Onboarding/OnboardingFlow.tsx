import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MuscleMapViewer } from "@/components/MuscleMap";
import { APP_NAME, APP_TAGLINE, stackedWeek } from "@/data/appContent";
import { ChevronRight, Heart, Zap, Activity, Leaf, Star } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
}

type FocusArea = 'calisthenics' | 'yoga-mobility' | 'endurance' | 'longevity' | 'all';

interface UserProfile {
  focusAreas: FocusArea[];
  weakMuscles: string[];
  firstDay: string;
}

const focusCards: { id: FocusArea; label: string; emoji: string; description: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'calisthenics', label: 'Calisthenics Skills', emoji: '🤸', description: 'Handstand, Planche, Rings, Muscle-Up', icon: Zap },
  { id: 'yoga-mobility', label: 'Yoga & Mobility', emoji: '🧘', description: 'Flow, Flexibility, Corrective work', icon: Heart },
  { id: 'endurance', label: 'Endurance', emoji: '🔥', description: 'Tabata, EMOM, Conditioning', icon: Activity },
  { id: 'longevity', label: 'Longevity', emoji: '🌿', description: 'Recovery, Breathwork, Zone 2', icon: Leaf },
  { id: 'all', label: 'All of the Above', emoji: '⭐', description: 'Full-spectrum training', icon: Star },
];

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    focusAreas: [],
    weakMuscles: [],
    firstDay: stackedWeek[0]?.id ?? "day-a",
  });

  const toggleFocus = (id: FocusArea) => {
    if (id === 'all') {
      setProfile((p) => ({ ...p, focusAreas: p.focusAreas.includes('all') ? [] : ['all'] }));
      return;
    }
    setProfile((p) => {
      const filtered = p.focusAreas.filter((f) => f !== 'all');
      return {
        ...p,
        focusAreas: filtered.includes(id) ? filtered.filter((f) => f !== id) : [...filtered, id],
      };
    });
  };

  const toggleMuscle = (id: string) => {
    setProfile((p) => ({
      ...p,
      weakMuscles: p.weakMuscles.includes(id)
        ? p.weakMuscles.filter((m) => m !== id)
        : [...p.weakMuscles, id],
    }));
  };

  const handleComplete = () => {
    localStorage.setItem('tlc_user_profile', JSON.stringify(profile));
    onComplete();
  };

  const weakHighlights = profile.weakMuscles.length > 0
    ? { primary: profile.weakMuscles, secondary: [], stabilizers: [] }
    : undefined;

  const firstDay = stackedWeek[0];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-black text-foreground tracking-tight">{APP_NAME}</h1>
          <p className="text-xs text-primary font-bold tracking-widest uppercase mt-1">{APP_TAGLINE}</p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-2 rounded-full transition-all ${s === step ? 'w-6 bg-primary' : s < step ? 'w-2 bg-primary/50' : 'w-2 bg-muted'}`} />
          ))}
        </div>

        {/* ── STEP 1 ─────────────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-4 page-enter">
            <div className="text-center">
              <h2 className="font-serif text-2xl font-black text-foreground">What brings you here?</h2>
              <p className="text-sm text-muted-foreground mt-1">Choose what you want to focus on</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {focusCards.map((card) => {
                const Icon = card.icon;
                const selected = profile.focusAreas.includes(card.id);
                return (
                  <button
                    key={card.id}
                    onClick={() => toggleFocus(card.id)}
                    className={`flex items-center gap-4 p-4 rounded-[20px] border-[3px] text-left transition-all ${
                      selected
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-foreground/40 text-foreground'
                    }`}
                  >
                    <span className="text-2xl">{card.emoji}</span>
                    <div>
                      <p className="font-bold text-sm">{card.label}</p>
                      <p className="text-xs text-muted-foreground">{card.description}</p>
                    </div>
                    {selected && <div className="ml-auto h-4 w-4 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </div>
            <Button
              className="w-full rounded-[16px] h-12 font-bold"
              disabled={profile.focusAreas.length === 0}
              onClick={() => setStep(2)}
            >
              Continue <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* ── STEP 2 ─────────────────────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-4 page-enter">
            <div className="text-center">
              <h2 className="font-serif text-2xl font-black text-foreground">Where are you at?</h2>
              <p className="text-sm text-muted-foreground mt-1">Tap muscle groups that feel weak or tight</p>
            </div>
            <div className="flex justify-center">
              <MuscleMapViewer
                activeMuscles={weakHighlights}
                onMuscleClick={toggleMuscle}
                compact={false}
              />
            </div>
            {profile.weakMuscles.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {profile.weakMuscles.map((m) => (
                  <Badge key={m} variant="outline" className="rounded-full text-xs border-primary text-primary">
                    {m.replace(/-/g, ' ')}
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 rounded-[16px] border-[2px] border-foreground" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1 rounded-[16px] font-bold" onClick={() => setStep(3)}>
                Continue <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ─────────────────────────────────────────────────────── */}
        {step === 3 && firstDay && (
          <div className="space-y-4 page-enter">
            <div className="text-center">
              <h2 className="font-serif text-2xl font-black text-foreground">Your first training day</h2>
              <p className="text-sm text-muted-foreground mt-1">Auto-generated based on your focus</p>
            </div>
            <div className="border-[3px] border-foreground rounded-[24px] p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-[14px] border-[3px] border-foreground bg-primary/10 flex items-center justify-center">
                  <span className="text-xl">{firstDay.icon === 'Dumbbell' ? '🏋️' : firstDay.icon === 'ArrowUp' ? '💪' : '⚡'}</span>
                </div>
                <div>
                  <p className="font-black text-foreground font-serif">{firstDay.label} — {firstDay.title}</p>
                  <p className="text-xs text-muted-foreground">{firstDay.emphasis}</p>
                </div>
              </div>
              <div className="space-y-2">
                {firstDay.blocks.map((block, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 rounded-full border-[2px] border-foreground/30 flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                      {i + 1}
                    </div>
                    <span className="text-foreground">{block.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground italic">
                "Every rep is an act of self-care."
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 rounded-[16px] border-[2px] border-foreground" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button className="flex-1 rounded-[16px] h-12 font-bold text-base" onClick={handleComplete}>
                Begin Training 🏋️
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
