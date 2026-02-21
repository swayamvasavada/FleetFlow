import React from 'react';

function AnalyticsPage() {

  const fuelData = [
    { name: 'Jan', trend: 5, actual: 55 },
    { name: 'Mar', trend: 25, actual: 15 },
    { name: 'Jun', trend: 40, actual: 75 },
    { name: 'Sep', trend: 55, actual: 10 },
    { name: 'Dec', trend: 85, actual: 95 },
  ];

  // Data for the Costliest Vehicles Bar Chart
  const costData = [
    { name: 'VAN-03', cost: 12 },
    { name: 'TRK-05', cost: 20 },
    { name: 'TRK-01', cost: 45 },
    { name: 'TRK-08', cost: 65 },
    { name: 'TRK-02', cost: 100 },
  ];

  const summaryData = [
    { month: 'Jan', revenue: 'Rs. 17L', fuel: 'Rs. 6L', maintenance: 'Rs. 2L', profit: 'Rs. 9L' },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-6 font-sans">
      
      {/* Top Metric Cards - Green borders from sketch */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Fuel Cost', val: 'Rs. 2.6 L', color: 'text-emerald-600' },
          { label: 'Fleet ROI', val: '+ 12.5%', color: 'text-emerald-600' },
          { label: 'Utilization Rate', val: '82%', color: 'text-emerald-600' }
        ].map((stat, i) => (
          <div key={i} className="card bg-base-100 border-2 border-emerald-500 shadow-sm p-6 items-center">
            <div className={`text-xl font-bold mb-2 ${stat.color}`}>{stat.label}</div>
            <div className="text-3xl font-black">{stat.val}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Fuel Efficiency Trend */}
        <div className="card bg-base-100 shadow-xl p-4 border border-base-300">
          <h3 className="text-center font-bold text-lg mb-4">Fuel Efficiency Trend (kmL)</h3>
          <div className="h-64 w-full">
            {/* <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fuelData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="actual" stroke="#1e293b" strokeWidth={3} dot={{ r: 6 }} />
                <Line type="monotone" dataKey="trend" stroke="#94a3b8" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer> */}
          </div>
        </div>

        {/* Top 5 Costliest Vehicles */}
        <div className="card bg-base-100 shadow-xl p-4 border border-base-300">
          <h3 className="text-center font-bold text-lg mb-4">Top 5 Costliest Vehicles</h3>
          <div className="h-64 w-full">
            {/* <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="cost" fill="#334155" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer> */}
          </div>
        </div>
      </div>

      {/* Financial Summary Table */}
      <div className="flex justify-center mb-4">
        <div className="badge badge-outline badge-primary border-2 p-4 font-bold text-lg rounded-lg">
          Financial Summary of Month
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
        <table className="table w-full">
          <thead className="text-rose-600 bg-base-200/50">
            <tr className="text-lg">
              <th className="py-4">Month</th>
              <th>Revenue</th>
              <th>Fuel Cost</th>
              <th>Maintenance</th>
              <th>Net Profit</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {summaryData.map((row, i) => (
              <tr key={i} className="border-b border-base-200 font-medium">
                <td>{row.month}</td>
                <td>{row.revenue}</td>
                <td>{row.fuel}</td>
                <td>{row.maintenance}</td>
                <td className="text-blue-600 font-bold">{row.profit}</td>
              </tr>
            ))}
            {/* Visual spacer dots from sketch */}
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="opacity-20 border-none">
                <td colSpan={5} className="py-2">
                  <div className="h-1.5 w-1.5 bg-current rounded-full ml-4"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnalyticsPage
