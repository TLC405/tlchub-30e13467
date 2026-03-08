import { Dumbbell, Heart, Sword, Mountain, Waves, Flame, Users, Music, TreePine, Target } from "lucide-react";

const recommendations = [
  { label: "Calisthenics Park", icon: Dumbbell, query: "calisthenics park" },
  { label: "CrossFit Box", icon: Flame, query: "crossfit" },
  { label: "Yoga Studio", icon: Heart, query: "yoga studio" },
  { label: "Boxing Gym", icon: Sword, query: "boxing gym" },
  { label: "Climbing Wall", icon: Mountain, query: "climbing gym" },
  { label: "Swimming Pool", icon: Waves, query: "swimming pool" },
  { label: "Dance Studio", icon: Music, query: "dance studio" },
  { label: "Open Gym", icon: TreePine, query: "open gym" },
  { label: "Group Classes", icon: Users, query: "group fitness" },
  { label: "Martial Arts", icon: Target, query: "martial arts" },
];

interface FitnessRecommendationsProps {
  onSelect: (query: string) => void;
  activeQuery?: string;
}

const FitnessRecommendations = ({ onSelect, activeQuery }: FitnessRecommendationsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {recommendations.map((rec) => (
        <button
          key={rec.label}
          onClick={() => onSelect(activeQuery === rec.query ? "" : rec.query)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full border-2 transition-all whitespace-nowrap text-xs font-bold shrink-0 ${
            activeQuery === rec.query
              ? "border-primary bg-primary/10 text-primary"
              : "border-foreground/20 text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          <rec.icon className="h-3.5 w-3.5" />
          {rec.label}
        </button>
      ))}
    </div>
  );
};

export default FitnessRecommendations;
