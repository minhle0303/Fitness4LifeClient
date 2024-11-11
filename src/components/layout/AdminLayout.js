import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/Sidebar';
import Navbar from '../admin/Navbar';
import '../../style/style.css';


function AdminLayout(props) {
    return (
        <div>
        <Sidebar />   
       <div className="content">
         <Navbar />
        <main>
          <Outlet /> {/* Các trang con của website */}
        </main>
        </div>
      </div>
    );
}

export default AdminLayout;