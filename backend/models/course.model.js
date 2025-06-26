import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    content: [
      {
        title: { type: String, required: true },
        videoUrl: { type: String, required: true },
        duration: { type: String },
        publicId: { type: String, required: true },
      }
    ]
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;