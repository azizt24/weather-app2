import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Favorites from './components/Favorites';
import Forecast from './components/Forecast';
import SignIn from './components/SignIn';

function App() {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (city) => {
        if (!favorites.includes(city)) {
            setFavorites([...favorites, city]);
        }
    };

    return (
        <Router>
            <div className="container">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home addToFavorites={addToFavorites} />} />
                    <Route path="/favorites" element={<Favorites favorites={favorites} />} />
                    <Route path="/forecast" element={<Forecast />} />
                    <Route path="/signIn" element={<SignIn />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
