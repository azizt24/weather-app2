import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';

function Home({ addToFavorites }) {
  const API_KEY = "57d8044b6915f07cc5634a8a36e0654a"; // Replace with your OpenWeatherMap API key
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const kelvinToCelsius = (kelvin) => kelvin - 273.15;
  const kelvinToFahrenheit = (kelvin) => (kelvin - 273.15) * 9/5 + 32;

  const formatTemperature = (kelvin) => {
    return isCelsius
      ? `${kelvinToCelsius(kelvin).toFixed(1)}°C`
      : `${kelvinToFahrenheit(kelvin).toFixed(1)}°F`;
  };

  useEffect(() => {
    if (!city) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.main && data.weather && data.weather.length > 0) {
          setWeather({
            temperature: data.main.temp,
            status: data.weather[0].description,
            icon: data.weather[0].icon
          });
        }
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        setWeather(null); // Reset weather data on error
      });
  }, [city, API_KEY]);

  return (
    <div className={styles.contentContainer}>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Search city"
          className={styles.input}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className={styles.buttonGroup}>
          <button className={`${styles.star} ${styles.button}`} onClick={() => addToFavorites({ name: city, temp: formatTemperature(weather.temperature) })}>★</button>
          <button className={`${styles.switch} ${styles.button}`} onClick={() => setIsCelsius(!isCelsius)}>
            Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
          </button>
        </div>
        {weather && (
          <div className={styles.results}>
            <img
              src={`https://openweathermap.org/img/w/${weather.icon}.png`} // Corrected icon URL
              alt={weather.status}
              className={styles.weatherIcon}
            />
            <p className={styles.temperature}>Temperature: {formatTemperature(weather.temperature)}</p>
            <p className={styles.status}>Status: {weather.status}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
