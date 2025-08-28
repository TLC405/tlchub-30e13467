
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Droplets,
  MapPin,
  RefreshCw
} from "lucide-react";
import { WeatherService } from "@/services/weatherService";
import type { WeatherData } from "@/types";

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>("Current Location");
  const [loading, setLoading] = useState(false);
  const weatherService = WeatherService.getInstance();

  const loadWeatherData = async () => {
    setLoading(true);
    try {
      const data = await weatherService.getWeatherData();
      setWeather(data);
    } catch (error) {
      console.error('Failed to load weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="h-5 w-5 text-warning" />;
      case 'cloudy':
      case 'overcast':
        return <Cloud className="h-5 w-5 text-muted-foreground" />;
      case 'rainy':
      case 'rain':
        return <CloudRain className="h-5 w-5 text-info" />;
      default:
        return <Sun className="h-5 w-5 text-warning" />;
    }
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'excellent': return 'success-gradient';
      case 'good': return 'info-gradient';
      case 'fair': return 'warning-gradient';
      case 'poor': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  if (!weather) {
    return (
      <Card className="clean-border premium-shadow bg-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-center h-24">
            <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="clean-border premium-shadow bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Weather Conditions
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadWeatherData}
            disabled={loading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Main Weather Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getWeatherIcon(weather.condition)}
              <div>
                <p className="text-2xl font-bold text-foreground">{weather.temperature}°F</p>
                <p className="text-sm text-muted-foreground capitalize">{weather.condition}</p>
              </div>
            </div>
            
            <Badge className={`${getSuitabilityColor(weather.workoutSuitability)} text-white`}>
              {weather.workoutSuitability.toUpperCase()}
            </Badge>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-info" />
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="text-sm font-medium text-foreground">{weather.humidity}%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Wind Speed</p>
                <p className="text-sm font-medium text-foreground">{weather.windSpeed} mph</p>
              </div>
            </div>
          </div>

          {/* Workout Recommendation */}
          <div className="bg-background-secondary p-3 rounded-lg clean-border">
            <p className="text-xs font-medium text-foreground mb-1">Workout Recommendation:</p>
            <p className="text-xs text-muted-foreground">
              {weatherService.getWorkoutRecommendation(weather)}
            </p>
          </div>

          {/* Location Info */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">📍 Oklahoma City Area</p>
            <p className="text-xs text-muted-foreground mt-1">Vasa Trainer Available at Local Facility</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
