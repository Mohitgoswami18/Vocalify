import User from "../schema/user.model.js";
import axios from "axios";
import FormData from "form-data";
import History from "../schema/history.model.js";
import uploadToCloudinary from "../cloudinary.js";
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

    const userData = await User.findOne({ username }).populate("history"); // 🔥 only this

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ history: userData.history });
  } catch (error) {
    console.error("Error fetching user history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const UpdateUserProfilePicture = async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Username parameter is required" });
    }

    const profilePhotoLocalPath = req.file?.path;
    if (!profilePhotoLocalPath) {
      return res.status(400).json({ error: "Profile picture not found" });
    }

    const profilePhotoUpdatedURL = await uploadToCloudinary(
      profilePhotoLocalPath,
    );
    if (!profilePhotoUpdatedURL) {
      return res
        .status(500)
        .json({
          error:
            "There was an error while uploading the profile photo please try again later",
        });
    }

    const currentUser = await User.findOneAndUpdate(
      { username },
      {
        profilePic: profilePhotoUpdatedURL.secure_url,
      },
      {
        new: true,
      },
    );

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Profile photo updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const historyUpdationPipeline = async (req, res) => {
  try {
    console.log("Received history update request with body:", req.body);

    const {
      username,
      confidence,
      clarity,
      fluency,
      accent,
      overallScore,
      audioUrl,
      transcript,
      duration,
      source,
    } = req.body;

    if (
      !username ||
      confidence == null ||
      clarity == null ||
      fluency == null ||
      accent == null ||
      overallScore == null
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found for username:", username);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User found:", user);

    const newHistoryEntry = {
      user: user._id,
      metrics: {
        confidence,
        clarity,
        fluency,
        accent,
      },
      overallScore,
      audioUrl: audioUrl ?? null,
      transcript: transcript ?? null,
      duration: duration ?? 0,
      source: source ?? null,
    };

    const historyEntry = await History.create(newHistoryEntry);

    user.history.push(historyEntry._id);

    const updatedPreviousMetrics = {
      confidence: user.currentMetrics.confidence,
      clarity: user.currentMetrics.clarity,
      fluency: user.currentMetrics.fluency,
      accent: user.currentMetrics.accent,
    };

    const updatedCurrentMetrics = {
      confidence,
      clarity,
      fluency,
      accent,
    };

    user.currentMetrics = updatedCurrentMetrics;
    user.prevMetrics = updatedPreviousMetrics;
    await user.save();

    console.log("New history entry created:", historyEntry);

    return res.status(200).json({
      message: "History updated successfully",
      historyEntry,
    });
  } catch (error) {
    console.error("Error in historyUpdationPipeline:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const analysisPipelineController = async (req, res) => {
  try {
    const userAudioPath = req.file?.path;
    if (!userAudioPath) {
      return res.status(400).json({ error: "Audio file is required" });
    }
    console.log("Received audio file path:", userAudioPath);

    const userAudioURL = await uploadToCloudinary(userAudioPath);
    if (!userAudioURL) {
      return res
        .status(500)
        .json({ error: "Failed to upload audio to Cloudinary" });
    }

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

    if (!modelPredictions) {
      return res.status(500).json({ error: "Model prediction failed" });
    }

    return res
      .status(200)
      .json({ prediction: modelPredictions.data, audioUrl: userAudioURL });
  } catch (error) {
    console.error("Error in analysis pipeline:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export {
  dashboardController,
  historyFetchController,
  analysisPipelineController,
  historyUpdationPipeline,
  UpdateUserProfilePicture,
};
