import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { isAdmin} from '../middleware/roleMiddleware.js';
import { 
    approveInstructor,requestInstructor,rejectInstructor
 } from '../controllers/user.controller.js';


const router= express.Router();

router.post("/request", protectRoute, requestInstructor);
router.put("/approve/:requestId", protectRoute,isAdmin,  approveInstructor);
router.put("/rejecte/:requestId", protectRoute,isAdmin,  rejectInstructor);




export default router;