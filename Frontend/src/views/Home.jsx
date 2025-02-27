import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-black text-white font-sans">
            <nav className="flex items-center justify-between p-4 border-b border-gray-800"  style={{padding: '16px'}}>
                <p className="text-xl font-semibold">SocialShot</p>
                <button
                    onClick={() => {
                        navigate('/create-post');
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    style={{padding: '8px'}}
                >
                    Create Post
                </button>
            </nav>
            <div className="p-4 flex flex-col justify-center items-center">
                {/* Example content */}
                <h2 className="text-2xl font-semibold mb-4">Welcome to SocialShot</h2>
                <p className="text-gray-400">
                    Explore and share moments with your friends.
                </p>
            </div>
        </main>
    );
};

export default Home;