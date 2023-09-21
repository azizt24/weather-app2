import React, { useState } from 'react';
import './SignIn.css'; // Corrected import path

// Rest of the component code

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
    };

    return (
        <div className="signin-container">
            <form onSubmit={handleSubmit} className="signin-form">
                <h2>Sign In</h2>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <input type="submit" value="Sign In" className="submit-button" />
            </form>
        </div>
    );
}

export default SignIn;
