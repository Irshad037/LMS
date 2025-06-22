import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { isAdmin } from '../middleware/roleMiddleware.js';
import { updateUserRole } from '../controllers/user.controller.js';


const router= express.Router();

router.put("/update-role", protectRoute, isAdmin, updateUserRole);

export default router;