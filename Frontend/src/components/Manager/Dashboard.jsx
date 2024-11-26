import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import Chart from 'react-chartjs-2'; // Example chart library
import { Table } from 'antd'; // Example table library
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/manager/dashboard'); // Adjust the endpoint as needed
                setData(response.data);
            } catch (err) {
                setError('Failed to fetch dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Example data for charts and tables
    const chartData = {
        labels: data.chartLabels,
        datasets: [
            {
                label: 'Performance',
                data: data.chartData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const columns = [
        {
            title: 'User ',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Last Active',
            dataIndex: 'lastActive',
            key: 'lastActive',
        },
    ];

    return (
        <div className="dashboard">
            <h2>Manager Dashboard</h2>
            <div className="chart-container">
                <Chart type="bar" data={chartData} />
            </div>
            <div className="table-container">
                <Table dataSource={data.tableData} columns={columns} />
            </div>
        </div>
    );
};

export default Dashboard;