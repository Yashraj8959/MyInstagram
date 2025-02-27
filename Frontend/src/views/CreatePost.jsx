import React from 'react';
import axios from 'axios';

const CreatePost = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        axios.post("http://localhost:3000/v1/api/posts/create", formData, {
            headers: {
                authorization: "bearer " + localStorage.getItem('token')
            }
        });
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-black text-white font-sans">
            <section className="bg-black p-8 rounded shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-semibold mb-6 text-center">Create Post</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="mb-4">
                        <label htmlFor="media" className="block text-sm font-medium text-gray-300 mb-2" style={{ marginBottom: '8px' }}>
                            Enter media
                        </label>
                        <input
                            type="file"
                            id="media"
                            name="media"
                            accept="image/*"
                            className="bg-gray-800 border border-gray-700 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                            style={{ padding: '8px 12px' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="caption" className="block text-sm font-medium text-gray-300 mb-2" style={{ marginBottom: '8px' }}>
                            Enter caption
                        </label>
                        <textarea
                            id="caption"
                            name="caption"
                            className="bg-gray-800 border border-gray-700 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded w-full"
                        style={{ padding: '8px 12px' }}
                    >
                        Submit
                    </button>
                </form>
            </section>
        </main>
    );
};

export default CreatePost;