import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Register Data:', formData);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData); // Ensure URL is correct
            console.log('Response:', response.data);
            setMessage('Registration successful!');
            setIsError(false);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setMessage(error.response?.data?.message || 'Registration failed.');
            setIsError(true);
        }
    };

    return (
        <div className="container">
            <h1>Register</h1>
            {message && (
                <div className={isError ? 'error-message' : 'success-message'}>{message}</div>
            )}
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
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
                <button type="submit">Register</button>
            </form>
            <a href="/login">Already have an account? Login</a>
        </div>
    );
};

export default Register;
