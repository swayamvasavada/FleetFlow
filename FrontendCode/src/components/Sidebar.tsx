import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdDirectionsBus, MdPayments, MdSettings, MdPerson, MdBarChart } from 'react-icons/md';

function Sidebar() {
  const menuItems = [
    { label: "Dashboard", icon: MdDashboard, path: "/" },
    { label: "Vehicle Registry", icon: MdDirectionsBus, path: "/vehicles" },
    { label: "Trip Dispatcher", icon: MdDirectionsBus, path: "/trips" },
    { label: "Maintenance", icon: MdSettings, path: "/maintenance" },
    { label: "Expenses", icon: MdPayments, path: "/expenses" },
  ];

  return (
    <div className="drawer-side is-drawer-close:overflow-visible z-20">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      
      {/* Added 'transition-all duration-300' to the main container 
         to animate the width change (14 to 64) 
      */}
      <div className="flex min-h-full flex-col items-start bg-[#1a365d] text-slate-300 border-r border-slate-800 transition-all duration-300 ease-in-out is-drawer-close:w-16 is-drawer-open:w-64">
        
        {/* Logo Area */}
        <div className="p-4 flex items-center gap-3 w-full border-b border-slate-800 overflow-hidden">
          <div className="p-1.5 rounded-lg shrink-0">
            <MdDirectionsBus size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight whitespace-nowrap transition-all duration-300 is-drawer-close:opacity-0 is-drawer-close:w-0 is-drawer-open:opacity-100 is-drawer-open:w-auto">
            FleetFlow
          </span>
        </div>

        <ul className="menu p-3 w-full grow gap-2 overflow-x-hidden">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 whitespace-nowrap is-drawer-close:opacity-0">
            Main Menu
          </p>
          
          {menuItems.map((item) => (
            <li key={item.label} className="w-full">
              <Link to={item.path} className="flex items-center gap-4 hover:bg-slate-800 py-3">
                <item.icon size={22} className="shrink-0" />
                {/* TEXT ANIMATION LOGIC:
                   We use whitespace-nowrap to prevent text wrapping during the slide.
                   We transition opacity and width.
                */}
                <span className="whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden is-drawer-close:opacity-0 is-drawer-close:w-0 is-drawer-open:opacity-100 is-drawer-open:w-auto">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
          
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-6 mb-2 whitespace-nowrap is-drawer-close:opacity-0">
            Insights
          </p>
          <li>
            <Link to="/drivers" className="flex items-center gap-4 py-3">
              <MdPerson size={22} className="shrink-0" />
              <span className="whitespace-nowrap transition-all duration-300 overflow-hidden is-drawer-close:opacity-0 is-drawer-close:w-0 is-drawer-open:opacity-100 is-drawer-open:w-auto">
                Performance
              </span>
            </Link>
          </li>
          <li>
            <Link to="/analytics" className="flex items-center gap-4 py-3">
              <MdBarChart size={22} className="shrink-0" />
              <span className="whitespace-nowrap transition-all duration-300 overflow-hidden is-drawer-close:opacity-0 is-drawer-close:w-0 is-drawer-open:opacity-100 is-drawer-open:w-auto">
                Analytics
              </span>
            </Link>
          </li>
        </ul>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800 w-full overflow-hidden">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
              JD
            </div>
            <div className="text-xs transition-all duration-300 overflow-hidden is-drawer-close:opacity-0 is-drawer-close:w-0 is-drawer-open:opacity-100 is-drawer-open:w-auto">
              <p className="font-bold text-white whitespace-nowrap">James Decker</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;