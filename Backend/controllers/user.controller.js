import User from "../schema/user.model.js";
import History from "../schema/history.model.js";

const dashboardController = async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: "Username parameter is required" });
  }

  const userData = await User.findOne({ username });
  if(!userData){
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
  
      if(!userData){
          return res.status(404).json({ error: "User not found" });
      }
  
      return res.status(200).json({ history: userData.history });
  } catch (error) {
    console.error("Error fetching user history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { dashboardController, historyFetchController };