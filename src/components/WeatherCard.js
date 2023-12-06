// src/components/WeatherCard.js
import React from 'react';

const WeatherCard = ({ weatherData, selectedDate, currentTime }) => {
  const { main, weather } = weatherData;
  const temperature = (main.temp - 273.15).toFixed(2);

  return (
    <div className="weather-card">
      <h2>{selectedDate.toDateString()}</h2>
      <h3>天气: {weather[0].description}</h3>
      <p>温度: {temperature}°C</p>
      <p>湿度: {main.humidity}%</p>
      <p>气压: {main.pressure} hPa</p>
      <p>能见度: {weatherData.visibility} m</p>
      <p>风速: {weatherData.wind.speed} m/s</p>
      <p>风向: {weatherData.wind.deg}°</p>
      <p>日出时间: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p>日落时间: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
      <p>实时时间: {currentTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default WeatherCard;
