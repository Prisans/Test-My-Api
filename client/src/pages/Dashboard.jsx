import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../utils/api';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RequestPanel from '../components/RequestPanel';
import ResponsePanel from '../components/ResponsePanel';

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await api.get('/history/all');
            setHistory(res.data.data);
        } catch (err) {
            console.error('Failed to fetch history', err);
        }
    };

    const handleRequest = async (requestData) => {
        setLoading(true);
        setResponse(null);
        const startTime = Date.now();
        
        try {
            const { method, url, params, headers, body } = requestData;
            
            // Prepare params and headers
            const queryParams = params.filter(p => p.enabled && p.key).reduce((acc, p) => ({ ...acc, [p.key]: p.value }), {});
            const requestHeaders = headers.filter(h => h.enabled && h.key).reduce((acc, h) => ({ ...acc, [h.key]: h.value }), {});

            const res = await axios({
                method,
                url,
                params: queryParams,
                headers: requestHeaders,
                data: body ? JSON.parse(body) : undefined,
                validateStatus: () => true, // Don't throw on error status
            });

            const endTime = Date.now();
            const responseData = {
                status: res.status,
                statusText: res.statusText,
                time: endTime - startTime,
                size: JSON.stringify(res.data).length,
                data: res.data,
                headers: res.headers
            };

            setResponse(responseData);

            // Save to history via backend
            await api.post('/history/save', {
                url,
                method,
                headers: requestHeaders,
                body: body ? JSON.parse(body) : null,
                response: res.data,
                status: res.status,
                time: endTime - startTime,
                size: JSON.stringify(res.data).length
            });

            fetchHistory(); // Refresh history
        } catch (err) {
            setResponse({
                status: 0,
                statusText: 'Error',
                time: Date.now() - startTime,
                size: 0,
                data: { error: err.message },
                headers: {}
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteHistory = async (id) => {
        try {
            await api.delete(`/history/${id}`);
            setHistory(history.filter(h => h._id !== id));
        } catch (err) {
            console.error('Failed to delete history', err);
        }
    };

    const handleSelectHistory = (item) => {
        // Here we could populate the RequestPanel with the selected history item
        // For simplicity, we just show the response of that item
        setResponse({
            status: item.status,
            statusText: 'From History',
            time: item.time,
            size: item.size,
            data: item.response,
            headers: {}
        });
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar 
                    history={history} 
                    onSelect={handleSelectHistory} 
                    onDelete={handleDeleteHistory} 
                />
                <main className="flex-1 flex flex-col min-w-0 bg-background">
                    <RequestPanel onRequest={handleRequest} loading={loading} />
                    <ResponsePanel response={response} loading={loading} />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
