import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useUserStore = create((set, get) => ({
  instructorRequest: null,
  isRequesting: false,
  isGettingStatus: false,

  // Send instructor request
  requestForInstructor: async (data) => {
    set({ isRequesting: true });
    try {
      const res = await axiosInstance.post('/user/request', data);
      toast.success("Request sent successfully");
    } catch (error) {
      const errMsg = error?.response?.data?.error || "Request failed";
      console.error("requestForInstructor error:", errMsg);
      toast.error(errMsg);
    } finally {
      set({ isRequesting: false });
    }
  },

  // Get instructor request status
  requestStatus: async () => {
    set({ isGettingStatus: true });
    try {
      const res = await axiosInstance.get('/user/request-status');
      set({ instructorRequest: res.data?.data || null });
    } catch (error) {
      const errMsg = error?.response?.data?.error || "Failed to get status";
      console.error("requestStatus error:", errMsg);
      toast.error(errMsg);
    } finally {
      set({ isGettingStatus: false });
    }
  },
}));
