import { create } from "zustand";
import { login as loginPath, sign_up, verify } from "../constants/apiPath"; // Renamed to avoid shadowing
import { api } from "../utils/axiosConfig";

interface User {
  email: string;
  name: string;
  phoneNo: number;
  role: string;
  licenseNumber?: string;
  licenseExpiryDate?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  signup: (userData: any) => Promise<boolean>;
  login: (credentials: any) => Promise<boolean>;
  logout: () => void;
  isVerified: boolean;
  verifyAccount: (verificationToken: string) => Promise<void>;
  resetError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initialize state from localStorage so name stays on refresh
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
  isVerified: false,

  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(sign_up, userData);
      
      // Accessing serviceResult based on your API response logs
      const { serviceResult } = response.data;
      const { token, ...user } = serviceResult;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      set({ user, token, isLoading: false });
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  verifyAccount: async (verificationToken: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`${verify}?token=${verificationToken}`);
      const { serviceResult } = response.data;
      const { token, ...user } = serviceResult;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      set({ user, token, isLoading: false, isVerified: true });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Verification failed";
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  login: async (credentials: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(loginPath, credentials);
      const { serviceResult } = response.data;
      
      if (serviceResult) {
        const { token, ...userData } = serviceResult;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        set({
          user: userData, // userData now contains the 'role' key from the API
          token: token,
          isLoading: false,
        });
        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed";
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Clear user too
    set({ user: null, token: null, isVerified: false });
  },

  resetError: () => set({ error: null }),
}));