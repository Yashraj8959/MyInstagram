import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        const formData = new FormData(event.target);
        axios
            .post('http://localhost:3000/v1/api/posts/create', formData, {
                headers: {
                    authorization: 'bearer ' + localStorage.getItem('token'),
                },
            })
            .then((response) => {
                console.log(response.data);
                setSuccessMessage('Post created successfully!');
                event.target.reset(); // Clear form fields
            })
            .catch((error) => {
                console.error('Error creating post:', error);
                setErrorMessage('Failed to create post. Please try again.');
            })
            .finally(() => {
                setLoading(false);
                navigate('/');
            });
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-black text-white font-sans">
            <section className="bg-black p-8 rounded shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-semibold mb-6 text-center">Create Post</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="mb-4">
                        <label htmlFor="media" className="block text-sm font-medium text-gray-300 mb-1" style={{marginBottom: "4px"}}>
                            Enter media
                        </label>
                        <input
                            type="file"
                            id="media"
                            name="media"
                            accept="image/*"
                            className="bg-gray-800 border border-gray-700 rounded w-full p-3 focus:outline-none focus:border-blue-500"
                            style={{padding: "12px"}}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="caption" className="block text-sm font-medium text-gray-300 mb-1" style={{marginBottom: "4px"}}>
                            Enter caption
                        </label>
                        <textarea
                            id="caption"
                            name="caption"
                            className="bg-gray-800 border border-gray-700 rounded w-full p-3 focus:outline-none focus:border-blue-500"
                            style={{padding: "12px"}}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded w-full"
                        style={{paddingBlock: "8px"}}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Submit'}
                    </button>
                </form>
                {successMessage && <p className="text-green-500 mt-2 text-center">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 mt-2 text-center">{errorMessage}</p>}
            </section>
        </main>
    );
};

export default CreatePost;