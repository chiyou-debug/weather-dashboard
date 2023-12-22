/**
 * WeatherCard - A React component for displaying weather information and providing advice based on temperature.
 * 
 * Props:
 * - weatherData: An object containing weather information obtained from the WeatherDashBoard parent component.
 * - selectedDate: A Date object representing the date for which the weather information is shown.
 * - currentTime: A Date object representing the current time.
 * 
 * State:
 * - isShow: A boolean state that determines whether to show the temperature advice popup.
 * 
 * Functions:
 * - showAdvice(temperature): A function that returns different sets of advice as React elements (ul > li) based on temperature ranges.
 *   - Displays advice for various activities and precautions relevant to the given temperature range.
 * 
 * Rendering:
 * - Displays weather details such as description, temperature, humidity, pressure, visibility, wind speed, and direction.
 * - Shows sunrise and sunset times, and the current time.
 * - Temperature value is clickable and triggers a popup showing advice relevant to the current temperature.
 * - The popup can be closed with a close button.
 * 
 * Additional Notes:
 * - The temperature from weatherData is converted from Kelvin to Celsius for display.
 * - The component uses useState for handling the display state of the temperature advice popup.
 */


import React, { useState } from 'react';


//This function displays a popup based on the value of the parameter "temperature," 
//determining which specific popup to show
const showAdvice = (temperature) => {
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

//weather info show,get these three para from its parent component.(WeatherDashboard)
const WeatherCard = ({ weatherData, currentTime }) => {

  //get two element from weatherData
  const { main, weather } = weatherData;

  //Convert Fahrenheit to Celsius, round to two decimal places
  const temperature = (main.temp - 273.15).toFixed(2);

  //Check if the popup is open. If it's true, open the popup
  //if it's false, close the popup. Toggle this boolean when the user clicks on "Temperature
  const [isShow, setIsShow] = useState(false);

  
//An event listener for the click event, toggling a boolean.
  const handleTemperatureClick = () => {
    setIsShow(true);
  };

  const closeTemperatureInfo = () => {
    setIsShow(false);
  };

  return (
  <div className="weather-card">
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


      {/* FIRST,we need to judge the value of isShow. if it is true,  */}
      {isShow && (
        <div className="temperature-info-popup">
          <h2>Recommend</h2>
          {/*Call the getInfo function to trigger the popup output */}
          <p>{showAdvice(temperature)}</p>


          <button onClick={closeTemperatureInfo}>close</button>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
