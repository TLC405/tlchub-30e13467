
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Droplets,
  MapPin,
  RefreshCw,
  Activity,
  Clock,
  Eye
} from "lucide-react";

interface WeatherData {
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  uvIndex: number;
  location: string;
  workoutSuitability: string;
  workoutScore: number;
}

const DetailedWeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="h-6 w-6 text-warning" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-muted-foreground" />;
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-info" />;
      default:
        return <Sun className="h-6 w-6 text-warning" />;
    }
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 80) return 'bg-success text-success-foreground';
    if (score >= 60) return 'bg-warning text-warning-foreground';
    if (score >= 40) return 'bg-secondary text-secondary-foreground';
    return 'bg-destructive text-destructive-foreground';
  };

  const refreshWeather = () => {
    setLoading(true);
    // In a real app, this would call a weather API
    setTimeout(() => {
      setWeather({
        temperature: 72,
        feelsLike: 75,
        condition: "sunny",
        humidity: 45,
        windSpeed: 8,
        visibility: 10,
        uvIndex: 6,
        location: "Chicago, IL",
        workoutSuitability: "Excellent",
        workoutScore: 88
      });
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    refreshWeather();
  }, []);

  return (
    <Card className="bg-card border border-primary premium-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-foreground flex items-center gap-2 font-serif">
            <MapPin className="h-4 w-4 text-primary" />
            Weather Conditions
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshWeather}
            disabled={loading}
            className="h-8 w-8 p-0 hover:bg-primary/20"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        {!weather ? (
          <div className="text-center py-8">
            <div className="text-muted-foreground">Loading weather data...</div>
          </div>
        ) : (
          <>
        {/* Main Weather Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              {getWeatherIcon(weather.condition)}
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse"></div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground font-mono">
                {weather?.temperature}°F
              </div>
              <div className="text-sm text-muted-foreground capitalize font-medium">
                {weather?.condition}
              </div>
              <div className="text-xs text-muted-foreground">
                Feels like {weather?.feelsLike}°F
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <Badge className={`${getSuitabilityColor(weather?.workoutScore || 0)} font-bold text-xs mb-2`}>
              {weather?.workoutSuitability.toUpperCase()}
            </Badge>
            <div className="text-xs text-muted-foreground">
              Workout Score
            </div>
            <div className="text-lg font-bold text-foreground font-mono">
              {weather?.workoutScore}/100
            </div>
          </div>
        </div>

        {/* Workout Score Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground font-medium">Workout Suitability</span>
            <span className="text-foreground font-bold">{weather?.workoutScore}%</span>
          </div>
          <Progress value={weather?.workoutScore || 0} className="h-2" />
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-background rounded-lg border border-border">
            <Droplets className="h-4 w-4 mx-auto mb-1 text-info" />
            <div className="text-xs text-muted-foreground mb-1">Humidity</div>
            <div className="text-sm font-bold text-foreground font-mono">{weather?.humidity}%</div>
          </div>
          
          <div className="text-center p-2 bg-background rounded-lg border border-border">
            <Wind className="h-4 w-4 mx-auto mb-1 text-primary" />
            <div className="text-xs text-muted-foreground mb-1">Wind</div>
            <div className="text-sm font-bold text-foreground font-mono">{weather?.windSpeed} mph</div>
          </div>
          
          <div className="text-center p-2 bg-background rounded-lg border border-border">
            <Eye className="h-4 w-4 mx-auto mb-1 text-accent" />
            <div className="text-xs text-muted-foreground mb-1">Visibility</div>
            <div className="text-sm font-bold text-foreground font-mono">{weather?.visibility} mi</div>
          </div>
        </div>

        {/* Workout Recommendation */}
        <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-foreground uppercase tracking-wider">
              Workout Recommendation
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {(weather?.workoutScore || 0) >= 80 
              ? "Perfect conditions for outdoor calisthenics. Optimal temperature and low wind make this ideal for handstand practice and dynamic movements."
              : (weather?.workoutScore || 0) >= 60
              ? "Good conditions for moderate outdoor training. Consider indoor alternatives for intensive sessions."
              : "Indoor training recommended. Focus on mobility and skill work in controlled environment."}
          </p>
        </div>

        {/* Location & Time */}
        <div className="flex justify-between items-center text-xs text-muted-foreground border-t border-border pt-3">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="font-medium">{weather?.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Updated {new Date().toLocaleTimeString('en-US', {
              timeZone: 'America/Chicago',
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true
            })}</span>
          </div>
        </div>
        </>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailedWeatherWidget;
