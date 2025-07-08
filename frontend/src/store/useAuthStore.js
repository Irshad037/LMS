import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

const useAuthStore = create(persist(
  (set, get) => ({

    authUser: null,
    isCheckingAuth: false,
    isSigningUp: false,
    isLoggingIn: false,

    signup: async (data) => {
      set({ isSigningUp: true });
      try {
        const res = await axiosInstance.post("/auth/signup", data);
        set({ authUser: res.data });
        toast.success("Account created successfully");
      } catch (error) {
        const errMsg = error?.response?.data?.error || "Signup failed";
        console.error("Signup Error:", errMsg);
        toast.error(errMsg);
      } finally {
        set({ isSigningUp: false });
      }
    },

    login: async (data) => {
      set({ isLoggingIn: true });
      try {
        const res = await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data });
        toast.success("Logged in successfully");
      } catch (error) {
        const errMsg = error?.response?.data?.error || "Login failed";
        console.error("Login Error:", errMsg);
        toast.error(errMsg);
      } finally {
        set({ isLoggingIn: false });
      }
    },

    logout: async () => {
      try {
        await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        toast.success("Logged out successfully");
      } catch (error) {
        const errMsg = error?.response?.data?.error || "Logout failed";
        console.error("Logout Error:", errMsg);
        toast.error(errMsg);
      }
    },

    checkAuth: async () => {
      set({ isCheckingAuth: true });
      try {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
      } catch (error) {
        console.log("Error in checkAuth:", error);
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    }

  }),
  {
    name: "auth-storage", // localStorage key
    partialize: (state) => ({ authUser: state.authUser }) // only persist authUser
  }
));

export default useAuthStore;
