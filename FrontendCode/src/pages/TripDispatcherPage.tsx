import React from 'react';
import { MdSearch, MdFilterList, MdAdd, MdDirectionsBus } from 'react-icons/md';
import { HiOutlineSortAscending, HiOutlineViewGrid } from 'react-icons/hi';

function TripDispatcherPage() {
  const activeTrips = [
    { id: 1, type: 'Trailer Truck', origin: 'Mumbai', destination: 'Pune', status: 'On way' },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-base-100 rounded-[2rem] border-2 border-base-300 shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 border-b border-base-300">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Fleet Flow</h1>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
              <input 
                type="text" 
                placeholder="Search bar ......" 
                className="input input-bordered w-full pl-10 h-10 rounded-lg border-2" 
              />
            </div>
            <div className="flex gap-2">
              <button className="btn btn-sm btn-outline border-2 rounded-lg">Group by</button>
              <button className="btn btn-sm btn-outline border-2 rounded-lg">Filter</button>
              <button className="btn btn-sm btn-outline border-2 rounded-lg">Sort by...</button>
            </div>
          </div>
        </div>

        {/* Top Table: Active Trips Area */}
        <div className="overflow-x-auto px-6 pt-4">
          <table className="table w-full border-b-2 border-base-300">
            <thead>
              <tr className="text-rose-500 text-lg border-none">
                <th className="font-bold">Trip</th>
                <th className="font-bold text-center">Fleet Type</th>
                <th className="font-bold text-center">Origin</th>
                <th className="font-bold text-center">Destination</th>
                <th className="font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {activeTrips.map((trip) => (
                <tr key={trip.id} className="border-none text-base">
                  <td className="font-bold text-rose-500">{trip.id}</td>
                  <td className="text-center font-semibold">{trip.type}</td>
                  <td className="text-center">{trip.origin}</td>
                  <td className="text-center">{trip.destination}</td>
                  <td className="text-right text-rose-500 font-bold">{trip.status}</td>
                </tr>
              ))}
              {/* Dot indicators from sketch */}
              {[...Array(4)].map((_, i) => (
                <tr key={i} className="border-none opacity-20">
                  <td colSpan={5} className="py-2"><div className="h-1.5 w-1.5 bg-current rounded-full ml-2"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* New Trip Form Section */}
        <div className="p-8 bg-base-100">
          <div className="inline-block border-2 border-green-600 rounded-lg px-4 py-1 mb-8">
            <span className="text-green-700 font-bold">New Trip Form</span>
          </div>

          <form className="space-y-6 max-w-3xl">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="text-lg font-bold w-48">Select Vehicle:</label>
              <select className="select select-bordered border-2 rounded-xl flex-grow h-12 focus:border-green-600">
                <option disabled selected>Choose from active fleet</option>
                <option>Trailer Truck - MH 12</option>
                <option>Mini Van - KA 01</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="text-lg font-bold w-48">Cargo Weight (Kg):</label>
              <input type="number" placeholder="Enter weight" className="input input-bordered border-2 rounded-xl flex-grow h-12" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="text-lg font-bold w-48">Select Driver:</label>
              <select className="select select-bordered border-2 rounded-xl flex-grow h-12">
                <option disabled selected>Select available driver</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="text-lg font-bold w-48">Origin Address:</label>
              <input type="text" placeholder="Pickup location" className="input input-bordered border-2 rounded-xl flex-grow h-12" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="text-lg font-bold w-48">Destination:</label>
              <input type="text" placeholder="Drop-off location" className="input input-bordered border-2 rounded-xl flex-grow h-12" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="text-lg font-bold w-48">Estimated Fuel Cost:</label>
              <input type="text" placeholder="Cost in ₹" className="input input-bordered border-2 rounded-xl flex-grow h-12" />
            </div>

            <div className="pt-6">
              <button className="btn btn-outline border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white rounded-xl px-10 text-lg font-bold transition-all shadow-md">
                Confirm & Dispatch Trip
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TripDispatcherPage
