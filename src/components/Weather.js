import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "Replace with your OpenWeatherMap API key"; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city) return;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod === 200) {
      setWeatherData(data);
    } else {
      alert("City not found! ❌");
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather Dashboard 🌦️</h1>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>🌡 Temperature: {weatherData.main.temp}°C</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>🌬 Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>☁ {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
