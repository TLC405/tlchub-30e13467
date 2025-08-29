
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Cloud, CloudRain, Thermometer, Wind, Droplets } from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
}

const CompactWeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 22,
    condition: "sunny",
    humidity: 65,
    windSpeed: 8,
    location: "Your Location"
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="h-4 w-4 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-4 w-4 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-4 w-4 text-blue-500" />;
      default:
        return <Sun className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getWorkoutSuitability = () => {
    if (weather.temperature >= 15 && weather.temperature <= 25 && weather.condition !== "rainy") {
      return { status: "Excellent", color: "success" };
    } else if (weather.temperature >= 10 && weather.temperature <= 30) {
      return { status: "Good", color: "warning" };
    } else {
      return { status: "Indoor", color: "destructive" };
    }
  };

  const suitability = getWorkoutSuitability();

  return (
    <Card className="bg-card border border-border">
      <CardContent className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="text-sm font-semibold text-foreground">
                {weather.temperature}°C
              </div>
              <div className="text-xs text-muted-foreground">
                {weather.condition}
              </div>
            </div>
          </div>
          <Badge 
            variant={suitability.color === "success" ? "default" : suitability.color === "warning" ? "secondary" : "destructive"}
            className="text-xs"
          >
            {suitability.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactWeatherWidget;
