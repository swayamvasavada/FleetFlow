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

      {/* Driver Performance Table */}
      <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table w-full py-2">

            <thead className="text-primary [&>tr>th]:pl-4">
              <tr>
                <th>Name</th>
                <th>License#</th>
                <th>Expiry</th>
                <th>Completion Rate</th>
                <th>Safety Score</th>
                <th>Complaints</th>
              </tr>
            </thead>

            <tbody className="[&>tr>th]:pl-4 [&>tr>td]:pl-4">

              {drivers.map((driver, index) => (
                <tr key={index} className="hover">

                  {/* Name */}
                  <th className="font-semibold text-base-content">
                    {driver.name}
                  </th>

                  {/* License */}
                  <td className="font-mono text-sm text-base-content/80">
                    {driver.license}
                  </td>

                  {/* Expiry */}
                  <td className="font-mono text-sm">
                    {driver.expiry}
                  </td>

                  {/* Completion */}
                  <td>
                    <div className="font-mono font-bold text-sm text-primary">
                      {driver.completion}
                    </div>
                  </td>

                  {/* Safety */}
                  <td>
                    <div className="font-mono font-bold text-sm text-primary">
                      {driver.safety}
                    </div>
                  </td>

                  {/* Complaints */}
                  <td>
                    <div className="badge badge-primary font-bold px-4 py-3 rounded-md">
                      {driver.complaints}
                    </div>
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