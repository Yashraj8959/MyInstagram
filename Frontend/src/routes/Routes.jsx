import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from '../views/Register'
import Profile from '../views/Profile'
import Login from '../views/login'
import Protected from '../components/Protected'
import Home from '../views/Home'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Protected><Home/></Protected>} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes