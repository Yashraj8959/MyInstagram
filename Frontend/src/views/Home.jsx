import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/feed', {
                    headers: {
                        authorization: 'bearer ' + localStorage.getItem('token'),
                    },
                });
                setPosts(response.data.posts);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-black text-white font-sans flex items-center justify-center">
                <p>Loading posts...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-black text-white font-sans flex items-center justify-center">
                <p>Error loading posts.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white font-sans">
            <nav className="flex items-center justify-between p-4 border-b border-gray-800" style={{ padding: '16px' }}>
                <p className="text-xl font-semibold">SocialShot</p>
                <button
                    onClick={() => {
                        navigate('/create-post');
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    style={{ padding: '8px' }}
                >
                    Create Post
                </button>
            </nav>
            <div className="p-4 flex flex-col items-center gap-4">
                {posts.map((post) => (
                    <div key={post._id} className="mb-4 w-full max-w-md rounded overflow-hidden shadow-lg bg-gray-800 p-4">
                        <img className="w-full" src={post.media.url} alt="Post Media" />
                        <div className="px-6 py-4">
                            <p className="text-gray-300 text-base">{post.caption}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Home;