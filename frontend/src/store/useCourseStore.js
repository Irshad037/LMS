import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import axios from 'axios';


export const useCourseStore = create((set, get) => ({
    AllCourses: [],
    myCreatedCourse: [],
    enrolledStudents: [],
    isGettingAllCourses: false,
    isCreatingCourse: false,
    isCreatingSection: false,
    isAddingVideo: false,
    isAddingReview: false,
    isSearchingCourse:false,
    isDeletingReview: false,
    deletingCourseId: null,
    deleteSectionId: null,
    deleteVideoId: null,

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
            get().getAllCourses()
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
            get().getAllCourses(); // refresh the course list
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
            const res = await axiosInstance.delete(`/course/${courseId}/delete-section/${sectionId}`)
            toast.success(res.data.message);
            get().getAllCourses();
        } catch (error) {
            const errMsg = error?.response?.data.error || "Failed to delete section";
            console.log("Error in deleteSection: ", errMsg);
            toast.error(errMsg);
        }
        finally {
            set({ deleteSectionId: null });
        }
    },

    deleteVideo: async (courseId, sectionId, videoId) => {
        set({ deleteVideoId: videoId });
        try {
            const res = await axiosInstance.delete(`/course/${courseId}/section/${sectionId}/video/${videoId}`)
            toast.success(res.data.message);
            get().getAllCourses();
        } catch (error) {
            const errMsg = error?.response?.data?.error || "Failed to delete video";
            console.log("Error in deleteVideo: ", errMsg);
            toast.error(errMsg);
        }
        finally {
            set({ deleteVideoId: null });
        }
    },

    addreview: async (courseId, data) => {
        set({ isAddingReview: true })
        try {
            const res = await axiosInstance.post(`/course/${courseId}/add-review`, data)
            toast.success(res.data.message)
            get().getAllCourses();
        } catch (error) {
            const errMsg = error?.response?.data?.error || "Failed to review course";
            console.log("error in addreview: ", errMsg);
            toast.error(errMsg);
        }
        finally {
            set({ isAddingReview: false });
        }
    },

    deleteReview: async (courseId, reviewId) => {
        set({ isDeletingReview: true });
        try {
            const res = await axiosInstance.delete(`/course/${courseId}/delete-review/${reviewId}`);
            toast.success(res.data.message);
            get().getAllCourses();
        } catch (error) {
            const errMsg = error?.response?.data?.error || "Failed to delete review";
            toast.error(errMsg);
            console.error("error in deleteReview", errMsg);

        }
        finally {
            set({ isDeletingReview: false });
        }
    },

    getAllCourses: async () => {
        set({ isGettingAllCourses: true });
        try {
            const res = await axiosInstance.get('/course/all-courses');
            const courses = res.data.courses;

            set({ AllCourses: courses });

            console.log("Fetched courses:", courses);

        } catch (error) {
            const errMsg = error?.response?.data?.error || "Failed to fetch all courses";
            console.error("Error in getAllCourses:", errMsg);
            toast.error(errMsg);
        } finally {
            set({ isGettingAllCourses: false });
        }
    },

    searchCourse: async (query)=>{
        set({isSearchingCourse:true});
        try {
            const res = await axiosInstance.get(`/course/search?query=${encodeURIComponent(query)}`);
            set({AllCourses: res.data});
            console.log("Search results:", res.data);
        } catch (error) {
            const errmsg = error?.response?.data?.error || "Failed to search courses";
            console.error("Error in searchCourse:", errmsg);        
            toast.error(errmsg);
        }
        finally {
            set({isSearchingCourse:false});
        }
    },


}))