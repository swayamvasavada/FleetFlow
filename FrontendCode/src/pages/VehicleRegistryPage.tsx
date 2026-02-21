import React, { useEffect, useState } from 'react';
import { MdSearch, MdFilterList, MdAdd, MdClose } from 'react-icons/md';
import { HiOutlineSortAscending, HiOutlineViewGrid } from 'react-icons/hi';
import { useForm } from 'react-hook-form';

interface VehicleFormData {
  licensePlate: string;
  maxPayload: number;
  odometer: number;
  type: string;
  model: string;
}

function VehicleRegistryPage() {

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

  // Data points taken directly from your sketch
  const vehicles = [
    { no: 1, plate: 'MH 00', model: '2017', type: 'Mini', capacity: '5 tonn', odometer: '79000', status: 'Idle' },
    { no: 2, plate: 'KA 01', model: '8900', type: 'Truck', capacity: '15 trip', odometer: '32000 km', status: 'On Trip' },
    { no: 3, plate: 'Spreinter', model: 'Truck', type: 'Truck', capacity: 'On Trip', odometer: '151000 km', status: 'Idle' },
    { no: 4, plate: 'DL 05', model: '4567', type: 'Truck', capacity: '15 tonn', odometer: 'badge', status: 'Idle' },
    { no: 5, plate: 'MegaMover', model: 'Van', type: 'Van', capacity: '10 tonn', odometer: 'badge', status: 'On Trip' },
  ];

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
                <th>NO.</th>
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
                  <td className="text-sm">{vehicle.odometer}</td>
                  <td>
                    <div className={`badge badge-md gap-2 p-3 font-bold border-none ${vehicle.status === 'Idle' ? 'bg-emerald-500 text-white' :
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
                className={`${inputBase} ${errors.maxPayload && "input-error"}`}
                {...register("maxPayload", {
                  required: "Max payload is required",
                  min: { value: 1, message: "Payload must be positive" }
                })}
              />
              {errors.maxPayload && <span className={errorText}>{errors.maxPayload.message}</span>}
            </div>

            {/* Initial Odometer */}
            <div className="form-control">
              <label className={labelStyle}>Initial Odometer</label>
              <input
                type="number"
                placeholder="Enter reading"
                className={`${inputBase} ${errors.odometer && "input-error"}`}
                {...register("odometer", {
                  required: "Odometer is required",
                  min: { value: 0, message: "Cannot be negative" }
                })}
              />
              {errors.odometer && <span className={errorText}>{errors.odometer.message}</span>}
            </div>

            {/* Type */}
            <div className="form-control">
              <label className={labelStyle}>Vehicle Type</label>
              <select
                {...register("type", { required: "Type is required" })}
                className={`${selectBase} ${errors.type && "select-error"}`}
              >
                <option value="">Select type</option>
                <option>Truck</option>
                <option>Van</option>
                <option>Trailer</option>
              </select>
              {errors.type && <span className={errorText}>{errors.type.message}</span>}
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