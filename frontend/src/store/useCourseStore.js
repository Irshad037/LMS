import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
import toast from 'react-hot-toast';


export const useCourseStore = create((set,get)=>({
    isCreatingCourse: false,

    createCourse: async(data)=>{
        set({isCreatingCourse: true});
        try {
            const res = await axiosInstance.post('/course/create-course', data);
            toast.success("Course created");
        } catch (error) {
            const errMsg = error?.response?.data?.error || "Failed to create course";
            console.log("Erorr in createCourse:", errMsg);
            toast.error(errMsg)
        }
        finally{
            set({isCreatingCourse: false})
        }
    }
}))