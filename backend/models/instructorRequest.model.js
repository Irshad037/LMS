import mongoose from "mongoose";

const instructorRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one request per user
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
const InstructorRequest = mongoose.model("InstructorRequest", instructorRequestSchema);
export default InstructorRequest;
