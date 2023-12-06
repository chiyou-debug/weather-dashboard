// src/components/WeatherDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './WeatherDashboard.css'; // 引入样式

const API_KEY = 'cd2664cf621ec9dc02b8612f38822811'; // 天气API密钥

const WeatherDashboard = () => {
  const [location, setLocation] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('天气数据获取失败', error);
      }
    };

    fetchWeatherData();
  }, [location]);

  useEffect(() => {
    // 更新实时时钟
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="weather-dashboard">
      <h1>天气预报看板</h1>
      <div className="location-input">
        <input
          type="text"
          placeholder="输入地点"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      {weatherData && (
        <WeatherCard
          weatherData={weatherData}
          selectedDate={selectedDate}
          currentTime={currentTime}
        />
      )}
      <div className="date-picker">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      {weatherData && (
        <WeatherChart
          location={location}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default WeatherDashboard;
