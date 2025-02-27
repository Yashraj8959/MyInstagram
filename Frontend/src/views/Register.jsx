import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:3000/v1/api/users/register', {
                username,
                email,
                password,
                fullName
            })
            .then((res) => {
                const data = res.data;
                localStorage.setItem('token', data.token);
                navigate('/profile');
            })
            .catch((err) => {
                if (err.response?.data?.message) {
                    setError(err.response.data.message);
                }
            });
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-black text-white font-sans">
            <section className="bg-black p-8 rounded shadow-md w-full max-w-sm flex flex-col gap-4">
                <div className="flex justify-center mb-6">
                  <h1 className='text-3xl'>SocialShot</h1>
                </div>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="bg-gray-800 border border-gray-700 rounded w-full focus:outline-none focus:border-blue-500 text-white"
                        style={{ padding: '8px 12px' }} // Apply padding inline
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="bg-gray-800 border border-gray-700 rounded w-full focus:outline-none focus:border-blue-500 text-white"
                        style={{ padding: '8px 12px' }} // Apply padding inline
                    />
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        id="fullName"
                        type="text"
                        placeholder="Full Name"
                        className="bg-gray-800 border border-gray-700 rounded w-full focus:outline-none focus:border-blue-500 text-white"
                        style={{ padding: '8px 12px' }} // Apply padding inline
                    />
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        type="text"
                        placeholder="Username"
                        className="bg-gray-800 border border-gray-700 rounded w-full focus:outline-none focus:border-blue-500 text-white"
                        style={{ padding: '8px 12px' }} // Apply padding inline
                    />
                    <div className="text-xs text-gray-500 mb-4">
                        People who use our service may have uploaded your contact information to Instagram. <span className="text-blue-500">Learn More</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-4">
                        By signing up, you agree to our <span className="text-blue-500">Terms</span>, <span className="text-blue-500">Privacy Policy</span> and <span className="text-blue-500">Cookies Policy</span>.
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded w-full mb-4"
                        style={{ padding: '8px 12px' }} // Apply padding inlinein
                    >
                        Sign up
                    </button>
                </form>
                <div className="border-t border-gray-700 pt-4 text-center">
                    Have an account? <span className="text-blue-500"> <button onClick={() => { navigate('/login'); }}>Log in</button></span>
                </div>
            </section>
        </main>
    );
};

export default Register;