import React from "react";
import { useLocation } from "react-router-dom";
import { MdLogout, MdPerson, MdSettings } from "react-icons/md";

function Header() {
  const location = useLocation();

  // Map your routes to titles
  const getTitle = (path: any) => {
    switch (path) {
      case "/": return "Main Dashboard";
      case "/vehicles": return "Vehicle Registry";
      case "/trips": return "Trip Dispatcher";
      case "/maintenance": return "Maintenance Log";
      case "/expenses": return "Expense Tracking";
      case "/drivers": return "Driver Performance";
      case "/analytics": return "Financial Analytics";
      default: return "FleetFlow";
    }
  };

  return (
    <nav className="navbar w-full sticky top-0 z-2 backdrop-blur bg-base-100/90">
      <label
        htmlFor="my-drawer-4"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
        {/* Sidebar toggle icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          fill="none"
          stroke="currentColor"
          className="my-1.5 inline-block size-4"
        >
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
          <path d="M9 4v16"></path>
          <path d="M14 10l2 2l-2 2"></path>
        </svg>
      </label>
      <div className="flex-1 flex items-center gap-2">
        <label
          htmlFor="my-drawer-4"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="size-5"
          >
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 4v16"></path>
            <path d="M14 10l2 2l-2 2"></path>
          </svg>
        </label>
        
        <h1 className="text-lg font-bold px-2 text-slate-700">
          {getTitle(location.pathname)}
        </h1>
      </div>

      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost btn-circle avatar border-2 border-blue-100"
          >
            <div className="w-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <span className="text-xs font-bold">JD</span>
            </div>
          </div>
          
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-200"
          >
            <div className="px-4 py-2 border-b border-base-100 mb-2">
              <p className="font-bold text-sm">James Decker</p>
              <p className="text-[10px] text-slate-500 uppercase">Fleet Manager</p>
            </div>
            <li>
              <a className="flex justify-between">
                Profile <MdPerson size={18} />
              </a>
            </li>
            <li>
              <a>Settings <MdSettings size={18} /></a>
            </li>
            <hr className="my-1 opacity-50" />
            <li>
              <button className="text-error hover:bg-error/10">
                Logout <MdLogout size={18} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
