import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpinnerMini from '../../SpinnerMini'; // Ensure the path is correct
import { getNewsById } from '../../../services/api'; // Import your API service
import BackwardNavigator from '../backwardNavigator';

const NewsOverview = () => {
    const { id } = useParams();
    const [newsArticle, setNewsArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    let isMounted = true

    useEffect(() => {
        const fetchNewsArticle = async () => {
            try {
                setLoading(true);
                const response = await getNewsById(id);
                setNewsArticle(response.data);
            } catch (error) {
                setError(true);
                console.error("Error fetching news article:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isMounted) fetchNewsArticle();
        return () => {
            isMounted = false
        }
    }, [id]);

    return (
        <>  
            <BackwardNavigator/>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <SpinnerMini />
                    </div>
                ) : error ? (
                    <div className="text-red-500">An error occurred while fetching the news article.</div>
                ) : newsArticle ? (
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{newsArticle.title}</h1>
                        <p className="text-gray-500 text-sm mb-4">By {newsArticle.author.name} - {new Date(newsArticle.createdAt).toLocaleDateString()}</p>
                        <div className="text-gray-700">
                            {newsArticle.content}
                        </div>
                    </div>
                ) : (
                    <div>No news article found.</div>
                )}
            </div>
        </>
    );
};

export default NewsOverview;
