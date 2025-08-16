// controllers/webhooks.js
import Stripe from "stripe";
import Purchase from "../models/purchase.model.js";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body, // req.body must be express.raw()
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("📦 Stripe Event:", event.type);

  // Helper for enrolling user after successful payment
  const completeEnrollment = async ({ purchaseId, userId, courseId }) => {
    try {
      if (!purchaseId || !userId || !courseId) throw new Error("Missing metadata");

      // ✅ Mark purchase completed
      await Purchase.findByIdAndUpdate(purchaseId, { status: "completed" });

      // ✅ Fetch user & course
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);

      if (!user || !course) throw new Error("User or Course not found");

      // ✅ Calculate access
      const accessDurationInDays = course.additionalBenefits?.accessDurationInDays || 730;
      const enrolledAt = new Date();
      const expiresAt = new Date(enrolledAt.getTime() + accessDurationInDays * 24 * 60 * 60 * 1000);

      // ✅ Ensure arrays exist
      if (!Array.isArray(user.enrolledCourses)) user.enrolledCourses = [];
      if (!Array.isArray(course.enrolledStudents)) course.enrolledStudents = [];

      // ✅ Add to User
      if (!user.enrolledCourses.some(e => e.course.toString() === courseId.toString())) {
        user.enrolledCourses.push({ 
          course: courseId, 
          enrolledAt,
          progress: { completedVideos: [], completedLectures: [] }
        });
        await user.save();
      }

      // ✅ Add to Course
      if (!course.enrolledStudents.some(s => s.student.toString() === userId.toString())) {
        course.enrolledStudents.push({ student: user._id, enrolledAt, expiresAt });
        await course.save();
      }

      console.log(`✅ Purchase ${purchaseId} completed & user ${userId} enrolled in course ${courseId}`);
    } catch (err) {
      console.error("❌ Enrollment failed:", err.message);
    }
  };

  // 🔹 Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("📦 Checkout Session Metadata:", session.metadata);
    await completeEnrollment(session.metadata || {});
  }

  // 🔹 Handle payment_intent.succeeded (optional)
  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;
    console.log("📦 Payment Intent Metadata:", intent.metadata);
    await completeEnrollment(intent.metadata || {});
  }

  res.json({ received: true });
};
