import { MdSearch, MdFilterList, MdAdd } from 'react-icons/md';
import { HiOutlineSortAscending, HiOutlineViewGrid } from 'react-icons/hi';
import { useEffect } from 'react';
import { apiStore } from '../store/apiStore';

function MainDashboardPage() {
  const stats = [
    { label: 'Active Fleet', value: 220, badge: 'badge-success', textColor: 'text-success' },
    { label: 'Maintenance Alert', value: 180, badge: 'badge-warning', textColor: 'text-warning' },
    { label: 'Pending Cargo', value: 20, badge: 'badge-info', textColor: 'text-info' },
  ];

  const trips = [
    { id: 1, vehicle: 'VOLVO-FH16-8922', driver: 'John Doe', status: 'IN_TRANSIT' },
    { id: 2, vehicle: 'SCANIA-R500-1120', driver: 'Jane Smith', status: 'IN_TRANSIT' },
    { id: 3, vehicle: 'MERC-ACTROS-4451', driver: 'Mike Ross', status: 'IN_SHOP' },
    { id: 4, vehicle: 'TATA-PRIMA-9908', driver: 'Harvey Specter', status: 'RETIRED' },
  ];

  const {fleetUtilization} = apiStore()

  useEffect(() => {
    fleetUtilization()
  }, [fleetUtilization])

  const getStatusConfig = (status: any) => {
    switch (status) {
      case 'IN_TRANSIT':
        return { label: 'On Trip', className: 'badge-warning text-warning-content' };
      case 'IN_SHOP':
        return { label: 'Maintenance', className: 'badge-error text-error-content' };
      case 'RETIRED':
        return { label: 'Outdated', className: 'badge-ghost opacity-70' };
      default:
        return { label: status, className: 'badge-info' };
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

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mb-6">
        <button className="btn btn-primary gap-2 text-white">
          <MdAdd size={20} /> New Trip
        </button>
        <button className="btn btn-primary gap-2 text-white">
          <MdAdd size={20} /> New Vehicle
        </button>
      </div>

      {/* daisyUI Stats Component */}
      <div className="stats shadow w-full mb-8 bg-base-100">
        {stats.map((stat, index) => (
          <div key={index} className="stat place-items-center">
            <div className={`stat-title font-bold ${stat.textColor}`}>{stat.label}</div>
            <div className="stat-value text-base-content">{stat.value}</div>
            <div className={`stat-desc badge ${stat.badge} badge-outline mt-2`}>Updated just now</div>
          </div>
        ))}
      </div>

      {/* Trip Table Area */}
      <div className="card bg-base-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full py-2">
            {/* head */}
            <thead className="text-primary">
              <tr>
                <th>Trip ID</th>
                <th>Vehicle Details</th>
                <th>Driver Name</th>
                <th>Current Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => {
                const config = getStatusConfig(trip.status);
                return (
                  <tr key={trip.id} className="hover">
                    <th className="text-base-content/70">{trip.id}</th>
                    <td>
                      <div className="font-mono font-bold text-sm">{trip.vehicle}</div>
                      <div className="text-xs opacity-50">Heavy Duty Hauler</div>
                    </td>
                    <td>{trip.driver}</td>
                    <td>
                      <div className={`badge ${config.className} gap-2 py-4 px-4 font-bold text-xs uppercase tracking-wide rounded-md`}>
                        {config.label}
                      </div>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs">Details</button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MainDashboardPage;