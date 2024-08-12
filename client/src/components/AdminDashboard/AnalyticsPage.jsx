import React, { useState, useEffect } from 'react';
import SpinnerMini from '../SpinnerMini'; // Ensure the path is correct
import { getAnalytics } from '../../services/api'; // Import your API service
import BackwardNavigator from './backwardNavigator';

const AnalyticsPage = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    let isMounted = true

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const response = await getAnalytics();
                setAnalytics(response.data);
            } catch (error) {
                setError(true);
                console.error("Error fetching analytics:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isMounted) fetchAnalytics();
        return () => {
            isMounted = false
        }
    }, []);

    return (
        <>
            <BackwardNavigator />
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Analytics Overview</h1>
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <SpinnerMini />
                    </div>
                ) : error ? (
                    <div className="text-red-500">An error occurred while fetching analytics data.</div>
                ) : analytics ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">Total Alumni</h2>
                            <p className="text-3xl mt-3 font-bold">{analytics.totalAlumni}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">Total Events</h2>
                            <p className="text-3xl mt-3 font-bold">{analytics.totalEvents}</p>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">Total News</h2>
                            <p className="text-3xl mt-3 font-bold">{analytics.totalNews}</p>
                        </div>
                        <div className="bg-red-100 p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">Total Media</h2>
                            <p className="text-3xl mt-3 font-bold">{analytics.totalMedia}</p>
                        </div>
                    </div>
                ) : (
                    <div>No analytics data available.</div>
                )}
            </div>
        </>
    );
};

export default AnalyticsPage;
