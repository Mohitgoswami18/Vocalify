import connectToDatabase from "../database/database.js";
import History from "../schema/history.model.js";

const historyData = [
  {
    user: "507f1f77bcf86cd799439011",
    metrics: {
      confidence: 62,
      clarity: 58,
      fluency: 65,
      accent: 55,
    },
    overallScore: 60,
    audioUrl: "https://cdn.yourapp.com/audio/session1.wav",
    transcript:
      "Hello everyone, today I want to talk about my learning journey.",
    duration: 42,
    source: "record",
    createdAt: "2025-01-01T10:00:00.000Z",
    updatedAt: "2025-01-01T10:00:00.000Z",
  },
  {
    user: "507f1f77bcf86cd799439012",
    metrics: {
      confidence: 68,
      clarity: 63,
      fluency: 70,
      accent: 60,
    },
    overallScore: 65,
    audioUrl: "https://cdn.yourapp.com/audio/session2.wav",
    transcript: "I am improving my communication skills by practicing daily.",
    duration: 50,
    source: "record",
    createdAt: "2025-01-05T10:00:00.000Z",
    updatedAt: "2025-01-05T10:00:00.000Z",
  },
  {
    user: "507f1f77bcf86cd799439014",
    metrics: {
      confidence: 72,
      clarity: 70,
      fluency: 75,
      accent: 66,
    },
    overallScore: 71,
    audioUrl: "https://cdn.yourapp.com/audio/session3.wav",
    transcript: "Consistent practice helps me speak more fluently and clearly.",
    duration: 55,
    source: "upload",
    createdAt: "2025-01-10T10:00:00.000Z",
    updatedAt: "2025-01-10T10:00:00.000Z",
  },
  {
    user: "507f1f77bcf86cd799439013",
    metrics: {
      confidence: 78,
      clarity: 74,
      fluency: 80,
      accent: 72,
    },
    overallScore: 76,
    audioUrl: "https://cdn.yourapp.com/audio/session4.wav",
    transcript: "Now I feel more confident while speaking in public.",
    duration: 60,
    source: "record",
    createdAt: "2025-01-15T10:00:00.000Z",
    updatedAt: "2025-01-15T10:00:00.000Z",
  },
];

connectToDatabase()

const historySeed = async () => {
  try {
    const historyCreated = await History.insertMany(historyData)
    if(historyCreated && historyCreated.length > 0) {
      console.log("History Seeded:", historyCreated.length, "entries created");
    } else {
        console.log("No history entries were created.");
    }
  } catch (error) {
    console.error("Error seeding history data:", error);
    process.exit(1);
  }
}

historySeed();