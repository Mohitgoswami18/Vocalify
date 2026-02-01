import mongoose from "mongoose";

const { Schema } = mongoose;

const historySchema = new Schema(
  {
    // Reference to app user
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Individual metrics
    metrics: {
      confidence: { type: Number, required: true },
      clarity: { type: Number, required: true },
      fluency: { type: Number, required: true },
      accent: { type: Number, required: true },
    },

    // Overall score (for projection chart)
    overallScore: {
      type: Number,
      required: true,
    },

    // Optional metadata
    audioUrl: {
      type: String,
      default: "",
    },

    transcript: {
      type: String,
      default: "",
    },

    duration: {
      type: Number, // seconds
      default: 0,
    },

    source: {
      type: String,
      enum: ["record", "upload"],
      default: "record",
    },
  },
  { timestamps: true },
);

const History = mongoose.model("History", historySchema);
export default History;
