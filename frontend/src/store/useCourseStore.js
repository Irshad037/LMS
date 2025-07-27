import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import axios from 'axios';


export const useCourseStore = create((set, get) => ({
    myCreatedCourse: [],
    enrolledStudents: [],
    deletingCourseId: null,
    deleteSectionId: null,
    deleteVideoId: null,
    isCreatingCourse: false,
    isCreatingSection: false,
    isAddingVideo: false,

    createCourse: async (data) => {
        set({ isCreatingCourse: true });
        try {
            const res = await axiosInstance.post('/course/create-course', data);
            toast.success("Course created");
        } catch (error) {
            const errMsg = error?.response?.data?.error || "Failed to create course";
            console.log("Erorr in createCourse:", errMsg);
            toast.error(errMsg)
        }
        finally {
            set({ isCreatingCourse: false })
        }
    },

    getMyCreatedCourse: async () => {

        try {
            const res = await axiosInstance.get('/course/instructor/courses')
            set({ myCreatedCourse: res.data.courses });
        } catch (error) {
            const errMsg = error?.response?.data?.error || "Failed to create course";
            toast.error(errMsg)
            console.log("Error in getMyCreatedCourse:", errMsg);

        }

    },



    createSection: async (courseId, data) => {
        set({ isCreatingSection: true });
        try {
            const res = await axiosInstance.post(`/course/${courseId}/add-section`, data);
            toast.success(res.data.message);
            get().getMyCreatedCourse()
        } catch (error) {
            const errMsd = error?.response?.data?.error || "Failed to create section";
            console.log("Error in createSection:", errMsd);
            toast.error(errMsd);
        }
        finally {
            set({ isCreatingSection: false })
        }
    },

    addVideoToSection: async (courseId, sectionId, data) => {
        set({ isAddingVideo: true });
        try {
            const res = await axiosInstance.post(`/course/${courseId}/section/${sectionId}/add-video`, data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            toast.success(res.data.message);
            get().getMyCreatedCourse(); // refresh the course list
        } catch (error) {
            const errMsg = error?.response?.data?.error || "Failed to add video to section";
            console.log("Error in addVideoToSection", errMsg);
            toast.error(errMsg);
        } finally {
            set({ isAddingVideo: false });
        }
    },

    getNoOfStudentEnrolled: async () => {
        try {
            const res = await axiosInstance.get('/course/enrolledStudent')
            set({ enrolledStudents: res.data.students })
        } catch (error) {
            const errMsg = error?.response?.data?.error || "Failed to fetch enrolled students";
            console.log("Error in getNoOfStudentEnrolled:", errMsg);
            toast.error(errMsg);
        }
    },

    deleteCourse: async (courseId) => {
        set({ deletingCourseId: courseId })
        try {
            const res = await axiosInstance.delete(`/course/${courseId}/delete-course`)
            toast.success(res.data.message);
            get().getMyCreatedCourse(); //refersh th course list
        } catch (error) {
            const errMsg = error?.response?.data?.error || "failed to delete"
            console.log("Error in deleteCourse: ", errMsg);
            toast.error(errMsg)

        }
        finally {
            set({ deletingCourseId: null, });
        }
    },
    deleteSection: async (courseId, sectionId) => {
        set({ deleteSectionId: sectionId })
        try {
            const res = await axiosInstance.delete(`/course/${courseId}/delete-video/${sectionId}`)
            toast.success(res.data.message);
            get().getMyCreatedCourse();
        } catch (error) {
            const errMsg = error?.response?.data.error || "Failed to delete section";
            console.log("Error in deleteSection: ", errMsg);
            toast.error(errMsg);
        }
    },

    // deleteVideo: async()

}))