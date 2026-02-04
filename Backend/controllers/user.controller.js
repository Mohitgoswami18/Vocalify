import User from "../schema/user.model.js";
import axios from "axios";
import FormData from "form-data";
import History from "../schema/history.model.js";
import fs from "fs";

const dashboardController = async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: "Username parameter is required" });
  }

  const userData = await User.findOne({ username });
  if (!userData) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ user: userData });
};

const historyFetchController = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: "Username parameter is required" });
    }

    const userData = await User.findOne({ username }).populate({
      path: "history",
      options: { sort: { createdAt: 1 } }, // oldest → newest
    });

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ history: userData.history });
  } catch (error) {
    console.error("Error fetching user history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const historyUpdationPipeline = async (req, res) => {
  try{
    const {username, confidence, clarity, fluency, accent, overallScore, audioUrl, transcript, duration, source} = req.body;
    if(!username || !confidence || !clarity || !fluency || !accent || !overallScore){
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOne({ username });
    if(!user) {
      console.log("User not found for username:", username);
      return res.status(404).json({ error: "User not found" });
    }

    const newHistoryEntry = {
      user: user._id,
      metrics: {
        confidence: confidence,
        clarity: clarity,
        fluency: fluency,
        accent: accent,
        overallScore: overallScore,
      },
      audioUrl: audioUrl || null,
      transcript: transcript || null,
      duration: duration || 0,
      source: source || null,
    };

    const historyEntry = await History.create(newHistoryEntry);
    user.history.push(historyEntry._id);
    await user.save();
    await History.save();

    return res.status(200).json({ message: "History updated successfully", historyEntry });
  } catch (error) {
    console.error("Error in historyUpdationPipeline:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

const analysisPipelineController = async (req, res) => {
  try {
    const userAudioPath = req.file?.path;
    if(!userAudioPath) {
      return res.status(400).json({ error: "Audio file is required" });
    }
    console.log("Received audio file path:", userAudioPath);
  
    const formData = new FormData();
    formData.append(
      "userAudio",
      fs.createReadStream(userAudioPath),
      req.file.originalname,
    );

  
    const modelPredictions = await axios.post(
      "http://127.0.0.1:8000/analyze/speech",
      formData,
      {
        headers: formData.getHeaders(),
      },
    );

    if(!modelPredictions) {
      return res.status(500).json({ error: "Model prediction failed" });
    }

    fs.unlinkSync(userAudioPath);

    return res.status(200).json(modelPredictions.data);
  } catch (error) {
    console.error("Error in analysis pipeline:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

}
export {
  dashboardController,
  historyFetchController,
  analysisPipelineController,
  historyUpdationPipeline,
};
