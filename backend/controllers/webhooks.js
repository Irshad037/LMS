import Stripe from "stripe";
import Course from "../models/course.model.js";
import { Purchase } from "../models/purchase.model.js";
import User from "../models/user.model.js";


//TODO:= not working check this and in user controller (purchaseCourse)

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

export const stripeWebhooks = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            const purchaseId = session.metadata.purchaseId;

            const purchaseData = await Purchase.findById(purchaseId);
            const course = await Course.findById(purchaseData.courseId);
            const user = await User.findById(purchaseData.userId);

            const alreadyEnrolled = user.enrolledCourses.some(
                enrolled => enrolled.course.toString() === purchaseData.courseId
            );
            if (alreadyEnrolled) {
                return res.status(400).json({ error: "Already enrolled in this course" });
            }

            const accessDurationInDays = course.additionalBenefits.accessDurationInDays || 730;
            const enrolledAt = new Date();
            const expiresAt = new Date(enrolledAt.getTime() + accessDurationInDays * 24 * 60 * 60 * 1000);

            user.enrolledCourses.push({ course: purchaseData.courseId, enrolledAt });
            await user.save();

            course.enrolledStudents.push({
                student: user._id,
                enrolledAt,
                expiresAt,
            });
            await course.save();

            purchaseData.status = 'completed';
            await purchaseData.save();

            break;
        }
        case 'payment_intent.payment_failed': {
            const session = event.data.object;
            const purchaseId = session.metadata.purchaseId;

            const purchaseData = await Purchase.findById(purchaseId);
            purchaseData.status = 'failed';
            await purchaseData.save();

            break;
        }
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};
