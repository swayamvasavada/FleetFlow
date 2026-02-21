import React from 'react';
import { MdSearch, MdFilterList } from 'react-icons/md';
import { HiOutlineSortAscending, HiOutlineViewGrid } from 'react-icons/hi';

function DriverManagementPage() {
  // Data points precisely from your Driver sketch
  const drivers = [
    { name: 'John', license: '23223', expiry: '22/36', completion: '92%', safety: '89%', complaints: 4 },
    { name: 'John', license: '23223', expiry: '22/36', completion: '92%', safety: '89%', complaints: 4 },
    { name: 'John', license: '23223', expiry: '22/36', completion: '92%', safety: '89%', complaints: 4 },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-6 font-sans">
      
      {/* Global Fleet Flow Header */}
      <header className="flex flex-col gap-4 mb-8 md:flex-row md:items-center">
        <div className="form-control flex-1">
          <div className="input-group flex items-center bg-base-100 rounded-lg border border-base-300 px-4 py-2 shadow-sm focus-within:border-primary">
            <MdSearch size={22} className="text-base-content/50" />
            <input 
              type="text" 
              placeholder="Search bar ......" 
              className="input w-full focus:outline-none border-none bg-transparent" 
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="btn btn-sm btn-outline gap-2 font-medium bg-base-100 border-base-300">
            <HiOutlineViewGrid size={18}/> Group by
          </button>
          <button className="btn btn-sm btn-outline gap-2 font-medium bg-base-100 border-base-300">
            <MdFilterList size={18}/> Filter
          </button>
          <button className="btn btn-sm btn-outline gap-2 font-medium bg-base-100 border-base-300">
            <HiOutlineSortAscending size={18}/> Sort by...
          </button>
        </div>
      </header>

      {/* Driver Performance Table */}
      <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Header - Rose color & text size matching your sketch */}
            <thead className="text-rose-600 bg-base-200/50">
              <tr className="text-lg capitalize tracking-tight">
                <th className="py-5">Name</th>
                <th>License#</th>
                <th>Expiry</th>
                <th>Completion Rate</th>
                <th>Safety Score</th>
                <th>Complaints</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {drivers.map((driver, index) => (
                <tr key={index} className="hover:bg-base-200/30 transition-colors border-b border-base-200">
                  <td className="font-bold text-slate-700">{driver.name}</td>
                  <td className="font-mono">{driver.license}</td>
                  <td className="font-mono">{driver.expiry}</td>
                  <td className="font-mono text-blue-600 font-bold">{driver.completion}</td>
                  <td className="font-mono text-blue-600 font-bold">{driver.safety}</td>
                  <td className="font-semibold text-rose-500">{driver.complaints}</td>
                </tr>
              ))}
              
              {/* Systematic Dot Indicators from your hand-drawn sketch */}
              {[...Array(15)].map((_, i) => (
                <tr key={`spacer-${i}`} className="opacity-30 border-none">
                  <td colSpan={6} className="py-3">
                    <div className="h-1.5 w-1.5 bg-slate-900 rounded-full ml-4"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DriverManagementPage;