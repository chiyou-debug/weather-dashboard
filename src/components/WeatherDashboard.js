import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './WeatherDashboard.css'; 
import { Link } from 'react-router-dom';

const API_KEY = 'cd2664cf621ec9dc02b8612f38822811'; // 天气API密钥


const WeatherDashboard = ({ location }) => {

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
        console.error('error! we can\'t get any information', error);
      }
    };

    fetchWeatherData();
  }, [location]);

  useEffect(() => {
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

//Passing three parameters to the child component here
  return (
    <div className="weather-dashboard">
      <div className="top-left-container">
        
        <div className="weather-card">
          {weatherData && (
            <WeatherCard
              weatherData={weatherData}
              selectedDate={selectedDate}
              currentTime={currentTime}
            />
          )}
        </div>
   
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
