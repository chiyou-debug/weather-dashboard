// src/components/WeatherChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';



const API_KEY = 'YOUR_API_KEY'; 

const WeatherChart = ({ location, selectedDate }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchWeatherChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`
        );

        const chartData = {
          labels: [],
          datasets: [
            {
              label: '温度 (°C)',
              data: [],
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 2,
            },
          ],
        };

        response.data.list.forEach((item) => {
          const date = new Date(item.dt * 1000);
          chartData.labels.push(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          chartData.datasets[0].data.push((item.main.temp - 273.15).toFixed(2));
        });

        setChartData(chartData);

       
      } catch (error) {
        console.error('天气图表数据获取失败', error);
      }
    };

    fetchWeatherChartData();
  }, [location, selectedDate]);

  return (
    <div className="weather-chart">
      {chartData && (
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'hour',
                  stepSize: 3,
                  displayFormats: {
                    hour: 'HH:mm',
                  },
                },
              },
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: false, // 隐藏图例
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default WeatherChart;
