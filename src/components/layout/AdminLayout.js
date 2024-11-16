import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/Sidebar';
import Navbar from '../admin/Navbar';
import '../../style/style.css';


function AdminLayout(props) {
  const [menuItems, setMenuItems] = useState([]);

  const handleSetMenuItems = (items) => {
      setMenuItems(items);
      console.log("menu",menuItems);
      
  };
    return (
        <div>
         <Sidebar setMenuItems={handleSetMenuItems} />
       <div className="content">
         <Navbar  menuItems={menuItems} />
        <main>
          <Outlet /> {/* Các trang con của website */}
        </main>
        </div>
      </div>
    );
}

export default AdminLayout;