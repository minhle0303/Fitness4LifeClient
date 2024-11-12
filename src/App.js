import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Sidebar from './components/admin/Sidebar';
import Navbar from './components/admin/Navbar';
import Home from './components/admin/page/Home';
import AdminDashboard from './components/admin/page/AdminDashboard';
import AdminLayout from './components/layout/AdminLayout';
import MainLayout from './components/layout/MainLayout';


const App = () => {


  return (

    <Router>
      <Routes>
        {/* trang main */}
        <Route path="/" element={<MainLayout />}>
        </Route>

        <Route>
          
        </Route>

        {/* Trang  Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;

