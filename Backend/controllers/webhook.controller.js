import { Webhook } from "svix";
import { User } from "../schema/user.model.js";

const secret = process.env.WEBHOOK_SECRET;

const genrateRandomUsername = () => {
  return `user-${Math.floor(1000 + Math.random() * 9000)}`;
};

const webhookHandler = async (req, res) => {
  try {
    const payload = req.body.toString();
    const header = req.headers;

    const headers = {
      "svix-id": header["svix-id"],
      "svix-timestamp": header["svix-timestamp"],
      "svix-signature": header["svix-signature"],
    };

    const wh = new Webhook(secret);
    const evt = wh.verify(payload, headers);

    const { data, type } = evt;

    if (type === "user.created") {
      const { email_addresses, id, image_url, username } = data;
      const email = email_addresses?.[0]?.email_address;

      if (!email || !id) {
        return res
          .status(400)
          .json({ status: "error", message: "Missing required user information" });
      }

      const existingUser = await User.findOne({ clerkId: id });
      if (existingUser) {
        return res
          .status(200)
          .json({ status: "success", message: "User already exists" });
      }

      await User.create({
        clerkId: id,
        email: email,
        profilePicture: image_url || null,
        username: username || genrateRandomUsername(),
      });

      return res
        .status(200)
        .json({ status: "success", message: "Webhook processed successfully" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Event received but not processed" });
  } catch (error) {
    console.error("Webhook error:", error);

    if (error.message?.includes("Webhook signature verification failed")) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid webhook signature" });
    }

    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

export default webhookHandler;
