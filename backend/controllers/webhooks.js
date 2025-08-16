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
      req.body, // Use express.raw({ type: 'application/json' }) in route
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("📦 Stripe Event:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { purchaseId, userId, courseId } = session.metadata || {};

    if (!purchaseId || !userId || !courseId) {
      console.error("❌ Webhook missing metadata");
      return res.status(400).send("Missing metadata");
    }

    try {
      // ✅ Mark purchase as completed
      await Purchase.findByIdAndUpdate(purchaseId, { status: "completed" });

      // ✅ Fetch user and course
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);

      if (!user || !course) {
        console.error("❌ User or course not found");
        return res.status(404).send("User or Course not found");
      }

      // ✅ Calculate access duration
      const accessDurationInDays = course.additionalBenefits?.accessDurationInDays || 730;
      const enrolledAt = new Date();
      const expiresAt = new Date(enrolledAt.getTime() + accessDurationInDays * 24 * 60 * 60 * 1000);

      // ✅ Add course to user's enrolledCourses if not already present
      if (!user.enrolledCourses.some(e => e.course.toString() === courseId.toString())) {
        user.enrolledCourses.push({ course: courseId, enrolledAt });
        await user.save();
      }

      // ✅ Add student to course's enrolledStudents if not already present
      if (!course.enrolledStudents.some(s => s.student.toString() === userId.toString())) {
        course.enrolledStudents.push({ student: user._id, enrolledAt, expiresAt });
        await course.save();
      }

      console.log(`✅ Purchase ${purchaseId} completed & user ${userId} enrolled in course ${courseId}`);
    } catch (err) {
      console.error("❌ Error processing webhook:", err.message);
      return res.status(500).send("Internal server error");
    }
  }

  // Respond to Stripe
  res.json({ received: true });
};
