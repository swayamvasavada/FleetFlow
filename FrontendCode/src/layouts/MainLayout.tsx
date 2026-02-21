import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function MainLayout() {
  return (
    // The drawer container must wrap everything
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        {/* Navbar stays at the top of the content */}
        <Header />
        
        {/* Main page content goes here */}
        <main className="flex-grow p-6 bg-base-200 min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Sidebar is the actual 'drawer-side' */}
      <Sidebar />
    </div>
  );
}

export default MainLayout;