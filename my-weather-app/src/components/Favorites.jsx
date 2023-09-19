import React from 'react';

function Favorites({ favorites }) {
    return (
        <div>
            <h2>Favorites</h2>
            <ul>
                {favorites.map(city => (
                    <li key={city}>{city}</li>
                ))}
            </ul>
        </div>
    );
}

export default Favorites;
