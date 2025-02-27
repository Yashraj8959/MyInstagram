import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from '../views/Register'
import Profile from '../views/Profile'
import Login from '../views/login'
import Protected from '../components/Protected'
import Home from '../views/Home'
import CreatePost from '../views/CreatePost'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Protected><Home/></Protected>} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-post" element={<Protected> <CreatePost/></Protected>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes