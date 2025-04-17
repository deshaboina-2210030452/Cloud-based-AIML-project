import React, { useState } from "react";
import axios from "axios";

const WeatherForm = ({ weatherData }) => {
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      city: weatherData.name,
      temperature: weatherData.temp,
      humidity: weatherData.humidity,
      condition: weatherData.type,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/requestWeather", // Proxy to your AWS Lambda API
        payload
      );
      alert("Weather data submitted successfully!");
      console.log("Submission response:", response.data);
      setResponseData(response.data.data); // set inserted + highest data
    } catch (error) {
      alert("Error submitting data!");
      console.error("Submission error:", error);
    }
  };

  if (!weatherData) return null;

  return (
    <div className="weather-form-container">
      <form className="weather-form" onSubmit={handleSubmit}>
        <h2>Submit Weather Info</h2>

        <div>
          <label className="form-label">City:</label>
          <input
            type="text"
            className="form-input"
            value={weatherData.name}
            readOnly
            required
          />
        </div>

        <div>
          <label className="form-label">Temperature (°C):</label>
          <input
            type="number"
            className="form-input"
            value={weatherData.temp}
            readOnly
            required
          />
        </div>

        <div>
          <label className="form-label">Humidity (%):</label>
          <input
            type="number"
            className="form-input"
            value={weatherData.humidity}
            readOnly
            required
          />
        </div>

        <input type="hidden" name="condition" value={weatherData.type} />

        <button type="submit" className="submit-button">
          Submit Weather Data
        </button>
      </form>

      {responseData && (
        <div className="weather-response">
          <h3>📌 Submitted Weather Data</h3>
          <p><strong>City:</strong> {responseData.new_entry.city}</p>
          <p><strong>Temperature:</strong> {responseData.new_entry.temperature}°C</p>
          <p><strong>Humidity:</strong> {responseData.new_entry.humidity}%</p>
          <p><strong>Condition:</strong> {responseData.new_entry.condition}</p>

          <h3>🔥 Highest Temperature Recorded</h3>
          <p><strong>City:</strong> {responseData.highest_record.city}</p>
          <p><strong>Temperature:</strong> {responseData.highest_record.temperature}°C</p>
          <p><strong>Message:</strong> {responseData.highest_record.message}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherForm;
