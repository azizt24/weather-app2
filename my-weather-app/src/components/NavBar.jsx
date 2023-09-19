import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div className="navbar">
            <Link className="button" to="/">Home</Link>
            <Link className="button" to="/favorites">Favorites</Link>
            <Link className="button" to="/forecast">Forecast</Link>
            <Link className="button" to="/signin">Sign In</Link>
        </div>
    );
}

export default NavBar;
