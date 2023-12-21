import React, { useState } from 'react';

const getTemperatureInfo = (temperature) => {
  if (temperature < 0) {
    return (
      <ul>
        <li>Skiing, ice skating, winter sports</li>
        <li>Drink hot beverages, soak in hot springs, stay indoors in warmth</li>
        <li>Wear thick coats, scarves, gloves, and other winter clothing</li>
        <li>Note: Below 0°C, it's important to keep warm, wear multiple layers, use heating devices wisely, and save energy by turning off heaters before sleeping.</li>
      </ul>
    );
  } else if (temperature >= 0 && temperature < 10) {
    return (
      <ul>
        <li>Opt for outdoor exercises like jogging or walking.</li>
        <li>Choose eco-friendly transportation methods when going out, such as walking, cycling, or using public transport.</li>
        <li>Set indoor temperatures within a comfortably suitable range to save energy.</li>
      </ul>
    );
  }else if (temperature >= 10 && temperature < 20) {
    return (
      <ul>
        <li>Advocate various outdoor activities like hiking, cycling, etc., reducing dependence on motor vehicles.</li>
        <li>Promote outdoor leisure and fitness activities, beneficial for enhancing health and mental balance.</li>
      </ul>
    );
  } else if (temperature >= 20 && temperature < 30) {
    return (
      <ul>
        <li>Emphasize water conservation and efficient use of water resources to avoid waste.</li>
        <li>Encourage outdoor activities but ensure sun protection and protection against insect bites.</li>
      </ul>
    );
  } else if (temperature >= 30 && temperature < 40) {
    return (
      <ul>
        <li>Emphasize staying hydrated and avoiding heatstroke during outdoor activities.</li>
        <li>Reduce or avoid the use of high-energy-consuming appliances to save electricity.</li>
      </ul>
    );
  } else if (temperature >= 40) {
    return (
      <ul>
        <li>Advocate staying in shaded areas as much as possible to avoid exposure to high temperatures.</li>
        <li>Highlight special care for the elderly, children, and pets to ensure their comfort and safety.</li>
      </ul>
    );
  }
};

const WeatherCard = ({ weatherData, selectedDate, currentTime }) => {
  const { main, weather } = weatherData;
  const temperature = (main.temp - 273.15).toFixed(2);

  const [showTemperatureInfo, setShowTemperatureInfo] = useState(false);

  const handleTemperatureClick = () => {
    setShowTemperatureInfo(true);
  };

  const closeTemperatureInfo = () => {
    setShowTemperatureInfo(false);
  };

  return (
    <div className="weather-card">
  <h2>{selectedDate.toDateString()}</h2>
  <h3>Weather: {weather[0].description}</h3>
  <p onClick={handleTemperatureClick}>Temperature: {temperature}°C</p>
  <p>Humidity: {main.humidity}%</p>
  <p>Pressure: {main.pressure} hPa</p>
  <p>Visibility: {weatherData.visibility} m</p>
  <p>Wind Speed: {weatherData.wind.speed} m/s</p>
  <p>Wind Direction: {weatherData.wind.deg}°</p>
  <p>Sunrise Time: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
  <p>Sunset Time: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
  <p>Current Time: {currentTime.toLocaleTimeString()}</p>


      {/* 温度信息弹窗 */}
      {showTemperatureInfo && (
        <div className="temperature-info-popup">
          <h2>Recommend</h2>
          <p>{getTemperatureInfo(temperature)}</p>
          <button onClick={closeTemperatureInfo}>close</button>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
