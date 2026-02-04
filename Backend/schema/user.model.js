import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    profilePic: {
      type: String,
      default: "",
    },

    // Previous analysis
    prevMetrics: {
      confidence: { type: Number, default: 0 },
      clarity: { type: Number, default: 0 },
      fluency: { type: Number, default: 0 },
      accent: { type: Number, default: 0 },
    },

    // Current analysis
    currentMetrics: {
      confidence: { type: Number, default: 0 },
      clarity: { type: Number, default: 0 },
      fluency: { type: Number, default: 0 },
      accent: { type: Number, default: 0 },
    },

    // History of analyses
    history: [
      {
        type: Schema.Types.ObjectId,
        ref: "History",
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
