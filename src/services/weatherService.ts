
import type { WeatherData } from "@/types";

export class WeatherService {
  private static instance: WeatherService;
  private apiKey = 'demo-key'; // In production, use environment variable

  static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  async getCurrentLocation(): Promise<{ lat: number; lng: number } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => resolve(null),
        { timeout: 5000 }
      );
    });
  }

  async getWeatherData(lat?: number, lng?: number): Promise<WeatherData> {
    // Mock weather data for demo - replace with real API call
    const mockWeatherData: WeatherData = {
      temperature: Math.floor(Math.random() * 30) + 60, // 60-90°F
      condition: ['sunny', 'partly-cloudy', 'cloudy', 'rainy'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 mph
      workoutSuitability: 'good'
    };

    // Calculate workout suitability
    if (mockWeatherData.temperature > 85 || mockWeatherData.temperature < 45) {
      mockWeatherData.workoutSuitability = 'fair';
    } else if (mockWeatherData.condition === 'rainy') {
      mockWeatherData.workoutSuitability = 'poor';
    } else if (mockWeatherData.condition === 'sunny' && mockWeatherData.temperature > 65 && mockWeatherData.temperature < 80) {
      mockWeatherData.workoutSuitability = 'excellent';
    }

    return mockWeatherData;
  }

  getWorkoutRecommendation(weather: WeatherData): string {
    switch (weather.workoutSuitability) {
      case 'excellent':
        return 'Perfect weather for outdoor handstand training! 🌟';
      case 'good':
        return 'Good conditions for outdoor workouts 👍';
      case 'fair':
        return 'Consider indoor training or shorter sessions ⚠️';
      case 'poor':
        return 'Indoor training recommended today 🏠';
      default:
        return 'Check conditions before heading out';
    }
  }
}
