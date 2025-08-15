// controllers/webhooks.js
import Stripe from "stripe";
import Purchase from "../models/purchase.model.js";
import User from "../models/user.model.js";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body, // Will use express.raw() before this route
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { purchaseId, userId, courseId } = session.metadata || {};

    if (!purchaseId || !userId || !courseId) {
      console.error("Webhook missing metadata");
      return res.status(400).send("Missing metadata");
    }

    try {
      await Purchase.findByIdAndUpdate(purchaseId, { status: "completed" });

      await User.findByIdAndUpdate(userId, {
        $addToSet: {
          enrolledCourses: {
            course: courseId,
            enrolledAt: new Date(),
          },
        },
      });

      console.log(`✅ Purchase ${purchaseId} completed & user enrolled.`);
    } catch (err) {
      console.error("Error processing webhook:", err.message);
    }
  }

  res.json({ received: true });
};
