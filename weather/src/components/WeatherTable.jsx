import React, { useState } from "react";

const WeatherTable = () => {
  const [showTable, setShowTable] = useState(false);
  const [weatherRecords, setWeatherRecords] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("/?getdata=true");
      const data = await response.json();
      setWeatherRecords(data);
      setShowTable(true);
    } catch (error) {
      alert("Failed to load table data!");
      console.error("Error loading table data:", error);
    }
  };

  return (
    <>
      <button className="load-data-button" onClick={loadData}>
        Show All Weather Data
      </button>

      {showTable && (
        <div className="data-table">
          <h2>Stored Weather Records</h2>
          <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
              </tr>
            </thead>
            <tbody>
              {weatherRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.city}</td>
                  <td>{record.temperature}</td>
                  <td>{record.humidity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default WeatherTable;
