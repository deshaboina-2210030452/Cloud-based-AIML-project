import React, { useState } from "react";
import "../styles.css";
const WeatherCard = ({ onWeatherData }) => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  // Weather icon mapping
  const weatherIcons = {
    Clouds: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
    Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    Rain: "https://cdn-icons-png.flaticon.com/512/175/175958.png",
    Mist: "https://cdn-icons-png.flaticon.com/512/4827/4827312.png",
    Drizzle: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    Snow: "https://cdn-icons-png.flaticon.com/512/2315/2315377.png",
    default: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    try {
      const apiKey = "570abe843322059729fddf467b5fb19a";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }

      const weatherInfo = {
        type: data.weather[0].main,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        name: data.name,
      };

      setWeatherData(weatherInfo);
      onWeatherData(weatherInfo);
    } catch (error) {
      alert("Failed to fetch weather data!");
      console.error("Error fetching weather data:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="weather-card">
      <div className="search-bar">
        <input
          type="text"
          className="input-box"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="search-bg" onClick={handleSearch}>
          🔍
        </button>
      </div>

      {weatherData && (
        <div className="weather-display">
          <div className="weather-icon-container">
            <img
              src={weatherIcons[weatherData.type] || weatherIcons.default}
              alt="weather"
              className="weather-icon"
            />
            <div>
              <h2>{weatherData.type}</h2>
            </div>
          </div>

          <div>
          
            <h1>{weatherData.temp}°C</h1>
            <h3>{weatherData.name}</h3>
          </div>

          <div className="weather-details">
            <div className="info-display">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1113/1113754.png"
                alt="humidity"
                className="weather-info-icon"
              />
              <div>
                <h3>{weatherData.humidity}%</h3>
                <p>Humidity</p>
              </div>
            </div>

            <div className="info-display">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3447/3447710.png"
                alt="wind"
                className="weather-info-icon"
              />
              <div>
                <h3>{weatherData.windSpeed} km/h</h3>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
