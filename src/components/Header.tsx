import { Trophy, Target, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-card-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 primary-gradient rounded-lg flex items-center justify-center gold-shadow">
            <Trophy className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gold-light to-bronze bg-clip-text text-transparent">
              Tender Loving Care
            </h1>
            <p className="text-xs text-muted-foreground">Elite Bodyweight Training</p>
          </div>
        </div>
        
        <nav className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hover:bg-card-secondary">
            <Target className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-card-secondary">
            <Calendar className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-card-secondary">
            <User className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;