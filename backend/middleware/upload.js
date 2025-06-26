import multer from "multer";
import { videoStorage } from "../config/cloudinary.js";

export const uploadVideo = multer({ storage: videoStorage });
