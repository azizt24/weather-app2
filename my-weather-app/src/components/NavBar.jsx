import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';  

function NavBar() {
    return (
        <div className="navbarBox">
            <div className="navbar">
                <Link className="button" to="/">☀</Link>
                <Link className="button" to="/favorites">&#10032;</Link>
                <Link className="button" to="/forecast">❄</Link>
                <Link className="button" to="/signin">☎</Link>
            </div>
        </div>
    );
}

export default NavBar;
