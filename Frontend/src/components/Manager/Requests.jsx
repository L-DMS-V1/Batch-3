import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { Table, Button } from 'antd'; // Example table library

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/manager/requests'); // Adjust the endpoint as needed
                setRequests(response.data);
            } catch (err) {
                setError('Failed to fetch requests data');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const columns = [
        {
            title: 'Request ID',
            dataIndex: 'id',
            key: 'id',
        },
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
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => handleApprove(record.id)}>Approve</Button>
            ),
        },
    ];

    const handleApprove = async (id) => {
        try {
            await axios.post(`/api/manager/requests/${id}/approve`); // Adjust the endpoint as needed
            setRequests(requests.filter(request => request.id !== id)); // Remove approved request from the list
        } catch (err) {
            setError('Failed to approve the request');
        }
    };

    return (
        <div className="requests">
            <h2>Requests</h2>
            <Table dataSource={requests} columns={columns} rowKey="id" />
        </div>
    );
};

export default Requests;