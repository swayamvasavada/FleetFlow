import React, { useEffect, useState } from 'react';
import { MdSearch, MdFilterList, MdAdd, MdClose } from 'react-icons/md';
import { HiOutlineSortAscending, HiOutlineViewGrid } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { apiStore } from '../store/apiStore'

interface VehicleFormData {
  licensePlate: string;
  maxLoadCapacity: number;
  odometerReading: number;
  vehicleType: string;
  model: string;
  vehicleId: number;
  VehicleStatus: string;
  isRetired: boolean
}

function VehicleRegistryPage() {

  const { vehicles, loading, error, fetchAllVehicles } = apiStore();

  useEffect(() => {
    fetchAllVehicles();
  }, [fetchAllVehicles]);

  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormData>();

  useEffect(() => {
    if (openModal) {
      reset();
    }
  }, [openModal, reset]);

  const onSubmit = (data: VehicleFormData) => {
    const vehiclePayload = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    console.log("Vehicle Payload:", vehiclePayload);
    setOpenModal(false);
  };

  if (loading) return <div className="p-10 text-center text-xl font-bold">Loading vehicles...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  const labelStyle = "label text-primary text-sm mb-2 font-semibold";
  const inputBase = "input input-bordered w-full bg-base-100";
  const selectBase = "select select-bordered w-full bg-base-100";
  const errorText = "text-error text-xs mt-1";

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

      {/* Action Button - Placed according to your sketch */}
      <div className="flex justify-end mb-6">
        <button className="btn btn-outline btn-primary gap-2 border-2 px-6" onClick={() => setOpenModal(true)}>
          <MdAdd size={22} /> New Vehicle
        </button>
      </div>

      {/* Vehicle Table Area */}
      <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table w-full py-2">
            {/* table head - used rose color from your sketch markers */}
            <thead className="text-primary">
              <tr className="text-sm uppercase tracking-wider">
                <th>License Plate</th>
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
                <tr key={vehicle.licensePlate} className="hover:bg-gray-50">
                  <td className="font-semibold">{vehicle.licensePlate}</td>

                  <td>{vehicle.model}</td>

                  <td>{vehicle.vehicleType}</td>

                  <td>{vehicle.maxLoadCapacity}</td>

                  <td className="text-sm">{vehicle.odometerReading}</td>

                  <td>
                    <span
                      className={`badge badge-md p-3 font-bold text-white
            ${vehicle.VehicleStatus === "Idle"
                          ? "bg-emerald-500"
                          : vehicle.VehicleStatus === "On Trip"
                            ? "bg-amber-500"
                            : "bg-slate-400"
                        }`}
                    >
                      {vehicle.VehicleStatus}
                    </span>
                  </td>

                  <td className="text-center">
                    <button className="btn btn-ghost btn-xs text-orange-500 hover:bg-orange-50">
                      <MdClose size={20} />
                    </button>
                  </td>
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
            New Vehicle Registration
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* License Plate */}
            <div className="form-control">
              <label className={labelStyle}>License Plate</label>
              <input
                type="text"
                placeholder="Enter license plate"
                className={`${inputBase} ${errors.licensePlate && "input-error"}`}
                {...register("licensePlate", { required: "License plate is required" })}
              />
              {errors.licensePlate && <span className={errorText}>{errors.licensePlate.message}</span>}
            </div>

            {/* Max Payload */}
            <div className="form-control">
              <label className={labelStyle}>Max Payload (Kg)</label>
              <input
                type="number"
                placeholder="Enter payload"
                className={`${inputBase} ${errors.maxLoadCapacity && "input-error"}`}
                {...register("maxLoadCapacity", {
                  required: "Max payload is required",
                  min: { value: 1, message: "Payload must be positive" }
                })}
              />
              {errors.maxLoadCapacity && <span className={errorText}>{errors.maxLoadCapacity.message}</span>}
            </div>

            {/* Initial Odometer */}
            <div className="form-control">
              <label className={labelStyle}>Initial Odometer</label>
              <input
                type="number"
                placeholder="Enter reading"
                className={`${inputBase} ${errors.odometerReading && "input-error"}`}
                {...register("odometerReading", {
                  required: "Odometer is required",
                  min: { value: 0, message: "Cannot be negative" }
                })}
              />
              {errors.odometerReading && <span className={errorText}>{errors.odometerReading.message}</span>}
            </div>

            {/* Type */}
            <div className="form-control">
              <label className={labelStyle}>Vehicle Type</label>
              <select
                {...register("vehicleType", { required: "Type is required" })}
                className={`${selectBase} ${errors.vehicleType && "select-error"}`}
              >
                <option value="">Select type</option>
                <option>Truck</option>
                <option>Van</option>
                <option>Trailer</option>
              </select>
              {errors.vehicleType && <span className={errorText}>{errors.vehicleType.message}</span>}
            </div>

            {/* Model */}
            <div className="form-control">
              <label className={labelStyle}>Model</label>
              <input
                type="text"
                placeholder="Enter model"
                className={`${inputBase} ${errors.model && "input-error"}`}
                {...register("model", { required: "Model is required" })}
              />
              {errors.model && <span className={errorText}>{errors.model.message}</span>}
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
                Save Vehicle
              </button>
            </div>

          </form>
        </div>
      </dialog>
    </div>
  );
}

export default VehicleRegistryPage;