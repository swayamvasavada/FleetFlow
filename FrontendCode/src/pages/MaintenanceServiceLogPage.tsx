import React from 'react';
import { MdSearch, MdFilterList, MdAdd } from 'react-icons/md';
import { HiOutlineSortAscending, HiOutlineViewGrid } from 'react-icons/hi';

function MaintenanceServiceLogPage() {
  // const serviceLogs = [
  //   {
  //     id: 321,
  //     vehicle: 'TATA',
  //     service: 'Engine Issue',
  //     date: '20/02',
  //     cost: '10k',
  //     status: 'New'
  //   },
  // ];

  const serviceLogs = [
    { id: 321, vehicle: 'TATA', service: 'Engine Issue', date: '20/02', cost: '10000', status: 'NEW' },
    { id: 322, vehicle: 'VOLVO', service: 'Oil Change', date: '21/02', cost: '10000', status: 'IN_TRANSIT' },
    { id: 323, vehicle: 'SCANIA', service: 'Brake Check', date: '22/02', cost: '10000', status: 'IN_SHOP' },
    { id: 324, vehicle: 'MERC', service: 'Retiring', date: '23/02', cost: '20000', status: 'RETIRED' },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'IN_TRANSIT':
        return {
          label: 'On Trip',
          className: 'bg-blue-100 text-blue-700 border-blue-200'
        };
      case 'IN_SHOP':
        return {
          label: 'Maintenance',
          className: 'bg-indigo-100 text-indigo-700 border-indigo-200'
        };
      case 'RETIRED':
        return {
          label: 'Outdated',
          className: 'bg-slate-100 text-slate-500 border-slate-200 opacity-70'
        };
      default:

        return {
          label: status,
          className: 'bg-blue-50 text-blue-600 border-blue-400'
        };
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6 font-sans">

      <header className="flex flex-col gap-4 mb-8 md:flex-row md:items-center">
        <div className="form-control flex-1">
          <div className="input-group flex items-center bg-base-100 rounded-lg border border-base-300 px-3 shadow-sm focus-within:border-primary">
            <MdSearch size={22} className="text-base-content/50" />
            <input type="text" placeholder="Search fleet..." className="input w-full focus:outline-none border-none bg-transparent" />
          </div>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-md btn-outline btn-primary gap-2 font-medium px-6 min-w-[120px] transition-all duration-300 hover:shadow-md">
            <HiOutlineViewGrid size={18} /> Group
          </button>

          <button className="btn btn-md btn-outline btn-primary gap-2 font-medium px-6 min-w-[120px] transition-all duration-300 hover:shadow-md">
            <MdFilterList size={18} /> Filter
          </button>

          <button className="btn btn-md btn-outline btn-primary gap-2 font-medium px-6 min-w-[120px] transition-all duration-300 hover:shadow-md">
            <HiOutlineSortAscending size={18} /> Sort
          </button>
        </div>
      </header>

      {/* Action Button - "Create New Service" */}
      <div className="flex justify-end mb-6">
        <button className="btn btn-outline btn-primary gap-2 border-1 px-6 shadow-sm">
          <MdAdd size={22} /> Create New Service
        </button>
      </div>

      {/* Service Log Table Area */}
      <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table w-full py-2">

            {/* table head - Using the pink/rose color from your sketch */}
            <thead className="text-primary">
              <tr className="text-lg">
                <th className="py-5">Log ID</th>
                <th>Vehicle</th>
                <th>Issue/Service</th>
                <th>Date</th>
                <th>Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {serviceLogs.map((log) => {
                const config = getStatusConfig(log.status);

                return (
                  <tr key={log.id} className="hover">
                    <td className="text-base-content/70">{log.id}</td>

                    <td>
                      <div className="font-bold text-sm">{log.vehicle}</div>
                      <div className="text-s opacity-50">Heavy Duty Hauler</div>
                    </td>

                    <td className="text-sm opacity-70 font-semibold">{log.service}</td>

                    <td className="text-sm">{log.date}</td>

                    <td className="font-semibold text-sm">
                      ₹{log.cost}
                    </td>

                    <td>
                      <div
                        className={`badge ${config.className} gap-2 py-4 px-4 font-bold text-xs uppercase tracking-wide rounded-md`}
                      >
                        {config.label}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceServiceLogPage
