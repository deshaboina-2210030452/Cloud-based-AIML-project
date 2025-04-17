import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import WeatherForm from "./components/WeatherForm";
import WeatherTable from "./components/WeatherTable";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial setup when component mounts
    setIsLoading(false);
  }, []);

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  if (isLoading) {
    return (
      <div className="bg-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-container">
      {/* WeatherCard is mounted first and always visible */}
      <WeatherCard onWeatherData={handleWeatherData} />

      {/* WeatherForm is conditionally rendered only when we have weather data */}
      {weatherData && <WeatherForm weatherData={weatherData} />}

      {/* WeatherTable is mounted last */}
      <WeatherTable />
    </div>
  );
}

export default App;
