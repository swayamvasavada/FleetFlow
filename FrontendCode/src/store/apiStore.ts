import { create } from "zustand";
import { api } from "../utils/axiosConfig";


// interface ApiState {

// }
interface VehicleFormData {
  licensePlate: string;
  maxLoadCapacity: number;
  odometerReading: number;
  vehicleType: string;
  model: string;
  vehicleId : number;
  VehicleStatus : string;
  isRetired: boolean
}

interface ApiState {
    vehicles: VehicleFormData[];
    loading: boolean;
    error: string | null;
    fetchAllVehicles: () => Promise<void>;
    addVehicle: (vehicle: VehicleFormData) => Promise<void>;
}

export const apiStore = create<ApiState>((set) => ({
    vehicles: [],
    loading: false,
    error: null,

    // GET all vehicles
    fetchAllVehicles: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/api/vehicle/query');
            console.log(response.data)

            set({ vehicles: response.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },

    // POST new vehicle
    addVehicle: async (newVehicle: VehicleFormData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/api/vehicle/command/', newVehicle);
            // Update local state by appending the new vehicle
            set((state) => ({
                vehicles: [...state.vehicles, response.data],
                loading: false
            }));
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
}));