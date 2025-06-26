import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { isAdmin, isInstructor } from '../middleware/roleMiddleware.js';
import { uploadVideo } from "../middleware/upload.js";
import { 
    approveInstructor,requestInstructor,rejectInstructor, createCourse, addVideoToCourse,
    deleteCourse, deleteVideoFromCourse
 } from '../controllers/user.controller.js';


const router= express.Router();

router.post("/request", protectRoute, requestInstructor);
router.put("/approve/:requestId", protectRoute,isAdmin,  approveInstructor);
router.put("/rejecte/:requestId", protectRoute,isAdmin,  rejectInstructor);

router.post("/create-course",protectRoute,isInstructor,createCourse);
router.delete("/:courseId/delete-course",protectRoute,isInstructor,deleteCourse);
router.post("/:courseId/add-video",protectRoute,isInstructor,uploadVideo.single("video"),  addVideoToCourse);
router.delete("/:courseId/delete-video/:videoId",protectRoute,isInstructor, deleteVideoFromCourse);





export default router;