import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login Data:', formData);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData)
            console.log('Response:', response.data); // Debugging purpose
            localStorage.setItem('authToken', response.data.token);
            setMessage('Login successful!');
            setIsError(false);
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setMessage(error.response?.data?.message || 'Login failed.');
            setIsError(true);
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            {message && (
                <div className={isError ? 'error-message' : 'success-message'}>{message}</div>
            )}
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <a href="/register">Don't have an account? Register</a>
        </div>
    );
};

export default Login;
