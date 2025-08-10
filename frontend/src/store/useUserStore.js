import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useUserStore = create((set, get) => ({
  instructorRequest: null,
  enrolledCourse: [],
  isRequesting: false,
  isGettingStatus: false,
  isDeletingRequest: false,
  isEnrolling: false,
  isGettingEnrolCou: false,

  // Send instructor request
  requestForInstructor: async (data) => {
    set({ isRequesting: true });
    try {
      const res = await axiosInstance.post('/user/request', data);
      toast.success("Request sent successfully");
      return true;
    } catch (error) {
      const errMsg = error?.response?.data?.error || "Request failed";
      console.error("requestForInstructor error:", errMsg);
      toast.error(errMsg);
      return false;
    } finally {
      set({ isRequesting: false });
    }
  },

  deleteRequest: async (data) => {
    set({ isDeletingRequest: true });
    try {
      const res = await axiosInstance.delete("/user/delete-request", {
        data,
      });
      toast.success("Request deleted successfully");
      set({ instructorRequest: null }); // ✅ Clear state after delete
    } catch (error) {
      const errMsg = error?.response?.data?.error || "Delete failed";
      console.error("deleteRequest error:", errMsg);
      toast.error(errMsg);
    } finally {
      set({ isDeletingRequest: false });
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

  enrollInCourse: async (courseId) => {
    set({ isEnrolling: true })
    try {
      const res = await axiosInstance.post(`/user/enroll/${courseId}`)
      toast.success(res.data.message)
    } catch (error) {
      const errmsg = error?.response?.data?.error;
      console.error("Error in enrollInCourse: ", errmsg);
      toast.error(errmsg);
    } finally {
      set({ isEnrolling: false });
    }
  },

  getEnrolledCourse: async () => {
    set({ isGettingEnrolCou: true })
    try {
      const res = await axiosInstance.get('/user/enrolled-course');
      const courses = res?.data?.courses || [];

      set({ enrolledCourse: courses });
      console.log("Fetched enrolled courses:", courses);

    } catch (error) {
      const errmsg = error?.response?.data?.error;
      console.error("Error in getEnrolledCourse: ", errmsg);
      toast.error(errmsg);
    } finally {
      set({ isGettingEnrolCou: false })
    }
  },

  markVideoCompleted: async(courseId,sectionId,videoId)=>{
    try {
      const res = await axiosInstance.post(`/user/progress/${courseId}/${sectionId}/${videoId}`);
      console.log(res.data.message);
      
    } catch (error) {
      const errMsg = error?.response?.data?.error;
      toast.error(errMsg);
      console.error("Error in markVideoCompleted ", errMsg);
    }
  }


}));
