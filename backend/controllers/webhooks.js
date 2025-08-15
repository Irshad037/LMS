import Stripe from "stripe";
import Purchase from "../models/purchase.model.js";
import User from "../models/user.model.js";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.rawBody, // Make sure body parser doesn't parse JSON here
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const { purchaseId, userId, courseId } = session.metadata || {};

      if (!purchaseId || !userId || !courseId) {
        console.error("Webhook missing metadata");
        return res.status(400).send("Missing metadata");
      }

      // Update purchase status
      await Purchase.findByIdAndUpdate(purchaseId, { status: "completed" });

      // Enroll user in course
      await User.findByIdAndUpdate(userId, {
        $addToSet: {
          enrolledCourses: {
            course: courseId,
            enrolledAt: new Date(),
          },
        },
      });

      console.log(`Purchase ${purchaseId} completed & user enrolled.`);
    } catch (err) {
      console.error("Error processing webhook:", err.message);
    }
  }

  res.json({ received: true });
};
