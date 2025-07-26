import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import axios from 'axios';


export const useCourseStore = create((set, get) => ({
    myCreatedCourse: [],
    enrolledStudents: [],
    deletingCourseId: null,
    isCreatingCourse: false,
    isCreatingSection:false,

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
            set({ myCreatedCourse: res.data.courses});
            console.log("API response", res.data.courses);
        } catch (error) {
            const errMsg = error?.response?.data?.error || "Failed to create course";
            toast.error(errMsg)
            console.log("Error in getMyCreatedCourse:", errMsg);
            
        }

    },

    deleteCourse: async (courseId)=>{ 
        set({deletingCourseId: courseId})
        try {
            const res = await axiosInstance.delete(`/course/${courseId}/delete-course`)
            toast.success(res.data.message);
            get().getMyCreatedCourse(); //refersh th course list
        } catch (error) {
            const errMsg = error?.response?.data?.error || "failed to delete"
            console.log("Error in deleteCourse: " ,errMsg);
            toast.error(errMsg)
            
        }
        finally{
            set({deletingCourseId: null,});
        }
    },

    createSection: async(courseId, data)=>{
        set({isCreatingSection: true});
        try {
            const res = await axiosInstance.post(`/course/${courseId}/add-section`, data);
            toast.success(res.data.message);
        } catch (error) {
            const errMsd = error?.response?.data?.error || "Failed to create section";
            console.log("Error in createSection:", errMsd); 
            toast.error(errMsd);
        }
        finally{
            set({isCreatingSection: false})
        }
    },

    getNoOfStudentEnrolled: async()=>{
        try {
            const res = await axiosInstance.get('/course/enrolledStudent')
            set({enrolledStudents: res.data.students})
        } catch (error) {
            const errMsg = error?.response?.data?.error || "Failed to fetch enrolled students";
            console.log("Error in getNoOfStudentEnrolled:", errMsg);    
            toast.error(errMsg);
        }
    }

}))