import React from 'react';
import { MdSearch, MdFilterList, MdAdd } from 'react-icons/md';
import { HiOutlineSortAscending, HiOutlineViewGrid } from 'react-icons/hi';

function ExpenseLogPage() {
  // Data directly from your Expenses sketch
  const expenses = [
    { 
      tripId: 321, 
      driver: 'John', 
      distance: '1000 km', 
      fuel: '19k', 
      misc: '3k', 
      status: 'Done' 
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-6 font-sans">
      
      {/* Fleet Flow Global Header */}
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

      {/* Action Button - Matching your blue outline style */}
      <div className="flex justify-end mb-6">
        <button className="btn btn-outline btn-primary gap-2 rounded-xl border-2 px-6 shadow-sm">
          <MdAdd size={22}/> Add an Expense
        </button>
      </div>

      {/* Expense Table Area */}
      <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head - Rose colored headers from sketch */}
            <thead className="text-rose-600 bg-base-200/50">
              <tr className="text-lg">
                <th className="py-5">Trip ID</th>
                <th>Driver</th>
                <th>Distance</th>
                <th>Fuel Expense</th>
                <th>Misc. Expen</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {expenses.map((item, index) => (
                <tr key={index} className="hover:bg-base-200/30 transition-colors border-b border-base-200">
                  <th className="font-semibold">{item.tripId}</th>
                  <td className="font-medium">{item.driver}</td>
                  <td className="font-mono text-blue-600">{item.distance}</td>
                  <td className="font-mono text-blue-600">{item.fuel}</td>
                  <td className="font-mono text-blue-600">{item.misc}</td>
                  <td>
                    <div className="badge badge-neutral font-bold px-4 py-3">
                      {item.status}
                    </div>
                  </td>
                </tr>
              ))}
              
              {/* Dot indicators for empty rows from your sketch */}
              {[...Array(8)].map((_, i) => (
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

export default ExpenseLogPage;