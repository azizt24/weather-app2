import React, { useState } from 'react';
import './Forecast.css'; // Import the CSS file for styling

function Forecast() {
    const API_KEY = "57d8044b6915f07cc5634a8a36e0654a";
    const [city, setCity] = useState('');
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isCelsius, setIsCelsius] = useState(true); // Default is Celsius

    const kelvinToCelsius = (kelvin) => kelvin - 273.15;
    const kelvinToFahrenheit = (kelvin) => (kelvin - 273.15) * 9/5 + 32;

    const formatTemperature = (kelvin) => {
        return isCelsius 
            ? `${kelvinToCelsius(kelvin).toFixed(1)}°C` 
            : `${kelvinToFahrenheit(kelvin).toFixed(1)}°F`;
    };

    const fetchWeather = () => {
        if (!city) {
            setError("Please enter a city name.");
            return;
        }

        setLoading(true);
        setError(null);

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                if (data.cod !== "200") {
                    throw new Error(data.message);
                }
                // Filter the forecast data to only include the first entry of each day
                const filteredForecast = data.list.filter((item, index, arr) => {
                    const currentDate = new Date(item.dt * 1000).getDate();
                    const nextDate = index < arr.length - 1 ? new Date(arr[index + 1].dt * 1000).getDate() : currentDate;
                    return currentDate !== nextDate;
                });
                setForecast(filteredForecast);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    };

    return (
        <div className="forecast-container">
            <input 
                type="text" 
                placeholder="Search city" 
                onChange={(e) => setCity(e.target.value)} 
                onKeyDown={(e) => { if(e.key === 'Enter') fetchWeather(); }}
            />
            <button onClick={fetchWeather}>Get Forecast</button>
            <button onClick={() => setIsCelsius(!isCelsius)}>
                Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
            </button>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">Error: {error}</p>}
            {forecast.length > 0 && (
                <table className="forecast-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Temperature</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecast.map(day => (
                            <tr key={day.dt}>
                                <td>{new Date(day.dt * 1000).toLocaleDateString()}</td>
                                <td>{formatTemperature(day.main.temp)}</td>
                                <td>{day.weather[0].description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Forecast;
