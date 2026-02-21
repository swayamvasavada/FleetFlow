import React, { useEffect, useState } from 'react';
import { MdSearch, MdFilterList, MdAdd } from 'react-icons/md';
import { HiOutlineSortAscending, HiOutlineViewGrid } from 'react-icons/hi';
import { useForm } from "react-hook-form";

interface TripFormData {
  vehicle: string;
  weight: number;
  driver: string;
  origin: string;
  destination: string;
  fuelCost: string;
}

function TripDispatcherPage() {

  const [openModal, setOpenModal] = useState(false);

  const activeTrips = [
    { id: 1, type: 'Trailer Truck', origin: 'Mumbai', destination: 'Pune', status: 'On way' },
    { id: 2, type: 'Leyland Truck', origin: 'Ahmedabad', destination: 'Rajkot', status: 'On way' },
    { id: 3, type: 'Volvo Truck', origin: 'Mumbai', destination: 'Pune', status: 'On way' },
    { id: 4, type: 'Mercedes Truck', origin: 'Ahmedabad', destination: 'Rajkot', status: 'On way' },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TripFormData>();

  useEffect(() => {
    if (openModal) {
      reset();
    }
  }, [openModal, reset]);

  const onSubmit = (data: TripFormData) => {
    const tripPayload = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    console.log("Trip Payload:", tripPayload);
    setOpenModal(false);
  };

  const labelStyle = "label text-primary text-sm mb-2 font-semibold";
  const inputBase = "input input-bordered w-full bg-base-100";
  const selectBase = "select select-bordered w-full bg-base-100";
  const errorText = "text-error text-xs mt-1";

  return (
    <div className="min-h-screen bg-base-200 p-6 font-sans">

      {/* 🔹 Header (same structure as dashboard) */}
      <header className="flex flex-col gap-4 mb-8 md:flex-row md:items-center">

        <div className="form-control flex-1">
          <div className="input-group flex items-center bg-base-100 rounded-lg border border-base-300 px-3 shadow-sm focus-within:border-primary">
            <MdSearch size={22} className="text-base-content/50" />
            <input
              type="text"
              placeholder="Search trips..."
              className="input w-full border-none bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-outline btn-primary gap-2 px-6">
            <HiOutlineViewGrid size={18} /> Group
          </button>

          <button className="btn btn-outline btn-primary gap-2 px-6">
            <MdFilterList size={18} /> Filter
          </button>

          <button className="btn btn-outline btn-primary gap-2 px-6">
            <HiOutlineSortAscending size={18} /> Sort
          </button>
        </div>
      </header>

      {/* 🔹 Action Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setOpenModal(true)}
          className="btn btn-outline btn-primary gap-2"
        >
          <MdAdd size={20} /> New Trip
        </button>
      </div>

      {/* 🔹 Active Trips Table */}
      <div className="card bg-base-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full py-2 px-4">
            <thead className="text-primary">
              <tr>
                <th>Trip</th>
                <th className="text-center">Fleet Type</th>
                <th className="text-center">Origin</th>
                <th className="text-center">Destination</th>
                <th className="text-right">Status</th>
              </tr>
            </thead>

            <tbody>
              {activeTrips.map((trip) => (
                <tr key={trip.id} className="hover">
                  <th className="text-base-content/70">{trip.id}</th>
                  <td className="text-center font-semibold">{trip.type}</td>
                  <td className="text-center">{trip.origin}</td>
                  <td className="text-center">{trip.destination}</td>
                  <td className="text-right font-bold text-primary">{trip.status}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* 🔹 Modal */}
      <dialog className={`modal ${openModal ? "modal-open" : ""}`}>
        <div className="modal-box max-w-3xl">

          <h3 className="font-bold text-lg mb-6 text-primary">
            New Trip Form
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Vehicle */}
            <div className="form-control">
              <label className={labelStyle}>Select Vehicle</label>
              <select
                {...register("vehicle", { required: "Vehicle is required" })}
                className={`${selectBase} ${errors.vehicle && "select-error"}`}
              >
                <option value="">Choose from active fleet</option>
                <option>Trailer Truck - MH 12</option>
                <option>Mini Van - KA 01</option>
              </select>
              {errors.vehicle && <span className={errorText}>{errors.vehicle.message}</span>}
            </div>

            {/* Weight + Driver */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="form-control">
                <label className={labelStyle}>Cargo Weight (Kg)</label>
                <input
                  type="number"
                  placeholder="Enter weight"
                  className={`${inputBase} ${errors.weight && "input-error"}`}
                  {...register("weight", {
                    required: "Weight is required",
                    min: { value: 1, message: "Weight must be positive" }
                  })}
                />
                {errors.weight && <span className={errorText}>{errors.weight.message}</span>}
              </div>

              <div className="form-control">
                <label className={labelStyle}>Select Driver</label>
                <select
                  {...register("driver", { required: "Driver is required" })}
                  className={`${selectBase} ${errors.driver && "select-error"}`}
                >
                  <option value="">Select available driver</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                </select>
                {errors.driver && <span className={errorText}>{errors.driver.message}</span>}
              </div>

            </div>

            {/* Origin + Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="form-control">
                <label className={labelStyle}>Origin Address</label>
                <input
                  type="text"
                  placeholder="Pickup location"
                  className={`${inputBase} ${errors.origin && "input-error"}`}
                  {...register("origin", { required: "Origin is required" })}
                />
                {errors.origin && <span className={errorText}>{errors.origin.message}</span>}
              </div>

              <div className="form-control">
                <label className={labelStyle}>Destination</label>
                <input
                  type="text"
                  placeholder="Drop-off location"
                  className={`${inputBase} ${errors.destination && "input-error"}`}
                  {...register("destination", { required: "Destination is required" })}
                />
                {errors.destination && <span className={errorText}>{errors.destination.message}</span>}
              </div>

            </div>

            {/* Fuel Cost */}
            <div className="form-control">
              <label className={labelStyle}>Estimated Fuel Cost</label>

              <div className="join w-full">
                <span className="join-item flex items-center px-3 bg-base-200 border border-base-300">₹</span>

                <input
                  type="number"
                  placeholder="Cost"
                  className={`join-item input input-bordered w-full ${errors.fuelCost && "input-error"}`}
                  {...register("fuelCost", { required: "Fuel cost is required" })}
                />
              </div>

              {errors.fuelCost && <span className={errorText}>{errors.fuelCost.message}</span>}
            </div>

            {/* Actions */}
            <div className="modal-action">

              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary px-8">
                Confirm Trip
              </button>

            </div>

          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setOpenModal(false)}>close</button>
        </form>
      </dialog>

    </div>
  );
}

export default TripDispatcherPage;
