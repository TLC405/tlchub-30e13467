
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WeatherService } from "@/services/weatherService";
import type { WeatherData } from "@/types";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  MapPin, 
  Thermometer,
  Wind,
  Droplets
} from "lucide-react";

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>("Getting location...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    try {
      const weatherService = WeatherService.getInstance();
      const locationData = await weatherService.getCurrentLocation();
      
      if (locationData) {
        setLocation("Oklahoma City, OK"); // Default to OKC for demo
        const weatherData = await weatherService.getWeatherData(locationData.lat, locationData.lng);
        setWeather(weatherData);
      } else {
        setLocation("Location unavailable");
        const weatherData = await weatherService.getWeatherData();
        setWeather(weatherData);
      }
    } catch (error) {
      console.log("Weather data loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-4 w-4 text-yellow-500" />;
      case 'partly-cloudy':
        return <Cloud className="h-4 w-4 text-blue-400" />;
      case 'cloudy':
        return <Cloud className="h-4 w-4 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-4 w-4 text-blue-600" />;
      default:
        return <Sun className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'fair':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <Card className="bg-card border border-primary">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2">
            <div className="animate-pulse h-4 w-4 bg-primary rounded"></div>
            <span className="text-sm text-muted-foreground">Loading weather...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  const weatherService = WeatherService.getInstance();
  const recommendation = weatherService.getWorkoutRecommendation(weather);

  return (
    <Card className="bg-card border border-primary">
      <CardContent className="p-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs font-medium tactical-font">{location}</span>
            </div>
            <div className="flex items-center space-x-1">
              {getWeatherIcon(weather.condition)}
              <span className="text-sm font-bold">{weather.temperature}°F</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center space-x-1">
              <Thermometer className="h-3 w-3 text-muted-foreground" />
              <span>{weather.temperature}°</span>
            </div>
            <div className="flex items-center space-x-1">
              <Droplets className="h-3 w-3 text-muted-foreground" />
              <span>{weather.humidity}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wind className="h-3 w-3 text-muted-foreground" />
              <span>{weather.windSpeed}mph</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Badge 
              className={`text-xs text-white ${getSuitabilityColor(weather.workoutSuitability)}`}
            >
              {weather.workoutSuitability.toUpperCase()} CONDITIONS
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground italic">{recommendation}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
