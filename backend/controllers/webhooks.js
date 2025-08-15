import Stripe from "stripe";
import Course from "../models/course.model.js";
import { Purchase } from "../models/purchase.model.js";
import User from "../models/user.model.js";


//TODO:= not working check this and in user controller (purchaseCourse)

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

export const stripeWebhooks = async (request, response) => {

    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = Stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            })

            const { purchaseId } = session.data[0].metadata;

            const purchaseData = await Purchase.findById(purchaseId);
            const course = await Course.findById(purchaseData.courseId);
            const user = await User.findById(purchaseData.userId);

            const alreadyEnrolled = user.enrolledCourses.some(
                (enrolled) => enrolled.course.toString() === purchaseData.courseId
            );

            if (alreadyEnrolled) {
                return response.status(400).json({ error: "Already enrolled in this course" });
            }
            const accessDurationInDays = course.additionalBenefits.accessDurationInDays || 730; // Default to 2 years if not set
            const enrolledAt = new Date();
            const expiresAt = new Date(enrolledAt.getTime() + accessDurationInDays * 24 * 60 * 60 * 1000); // Add access duration in milliseconds


            // Add course to user's enrolledCourses
            user.enrolledCourses.push({ course: purchaseData.courseId, enrolledAt });
            await user.save();

            // ✅ Add student to course's enrolledStudents with full object
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
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            })

            const { purchaseId } = session.data[0].metadata;
            const purchaseData = await Purchase.findById(purchaseId);

            purchaseData.status = 'failed';
            purchaseData.save();

            break;
        }
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    response.json({ received: true })
}