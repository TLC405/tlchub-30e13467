import Header from "@/components/Header";
import TrainingPillar from "@/components/TrainingPillar";
import WeeklyPlan from "@/components/WeeklyPlan";
import SkillShowcase from "@/components/SkillShowcase";
import { Zap, Dumbbell, ArrowUp, CircleDot } from "lucide-react";

const Index = () => {
  const trainingPillars = [
    {
      title: "Handstand",
      icon: <Zap className="h-6 w-6 text-primary-foreground" />,
      description: "Balance & Core Mastery",
      color: "handstand" as const,
      progress: 65,
      exercises: [
        { name: "Wall Handstand Hold", target: "3×20–30s", level: "Beginner" as const },
        { name: "Tuck Handstand Hold", target: "3×10–15s", level: "Intermediate" as const },
        { name: "Freestanding Handstand", target: "3×10–60s", level: "Advanced" as const },
      ]
    },
    {
      title: "Planche & Parallettes",
      icon: <Dumbbell className="h-6 w-6 text-primary-foreground" />,
      description: "Strength & Control",
      color: "planche" as const,
      progress: 45,
      exercises: [
        { name: "Planche Leans", target: "3×10–20s", level: "Beginner" as const },
        { name: "Tuck Planche Hold", target: "3×10–15s", level: "Intermediate" as const },
        { name: "Straddle Planche", target: "3×5–10s", level: "Advanced" as const },
      ]
    },
    {
      title: "Pull-Up Progressions",
      icon: <ArrowUp className="h-6 w-6 text-primary-foreground" />,
      description: "Upper Body Power",
      color: "pullup" as const,
      progress: 75,
      exercises: [
        { name: "Australian Rows", target: "3×10–15 reps", level: "Beginner" as const },
        { name: "Archer Pull-Ups", target: "3×3–5 each", level: "Intermediate" as const },
        { name: "Weighted Pull-Ups", target: "4×5 (with weight)", level: "Advanced" as const },
      ]
    },
    {
      title: "Rings",
      icon: <CircleDot className="h-6 w-6 text-primary-foreground" />,
      description: "Gymnastic Excellence",
      color: "rings" as const,
      progress: 30,
      exercises: [
        { name: "Ring Support Hold", target: "3×10–20s", level: "Beginner" as const },
        { name: "Ring Dips", target: "3×6–10 reps", level: "Intermediate" as const },
        { name: "Ring Muscle-Up", target: "3×3–5 reps", level: "Advanced" as const },
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gold-light via-bronze to-gold-dark bg-clip-text text-transparent">
            Master Calisthenics
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium skeuomorphic training experience with structured progressions for handstand, planche, pull-ups, and rings mastery.
          </p>
        </section>

        {/* Weekly Plan */}
        <WeeklyPlan />

        {/* Training Pillars */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-card-foreground">Training Pillars</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trainingPillars.map((pillar, index) => (
              <TrainingPillar key={index} {...pillar} />
            ))}
          </div>
        </section>

        {/* Skill Showcase */}
        <SkillShowcase />
      </main>
    </div>
  );
};

export default Index;
