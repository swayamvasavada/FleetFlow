import { create } from "zustand";
import { api } from "../utils/axiosConfig";
import { addVehicle, fleetUtilization, getAllVehicle } from "../constants/apiPath";

// interface ApiState {

// }
interface VehicleFormData {
  vehicleID: number;      // Match backend 'vehicleID'
  licensePlate: string;
  maxLoadCapacity: number;
  odometerReading: number;
  vehicleType: string;
  model: string;
  status: string;         // Match backend 'status'
  isRetired: boolean;
}

interface ApiState {
  vehicles: VehicleFormData[];
  loading: boolean;
  error: string | null;
  fetchAllVehicles: () => Promise<void>;
  addVehicle: (vehicle: VehicleFormData) => Promise<void>;
  fleetUtilization: any
}

export const apiStore = create<ApiState>((set) => ({
  vehicles: [],
  loading: false,
  error: null,
  fleetUtilization: [],

  // GET all vehicles
  // store/apiStore.ts

  fetchAllVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(getAllVehicle);

      // Target the specific list from your JSON structure
      const data = response.data?.serviceResult?.vehicleDTOList;

      console.log("Vehicles found:", data);

      set({
        vehicles: Array.isArray(data) ? data : [],
        loading: false,
      });
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch vehicles";
      set({ error: msg, loading: false });
    }
  },

  // POST new vehicle
  addVehicle: async (newVehicle: VehicleFormData) => {
    set({ loading: true, error: null });
    try {
        console.log(newVehicle)
      const response = await api.post(addVehicle, newVehicle);

      // Extract from serviceResult if the POST also wraps it
      const addedVehicle = response.data.serviceResult || response.data;


      set((state) => ({
        vehicles: [...state.vehicles, addedVehicle],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchFleetUtilization: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(fleetUtilization);
            console.log(response.data)

            set({ fleetUtilization: response.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
}));
