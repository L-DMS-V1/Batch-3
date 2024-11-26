import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from Chart.js
import { Pie } from 'react-chartjs-2'; // Import Pie chart from Chart.js
import './styles.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const Dashboard = () => {
    const [userData, setUserData] = useState([]); // Corrected state variable name
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/userdata'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserData(data); // Corrected setter function name
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        labels: userData.map(user => user.name),
        datasets: [
            {
                label: 'User  Statistics',
                data: userData.map(user => user.value), // Replace with actual data field
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard">
            <h1>Employee Dashboard</h1>
            <div className="charts">
                <div>
                    <h2>Bar Chart</h2>
                    <Bar data={chartData} />
                </div>
                <div>
                    <h2>Pie Chart</h2>
                    <Pie data={chartData} />
                </div>
            </div>
            <div className="user-list">
                <h2>User List</h2>
                <ul>
                    {userData.map(user => (
                        <li key={user.id}>{user.name} - {user.value}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;