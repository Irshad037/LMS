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
    thumbnail: { type: String, required: true },
    coursePrice:{type:Number, required: true},
    discount:{type:Number, required: true},
    
    content: [
      {
        sectionTitle: { type: String, required: true },
        videos: [
          {
            title: { type: String, required: true },
            videoUrl: { type: String, required: true },
            duration: { type: String },
            publicId: { type: String, required: true }
          }
        ]
      }
    ],
     enrolledStudents: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        enrolledAt: { type: Date, default: Date.now },
      }
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;