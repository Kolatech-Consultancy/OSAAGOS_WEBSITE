import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../../services/api';
import SpinnerMini from '../../SpinnerMini';


function PostOverview() {
    const [Post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    let isMounted = true
    const { postId } = useParams()
    const [error, setError] = useState(null)




    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await getPostById(postId)
                setPost(response.data);
                console.log(response.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching Post details:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        if (isMounted) fetchPostDetails();

        return () => {
            isMounted = false
        }
    }, [postId]);


    if (loading) {
        return <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
            <SpinnerMini />
        </div>;
    }
    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    if (!Post) {
        return <div className="bg-white w-full h-40 flex items-center justify-center mt-2">Post not found.</div>;
    }


    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{Post.title}</h1>
                <div>
                    <p className="text-gray-500 text-sm mb-4">By {Post.author.name} - {new Date(Post.timestamp).toLocaleDateString()}</p>
                    <div className="text-gray-700">
                        {Post.content}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostOverview;