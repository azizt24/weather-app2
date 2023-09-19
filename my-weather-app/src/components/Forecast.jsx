import React, { useState, useEffect } from 'react';

function Forecast() {
    const API_KEY = "eb06cca728caef5dd729368993b747f3";
    const [city, setCity] = useState('');
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        if (!city) return;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setForecast(data.list);
            });
    }, [city]);

    return (
        <div>
            <input type="text" placeholder="Search city" onChange={(e) => setCity(e.target.value)} />
            <table>
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
                            <td>{day.main.temp}</td>
                            <td>{day.weather[0].description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Forecast;
