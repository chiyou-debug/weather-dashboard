import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Text, Title, Group, Loader } from '@mantine/core';
import { useInterval } from '@mantine/hooks';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async () => {
    try {
      const apiKey = 'cd2664cf621ec9dc02b8612f38822811'; // 替换为你的 API 密钥
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useInterval(() => {
    fetchWeatherData();
  }, 600000); // 更新频率，这里设置为每10分钟更新一次天气数据

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <Container size="xs" padding="md">
      <Card shadow="sm" padding="lg">
        <Group direction="column" position="center" spacing="md">
          <Title order={2}>Weather Dashboard</Title>
          {loading ? (
            <Loader />
          ) : (
            weatherData && (
              <>
                <Text size="lg" weight={500}>
                  {weatherData.name}
                </Text>
                <Text size="sm">Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</Text>
                <Text size="sm">Humidity: {weatherData.main.humidity}%</Text>
                <Text size="sm">Wind Speed: {weatherData.wind.speed} m/s</Text>
              </>
            )
          )}
        </Group>
      </Card>
    </Container>
  );
};

export default App;
