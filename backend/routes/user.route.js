import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { isAdmin} from '../middleware/roleMiddleware.js';
import { 
    approveInstructor,requestInstructor,rejectInstructor,getOwnProfile,updateProfile,enrollInCourse
    ,getEnrolledCourses,getStatus,deleteRequest
 } from '../controllers/user.controller.js';


const router= express.Router();

router.post("/request", protectRoute, requestInstructor);
router.delete("/delete-request", protectRoute, deleteRequest);
router.get("/request-status", protectRoute, getStatus);
router.put("/approve/:requestId", protectRoute,isAdmin,  approveInstructor);
router.put("/reject/:requestId", protectRoute,isAdmin,  rejectInstructor);
router.get("/profile/:id", protectRoute, getOwnProfile)
router.post("/update-profile", protectRoute, updateProfile)
router.post("/enroll/:courseId", protectRoute, enrollInCourse);
router.get("/enrolled-course", protectRoute, getEnrolledCourses)






export default router;