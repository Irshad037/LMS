import express from 'express';
import { protectRoute } from '../middleware/protectRoute';
import { isAdmin } from '../middleware/roleMiddleware';


const router= express.Router();

router.put("/update-role", protectRoute, isAdmin, updateUserRole);

export default router;