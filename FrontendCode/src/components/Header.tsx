import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdLogout, MdPerson, MdSettings } from "react-icons/md";
import { useAuthStore } from "../store/authStore"; // 1. Import your store

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 2. Pull user and logout from store
  const { user, logout } = useAuthStore();

  const getTitle = (path: string) => {
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

  console.log("user>>", user)

  // 3. Helper to get initials (e.g., "John Doe" -> "JD")
  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2) || "??";
  };

  // 4. Handle Logout
  const handleLogout = () => {
    logout();
    navigate("/login"); // Optional: ProtectedRoute usually handles this, but explicit is fine
  };

  return (
    <nav className="navbar w-full sticky top-0 z-[10] backdrop-blur bg-base-100/90 border-b border-base-200">
      {/* Drawer Toggle (Desktop) */}
      <label
        htmlFor="my-drawer-4"
        className="btn btn-square btn-ghost hidden lg:inline-flex"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </label>

      <div className="flex-1">
        {/* Mobile Toggle */}
        <label
          htmlFor="my-drawer-4"
          className="btn btn-square btn-ghost lg:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
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
            className="btn btn-ghost btn-circle avatar border-2 border-primary/20"
          >
            <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
              {/* 5. Dynamic Initials */}
              <span className="text-xs font-bold">{getInitials(user?.name || "User")}</span>
            </div>
          </div>
          
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-200"
          >
            <div className="px-4 py-2 border-b border-base-100 mb-2">
              {/* 6. Dynamic Name and Role */}
              <p className="font-bold text-sm truncate">{user?.name || "Guest User"}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
                {user?.role?.replace("ROLE_", "") || "Unauthorized"}
              </p>
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
              {/* 7. Logout Trigger */}
              <button 
                onClick={handleLogout}
                className="text-error hover:bg-error/10 flex justify-between"
              >
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