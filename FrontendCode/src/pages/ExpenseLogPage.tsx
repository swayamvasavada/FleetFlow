import React from "react";
import { MdSearch, MdFilterList, MdAdd } from "react-icons/md";
import { HiOutlineSortAscending, HiOutlineViewGrid } from "react-icons/hi";

function ExpenseLogPage() {
  // Data directly from your Expenses sketch
  const expenses = [
    { tripId: 321, driver: "John", distance: "1000 km", fuel: "19k", misc: "3000", status: "Done", },
    { tripId: 321, driver: "John", distance: "1000 km", fuel: "19k", misc: "3000", status: "Done", },
    { tripId: 321, driver: "John", distance: "1000 km", fuel: "19k", misc: "3000", status: "Done", },
    { tripId: 321, driver: "John", distance: "1000 km", fuel: "19k", misc: "3000", status: "Done", },
    { tripId: 321, driver: "John", distance: "1000 km", fuel: "19k", misc: "3000", status: "Done", },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-6 font-sans">
      {/* Fleet Flow Global Header */}
      <header className="flex flex-col gap-4 mb-8 md:flex-row md:items-center">
        <div className="form-control flex-1">
          <div className="input-group flex items-center bg-base-100 rounded-lg border border-base-300 px-3 shadow-sm focus-within:border-primary">
            <MdSearch size={22} className="text-base-content/50" />
            <input
              type="text"
              placeholder="Search fleet..."
              className="input w-full focus:outline-none border-none bg-transparent"
            />
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

      {/* Action Button - Matching your blue outline style */}
      <div className="flex justify-end mb-6">
        <button className="btn btn-outline btn-primary gap-2 border-2 px-6 shadow-sm">
          <MdAdd size={22} /> Add an Expense
        </button>
      </div>

      {/* Expense Table Area */}
      <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table w-full py-2">

            <thead className="text-primary">
              <tr>
                <th>Trip ID</th>
                <th>Driver</th>
                <th>Distance</th>
                <th>Fuel Expense</th>
                <th>Misc. Expen</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((item, index) => (
                <tr key={index} className="hover">

                  <th className="text-base-content/70">
                    {item.tripId}
                  </th>

                  <td className="font-medium">
                    {item.driver}
                  </td>

                  <td>
                    <div className=" font-bold text-sm text-primary">
                      {item.distance}
                    </div>
                  </td>

                  <td>
                    <div className=" font-bold text-sm text-primary">
                      {item.fuel}
                    </div>
                  </td>

                  <td>
                    <div className=" font-bold text-sm text-primary">
                      {item.misc}
                    </div>
                  </td>

                  <td>
                    <div className="badge badge-primary gap-2 py-4 px-4 font-bold text-xs uppercase tracking-wide rounded-md">
                      {item.status}
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

export default ExpenseLogPage;
