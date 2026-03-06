import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillPaths, comingSoon, APP_PHILOSOPHY } from "@/data/controlContent";
import { NonNegotiables } from "./NonNegotiables";
import { ChevronRight, Lock, BookOpen } from "lucide-react";

interface LearnPathViewProps {
  onNavigate: (view: string) => void;
}

const LearnPathView = ({ onNavigate }: LearnPathViewProps) => {
  return (
    <div className="space-y-6">
      {/* Philosophy */}
      <div className="text-center py-6 space-y-2">
        <h1 className="font-serif text-3xl font-black text-foreground tracking-tight">
          Choose Your Path
        </h1>
        <p className="text-sm text-muted-foreground font-serif italic max-w-md mx-auto">
          "{APP_PHILOSOPHY}"
        </p>
      </div>

      <NonNegotiables compact />

      {/* Skill Paths */}
      <div className="space-y-4 stagger-children">
        {skillPaths.map((path) => (
          <Card
            key={path.id}
            className="border-[3px] border-foreground rounded-[24px] hover:bg-muted/30 transition-colors cursor-pointer card-lift"
            onClick={() =>
              path.skillTreeId
                ? onNavigate(`skills:${path.skillTreeId}`)
                : onNavigate("skills")
            }
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="font-serif text-lg font-bold text-foreground blueprint-underline">
                  {path.title}
                </CardTitle>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{path.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Gates with L1-L4 badges */}
              <div className="flex flex-wrap gap-2">
                {path.gates.map((gate, i) => {
                  const level = `L${i + 1}`;
                  const isElite = i === 3;
                  return (
                    <Badge
                      key={i}
                      variant="outline"
                      className={`text-xs border-[2px] rounded-full font-mono ${
                        isElite
                          ? "border-dashed border-destructive/40 text-muted-foreground"
                          : "border-foreground/30"
                      }`}
                    >
                      <span className="font-bold mr-1">{level}</span>
                      {gate.replace(/^L\d:\s*/, "")}
                    </Badge>
                  );
                })}
              </div>

              {/* Why */}
              <div className="bg-muted/50 rounded-[16px] p-3 border border-border">
                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">{path.why}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coming Soon — individual cards */}
      <div className="space-y-3 stagger-children">
        <h2 className="font-serif text-lg font-bold text-muted-foreground text-center">
          Coming Soon
        </h2>
        {comingSoon.map((item) => (
          <Card
            key={item.title}
            className="border-[3px] border-dashed border-muted-foreground/30 rounded-[24px] opacity-70 card-lift"
          >
            <CardContent className="py-5 px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-serif font-bold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="outline" className="text-[10px] border-dashed border-destructive/40 rounded-full font-mono">
                    {item.level}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground font-mono">{item.eta}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearnPathView;
