import React from 'react';
import styles from './Favorites.module.css';
import { WiDaySunny, WiCloud, WiRain, WiThunderstorm, WiSnow, WiFog } from 'react-icons/wi';

function getWeatherIcon(status) {
    switch (status) {
        case 'Clear':
            return <WiDaySunny />;
        case 'Clouds':
            return <WiCloud />;
        case 'Rain':
            return <WiRain />;
        case 'Thunderstorm':
            return <WiThunderstorm />;
        case 'Snow':
            return <WiSnow />;
        case 'Mist':
            return <WiFog />;
        default:
            return <WiDaySunny />;
    }
}

function Favorites({ favorites }) {
    return (
        <div className={styles.container}>
            <h2>Favorites</h2>
            {favorites.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Temperature</th>
                            <th>Status</th>
                            <th>Logo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorites.map((favorite, index) => (
                            <tr key={index}>
                                <td>{favorite.name}</td>
                                <td>{favorite.temp}</td>
                                <td>{favorite.status}</td>
                                <td>
                                    {getWeatherIcon(favorite.status)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No favorites added yet.</p>
            )}
        </div>
    );
}

export default Favorites;
