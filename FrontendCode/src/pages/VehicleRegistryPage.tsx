import React from 'react';
import { MdSearch, MdFilterList, MdAdd, MdClose } from 'react-icons/md';
import { HiOutlineSortAscending, HiOutlineViewGrid } from 'react-icons/hi';

function VehicleRegistryPage() {
  // Data points taken directly from your sketch
  const vehicles = [
    { no: 1, plate: 'MH 00', model: '2017', type: 'Mini', capacity: '5 tonn', odometer: '79000', status: 'Idle' },
    { no: 2, plate: 'KA 01', model: '8900', type: 'Truck', capacity: '15 trip', odometer: '32000 km', status: 'On Trip' },
    { no: 3, plate: 'Spreinter', model: 'Truck', type: 'Truck', capacity: 'On Trip', odometer: '151000 km', status: 'Idle' },
    { no: 4, plate: 'DL 05', model: '4567', type: 'Truck', capacity: '15 tonn', odometer: 'badge', status: 'p-3' },
    { no: 5, plate: 'MegaMover', model: 'Van', type: 'Van', capacity: '10 tonn', odometer: 'badge', status: 'gap-3' },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-6 font-sans">
      
      {/* Header & Search Area - Matching your sketch layout */}
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
          <button className="btn btn-sm btn-outline gap-2 font-medium bg-base-100">
            <HiOutlineViewGrid size={18}/> Group by
          </button>
          <button className="btn btn-sm btn-outline gap-2 font-medium bg-base-100">
            <MdFilterList size={18}/> Filter
          </button>
          <button className="btn btn-sm btn-outline gap-2 font-medium bg-base-100">
            <HiOutlineSortAscending size={18}/> Sort by...
          </button>
        </div>
      </header>

      {/* Action Button - Placed according to your sketch */}
      <div className="flex justify-end mb-6">
        <button className="btn btn-outline btn-primary gap-2 rounded-xl border-2 px-6">
          <MdAdd size={22}/> New Vehicle
        </button>
      </div>

      {/* Vehicle Table Area */}
      <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* table head - used rose color from your sketch markers */}
            <thead className="text-rose-500 bg-base-200/50">
              <tr className="text-sm uppercase tracking-wider">
                <th>NO</th>
                <th>Plate</th>
                <th>Model</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Odometer</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-base-content">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.no} className="hover transition-colors border-b border-base-200">
                  <th className="font-bold">{vehicle.no}</th>
                  <td className="font-semibold">{vehicle.plate}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.capacity}</td>
                  <td className="font-mono text-sm">{vehicle.odometer}</td>
                  <td>
                    <div className={`badge badge-md gap-2 p-3 font-bold border-none ${
                      vehicle.status === 'Idle' ? 'bg-emerald-500 text-white' : 
                      vehicle.status === 'On Trip' ? 'bg-amber-500 text-white' : 'bg-slate-400 text-white'
                    }`}>
                      {vehicle.status}
                    </div>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-ghost btn-xs text-orange-500 hover:bg-orange-50">
                      <MdClose size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {/* Visual filler rows to match the "dots" in your hand-drawn sketch */}
              {[...Array(3)].map((_, i) => (
                <tr key={`empty-${i}`} className="opacity-20">
                  <td colSpan={8} className="py-4">
                    <div className="h-1.5 w-1.5 bg-current rounded-full ml-4"></div>
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

export default VehicleRegistryPage;