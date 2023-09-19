import React, { useState, useEffect } from 'react';

function Home({ addToFavorites }) {
    const API_KEY = "eb06cca728caef5dd729368993b747f3";
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (!city) return;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setWeather({
                    temperature: data.main.temp,
                    status: data.weather[0].description
                });
            });
    }, [city]);

    return (
        <div>
            <input type="text" placeholder="Search city" onChange={(e) => setCity(e.target.value)} />
            <button className="star" onClick={() => addToFavorites(city)}>★</button>
            {weather && (
                <>
                    <p>Temperature: {weather.temperature}</p>
                    <p>Status: {weather.status}</p>
                </>
            )}
        </div>
    );
}

export default Home;
