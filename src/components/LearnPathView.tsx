import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillPaths, comingSoon, APP_PHILOSOPHY, APP_POWERED_BY, APP_FOUNDATION, APP_SOCIAL_HANDLE, STACKED_LAWS } from "@/data/controlContent";
import { NonNegotiables } from "./NonNegotiables";
import { ChevronRight, Lock, BookOpen, Shield } from "lucide-react";

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

      {/* STACKED Laws */}
      <Card className="border-[3px] border-foreground rounded-[24px]">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif text-lg font-bold flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5" />
            STACKED Laws
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {STACKED_LAWS.map((law, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">{i + 1}.</span>
                {law}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Skill Paths — all 9 */}
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
              {/* Gates */}
              <div className="flex flex-wrap gap-2">
                {path.gates.map((gate, i) => {
                  const level = gate.split(":")[0];
                  const isElite = i >= 4;
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

      {/* Coming Soon */}
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

      <p className="text-[10px] text-center text-primary font-semibold">{APP_POWERED_BY} · {APP_SOCIAL_HANDLE}</p>
      <p className="text-[9px] text-center text-muted-foreground">{APP_FOUNDATION}</p>
    </div>
  );
};

export default LearnPathView;
