import { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => console.error("Error fetching location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (location) {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}`;

      axios
        .get(API_URL)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => console.error("Error fetching weather:", error));
    }
  }, [location, API_KEY]);

  const getWeatherIcon = (condition) => {
    const icons = {
      Clear: "☀️",
      Clouds: "☁️",
      Rain: "🌧️",
      Drizzle: "🌦️",
      Thunderstorm: "⛈️",
      Snow: "❄️",
      Mist: "🌫️",
      Fog: "🌫️",
      Haze: "🌁",
      Smoke: "💨",
      Dust: "🌪️",
      Sand: "🏜️",
      Ash: "🌋",
      Squall: "🌬️",
      Tornado: "🌪️",
    };

    return icons[condition] || "🌍"; // Default icon if condition is not mapped
  };

  return (
    <div className="weather-widget">
      {weather ? (
        <p>
          {getWeatherIcon(weather.weather[0].main)} {weather.main.temp}°C,{" "}
          {weather.weather[0].main} ({weather.name})
        </p>
      ) : (
        <p>Fetching location & weather...</p>
      )}
    </div>
  );
};

export default Weather;
