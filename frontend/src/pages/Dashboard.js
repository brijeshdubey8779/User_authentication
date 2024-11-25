import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:5000/api/dashboard', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error.response?.data || error.message);
            }
        };

        fetchData();
    }, []);

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>Dashboard</h1>
            <p>{data.message}</p>
        </div>
    );
};

export default Dashboard;
