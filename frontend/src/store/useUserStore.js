import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';

import React from 'react'
import toast from 'react-hot-toast';

export const useUserStore = create((set,get)=>({
    instructorRequest:null,
    isRequesting:false,
    isGettingStatus:false,

    requestForInstructor:async(data)=>{
        set({isRequesting:true})
        try {
            const res = await axiosInstance.post('/user/request',data);
            toast.success("Request sended successfully")
        } catch (error) {
            const errMsg = error?.response?.data?.error || "request failed";
            console.log("requestForInstructor error", errMsg);
            toast.error(errMsg)
            
        }
        finally{
            set({isRequesting: false})
        }
    }, 

    requestStatus:async()=>{
        set({isGettingStatus: true})
        try {
            const res = await axiosInstance.get('/user/request-status');
            set({ instructorRequest: res.data });
        } catch (error) {
            const errMsg = error?.response?.data?.error ;
            console.log("rejectInstructor error", errMsg);
            toast.error(errMsg)   
        }
        finally{
            set({isGettingStatus: false})
        }
    }
}))