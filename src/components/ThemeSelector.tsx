
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./ThemeProvider";
import { Palette, Sun, Moon, Palmtree, Dumbbell } from "lucide-react";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      value: 'light',
      label: 'Light Mode',
      description: 'Clean and bright interface',
      icon: Sun,
      preview: 'bg-gradient-to-br from-white to-gray-100'
    },
    {
      value: 'dark',
      label: 'Dark Mode',
      description: 'Easy on the eyes',
      icon: Moon,
      preview: 'bg-gradient-to-br from-gray-900 to-black'
    },
    {
      value: 'vacation',
      label: 'Vacation Vibes',
      description: 'Tropical beach aesthetics',
      icon: Palmtree,
      preview: 'bg-gradient-to-br from-cyan-200 via-blue-300 to-orange-200'
    },
    {
      value: 'vasa-gym',
      label: 'Vasa Gym',
      description: 'Professional gym environment',
      icon: Dumbbell,
      preview: 'bg-gradient-to-br from-red-600 via-orange-500 to-gray-800'
    }
  ];

  const currentTheme = themes.find(t => t.value === theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {currentTheme?.icon && <currentTheme.icon className="h-4 w-4" />}
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2 space-y-2">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            return (
              <DropdownMenuItem
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value as any)}
                className="cursor-pointer p-0"
              >
                <Card className={`w-full border-2 transition-all ${
                  theme === themeOption.value 
                    ? 'border-primary shadow-md' 
                    : 'border-transparent hover:border-border'
                }`}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg ${themeOption.preview} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white drop-shadow-lg" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{themeOption.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {themeOption.description}
                        </div>
                      </div>
                      {theme === themeOption.value && (
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
