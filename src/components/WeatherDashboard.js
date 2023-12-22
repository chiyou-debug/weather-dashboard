import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios library for making HTTP requests
import WeatherCard from './WeatherCard'; // Import the WeatherCard component
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles
import './WeatherDashboard.css'; // Import the WeatherDashboard styles

const API_KEY = 'cd2664cf621ec9dc02b8612f38822811'; // Weather API key

const WeatherDashboard = ({ location }) => { // Receive a prop called 'location'

  const [weatherData, setWeatherData] = useState(null); // State to store weather data
  const [currentTime, setCurrentTime] = useState(new Date()); // State to store current time

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
        );
        setWeatherData(response.data); // Fetch weather data through API request and store it in the weatherData state
      } catch (error) {
        console.error('error! we can\'t get any information', error); // Log an error message if the request fails
      }
    };

    fetchWeatherData(); // Call the fetchWeatherData function
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date()); // Update the current time every second
    }, 1000);

    return () => {
      clearInterval(timer); // Clean up the timer when the component unmounts
    };
  }, []);

  // Passing three parameters to the child component here
  return (
    <div className="weather-dashboard">
      <div className="top-left-container">
        
        <div className="weather-card">
          {weatherData && (
            <WeatherCard
              weatherData={weatherData}
              currentTime={currentTime}
            />
          )}
        </div>
   
      </div>
    </div>
  );
};

export default WeatherDashboard;
