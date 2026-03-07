import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { exerciseDatabase } from "@/data/exerciseDatabase";
import { skillPaths } from "@/data/appContent";
import { learningPrinciples } from "@/data/learningPrinciples";
import { MuscleMapViewer } from "@/components/MuscleMap";
import {
  Zap,
  Brain,
  Trophy,
  Heart,
  Users,
  ChevronRight,
  RefreshCw,
  Flame,
} from "lucide-react";

interface DiscoveryFeedProps {
  onNavigate?: (view: string) => void;
}

type CardType = 'exercise-spotlight' | 'learn-bite' | 'skill-milestone' | 'recovery-reminder' | 'community-challenge';

interface DiscoveryCard {
  id: string;
  type: CardType;
  title: string;
  subtitle: string;
  body: string;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
  action?: string;
  actionLabel?: string;
}

const gradients = [
  "from-violet-900 via-purple-800 to-indigo-900",
  "from-rose-900 via-red-800 to-orange-900",
  "from-emerald-900 via-teal-800 to-cyan-900",
  "from-amber-900 via-yellow-800 to-lime-900",
  "from-blue-900 via-indigo-800 to-violet-900",
  "from-pink-900 via-rose-800 to-red-900",
];

function buildCards(): DiscoveryCard[] {
  const cards: DiscoveryCard[] = [];

  // Exercise Spotlight
  const randomExercises = [...exerciseDatabase].sort(() => Math.random() - 0.5).slice(0, 3);
  randomExercises.forEach((ex, i) => {
    cards.push({
      id: `exercise-${ex.id}`,
      type: 'exercise-spotlight',
      title: ex.name,
      subtitle: `${ex.category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} · ${ex.difficulty}`,
      body: ex.description,
      gradient: gradients[i % gradients.length],
      icon: Zap,
      action: `library`,
      actionLabel: "Try it →",
    });
  });

  // Learn Bites
  const principles = learningPrinciples?.slice(0, 2) ?? [];
  principles.forEach((p, i) => {
    cards.push({
      id: `learn-${i}`,
      type: 'learn-bite',
      title: p.title,
      subtitle: "Motor Learning Principle",
      body: p.micro_summary,
      gradient: gradients[(i + 2) % gradients.length],
      icon: Brain,
      action: "learn",
      actionLabel: "Explore →",
    });
  });

  // Skill Milestone
  skillPaths.slice(0, 2).forEach((path, i) => {
    cards.push({
      id: `skill-${path.id}`,
      type: 'skill-milestone',
      title: path.title,
      subtitle: "Skill Path Progress",
      body: path.why,
      gradient: gradients[(i + 4) % gradients.length],
      icon: Trophy,
      action: `skills:${path.skillTreeId ?? ''}`,
      actionLabel: "View Path →",
    });
  });

  // Recovery Reminder
  cards.push({
    id: "recovery-1",
    type: 'recovery-reminder',
    title: "Recovery Reminder",
    subtitle: "Tendons need time",
    body: "After heavy pulling or planche work, tendons need 48-72 hours. Respect recovery — it's where adaptation happens.",
    gradient: "from-teal-900 via-cyan-800 to-emerald-900",
    icon: Heart,
    action: "training",
    actionLabel: "Plan Rest →",
  });

  // Community Challenge
  cards.push({
    id: "challenge-1",
    type: 'community-challenge',
    title: "Weekly Challenge",
    subtitle: "Community · This Week",
    body: "100 Pull-ups this week — any style, any time. Every rep counts. Post your count to keep accountable.",
    gradient: "from-orange-900 via-amber-800 to-yellow-900",
    icon: Users,
    action: "training",
    actionLabel: "Join →",
  });

  // Shuffle
  return cards.sort(() => Math.random() - 0.5);
}

function ExerciseSpotlightCard({ card, onNavigate }: { card: DiscoveryCard; onNavigate?: (v: string) => void }) {
  const exercise = exerciseDatabase.find((e) => card.id === `exercise-${e.id}`);
  return (
    <div className={`bg-gradient-to-br ${card.gradient} rounded-[24px] p-5 text-white min-h-[280px] flex flex-col justify-between`}>
      <div className="flex items-start justify-between">
        <div>
          <Badge className="bg-white/20 text-white border-white/30 text-[10px] mb-2">Exercise Spotlight</Badge>
          <h2 className="text-xl font-black leading-tight">{card.title}</h2>
          <p className="text-white/70 text-xs mt-1">{card.subtitle}</p>
        </div>
        {exercise?.musclesWorked && (
          <div className="opacity-90">
            <MuscleMapViewer
              activeMuscles={exercise.musclesWorked}
              compact
            />
          </div>
        )}
      </div>
      <div>
        <p className="text-white/80 text-sm leading-relaxed mb-3">{card.body}</p>
        {card.action && (
          <Button
            size="sm"
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 rounded-full text-xs"
            onClick={() => onNavigate?.(card.action!)}
          >
            {card.actionLabel} <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}

function GenericCard({ card, onNavigate }: { card: DiscoveryCard; onNavigate?: (v: string) => void }) {
  const Icon = card.icon;
  return (
    <div className={`bg-gradient-to-br ${card.gradient} rounded-[24px] p-5 text-white min-h-[220px] flex flex-col justify-between`}>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-[10px] bg-white/20 flex items-center justify-center">
            <Icon className="h-4 w-4" />
          </div>
          <Badge className="bg-white/20 text-white border-white/30 text-[10px]">
            {card.subtitle}
          </Badge>
        </div>
        <h2 className="text-xl font-black leading-tight mb-2">{card.title}</h2>
        <p className="text-white/80 text-sm leading-relaxed">{card.body}</p>
      </div>
      {card.action && (
        <Button
          size="sm"
          variant="outline"
          className="mt-3 border-white/40 text-white hover:bg-white/10 rounded-full text-xs w-fit"
          onClick={() => onNavigate?.(card.action!)}
        >
          {card.actionLabel} <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      )}
    </div>
  );
}

export default function DiscoveryFeed({ onNavigate }: DiscoveryFeedProps) {
  const [cards, setCards] = useState<DiscoveryCard[]>([]);

  useEffect(() => {
    setCards(buildCards());
  }, []);

  const refresh = () => setCards(buildCards());

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-black text-foreground tracking-tight">Discover</h1>
          <p className="text-xs text-muted-foreground">Fresh content every refresh</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-[2px] border-foreground rounded-[12px] gap-1"
          onClick={refresh}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span className="text-xs">Refresh</span>
        </Button>
      </div>

      {/* Cards */}
      <div className="space-y-4 page-enter">
        {cards.map((card) => (
          <div key={card.id} className="discovery-card">
            {card.type === 'exercise-spotlight' ? (
              <ExerciseSpotlightCard card={card} onNavigate={onNavigate} />
            ) : (
              <GenericCard card={card} onNavigate={onNavigate} />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-[10px] text-muted-foreground">
          <Flame className="h-3 w-3 inline mr-1 text-primary" />
          Powered by TLC · Every rep is an act of self-care
        </p>
      </div>
    </div>
  );
}
