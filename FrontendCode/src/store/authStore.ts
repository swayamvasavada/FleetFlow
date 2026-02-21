import { create } from "zustand";
import { sign_up, verify } from "../constants/apiPath";
import { api } from "../utils/axiosConfig";

interface User {
  email: string;
  name: string;
  phoneNo: number;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  isVerified: boolean;
  verifyAccount: (verificationToken: string) => Promise<void>;
  resetError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isVerified: false,

  signup: async (userData) => {
    set({ isLoading: true, error: null });

    try {
      // Axios automatically stringifies the body
      const response = await api.post(sign_up, userData);

      // Axios puts the response body in the .data property
      const { user, token } = response.data;

      console.log(userData);
      console.log(response.data);

      set({
        user,
        token,
        isLoading: false,
      });
    } catch (err: any) {
      // Axios errors contain the server message in err.response.data
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred";
      set({ error: errorMessage, isLoading: false });
    }
  },

  // inside authStore.ts
  verifyAccount: async (verificationToken: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`${verify}?token=${verificationToken}`);

      const { user, token } = response.data;

      set({
        user,
        token, 
        isLoading: false,
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Verification failed";
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  logout: () => set({ user: null, token: null }),

  resetError: () => set({ error: null })
}));
