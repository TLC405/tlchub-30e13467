import React from "react";
import { APP_WORLD_NAME, APP_WORLD_TAGLINE } from "@/data/controlContent";
import { WorldId } from "@/components/layout/WorldTabBar";
import UpdatesTab from "@/components/UpdatesTab";

interface WorldCard {
  id: WorldId;
  emoji: string;
  title: string;
  description: string;
}

const WORLD_CARDS: WorldCard[] = [
  { id: "train", emoji: "🏋️", title: "Train", description: "Olympic calisthenics mastery. Build your planche, handstand, and rings skills." },
  { id: "watch", emoji: "🛡️", title: "Watch", description: "OKC Safety & community intelligence. Crime maps, scanners, and more." },
  { id: "play", emoji: "🎮", title: "Play", description: "Battle Arena games — Men vs Women campaign, horde mode, leaderboards." },
  { id: "rewind", emoji: "📸", title: "Rewind", description: "AI Photo Time Travel. Choose a decade and watch AI transform your photo." },
  { id: "studio", emoji: "✨", title: "Studio", description: "AI Creative Tools. Character creator, cartoon lab, style transformations." },
  { id: "okc", emoji: "🗺️", title: "OKC", description: "Your City. Local gyms, community resources, Men of Purpose OKC Foundation." },
  { id: "wiki", emoji: "📖", title: "Wiki", description: "Setup guides, how-to docs, and Lovable tips for building TLC WORLD." },
];

const PLACEHOLDER_STATS = [
  { label: "Training Streak", value: "7 days", emoji: "🔥" },
  { label: "Exercises Logged", value: "142", emoji: "📋" },
  { label: "Skills Unlocked", value: "12", emoji: "⭐" },
  { label: "Integrity Sessions", value: "28", emoji: "🧘" },
];

interface HomePageProps {
  onNavigate: (world: WorldId) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="container max-w-3xl mx-auto p-4 pb-8 space-y-6">
      {/* Hero Card */}
      <div className="border-[3px] border-foreground rounded-3xl p-6 bg-card">
        <div className="text-4xl mb-3">🌍</div>
        <h2 className="font-serif text-3xl font-black text-foreground leading-tight mb-2">
          Welcome to {APP_WORLD_NAME}
        </h2>
        <p className="text-sm text-muted-foreground font-medium mb-1">
          {APP_WORLD_TAGLINE}
        </p>
        <p className="text-sm text-foreground/80 leading-relaxed">
          One unified app for training, safety, games, creativity, and community.
          Built by TLC405 — Men of Purpose OKC Foundation.
        </p>
      </div>

      {/* Life Stats */}
      <div>
        <h3 className="font-serif text-lg font-bold text-foreground mb-3 uppercase tracking-wider">
          Life Stats
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {PLACEHOLDER_STATS.map((stat) => (
            <div
              key={stat.label}
              className="border-[3px] border-foreground rounded-2xl p-4 bg-card flex flex-col gap-1"
            >
              <span className="text-2xl">{stat.emoji}</span>
              <span className="text-2xl font-black text-foreground leading-none">
                {stat.value}
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick-Launch Grid */}
      <div>
        <h3 className="font-serif text-lg font-bold text-foreground mb-3 uppercase tracking-wider">
          Worlds
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WORLD_CARDS.map((card) => (
            <div
              key={card.id}
              className="border-[3px] border-foreground rounded-2xl p-4 bg-card flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{card.emoji}</span>
                <span className="font-serif font-black text-foreground text-base">
                  {card.title}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {card.description}
              </p>
              <button
                onClick={() => onNavigate(card.id)}
                className="self-start mt-1 px-3 py-1.5 border-[2px] border-foreground rounded-lg text-xs font-bold tracking-wide uppercase bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Launch →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* What's New */}
      <div>
        <h3 className="font-serif text-lg font-bold text-foreground mb-3 uppercase tracking-wider">
          What's New
        </h3>
        <UpdatesTab />
      </div>
    </div>
  );
};

export default HomePage;
