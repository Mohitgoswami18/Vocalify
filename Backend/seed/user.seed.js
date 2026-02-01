import connectToDatabase from "../database/database.js";
import User from "../schema/user.model.js";


const userData = [
    {
      "username": "john_doe",
      "email": "john.doe@example.com",
      "profilePic": "https://i.pravatar.cc/150?img=1",
      "prevMetrics": {
        "confidence": 72,
        "clarity": 68,
        "fluency": 75,
        "accent": 70
      },
      "currentMetrics": {
        "confidence": 78,
        "clarity": 74,
        "fluency": 80,
        "accent": 76
      }
    },
    {
      "username": "sarah_smith",
      "email": "sarah.smith@example.com",
      "profilePic": "https://i.pravatar.cc/150?img=5",
      "prevMetrics": {
        "confidence": 65,
        "clarity": 70,
        "fluency": 68,
        "accent": 72
      },
      "currentMetrics": {
        "confidence": 82,
        "clarity": 85,
        "fluency": 80,
        "accent": 83
      }
    },
    {
      "username": "mike_johnson",
      "email": "mike.johnson@example.com",
      "profilePic": "https://i.pravatar.cc/150?img=12",
      "prevMetrics": {
        "confidence": 55,
        "clarity": 60,
        "fluency": 58,
        "accent": 62
      },
      "currentMetrics": {
        "confidence": 70,
        "clarity": 72,
        "fluency": 68,
        "accent": 71
      }
    },
    {
      "username": "emily_chen",
      "email": "emily.chen@example.com",
      "profilePic": "https://i.pravatar.cc/150?img=9",
      "prevMetrics": {
        "confidence": 80,
        "clarity": 85,
        "fluency": 82,
        "accent": 78
      },
      "currentMetrics": {
        "confidence": 88,
        "clarity": 90,
        "fluency": 87,
        "accent": 85
      }
    },
    {
      "username": "alex_rodriguez",
      "email": "alex.rodriguez@example.com",
      "profilePic": "",
      "prevMetrics": {
        "confidence": 0,
        "clarity": 0,
        "fluency": 0,
        "accent": 0
      },
      "currentMetrics": {
        "confidence": 0,
        "clarity": 0,
        "fluency": 0,
        "accent": 0
      }
    },
    {
      "username": "lisa_brown",
      "email": "lisa.brown@example.com",
      "profilePic": "https://i.pravatar.cc/150?img=20",
      "prevMetrics": {
        "confidence": 68,
        "clarity": 72,
        "fluency": 70,
        "accent": 65
      },
      "currentMetrics": {
        "confidence": 75,
        "clarity": 78,
        "fluency": 76,
        "accent": 73
      }
    },
    {
      "username": "david_kim",
      "email": "david.kim@example.com",
      "profilePic": "https://i.pravatar.cc/150?img=15",
      "prevMetrics": {
        "confidence": 60,
        "clarity": 65,
        "fluency": 62,
        "accent": 68
      },
      "currentMetrics": {
        "confidence": 72,
        "clarity": 75,
        "fluency": 70,
        "accent": 74
      }
    },
    {
      "username": "maria_garcia",
      "email": "maria.garcia@example.com",
      "profilePic": "https://i.pravatar.cc/150?img=25",
      "prevMetrics": {
        "confidence": 78,
        "clarity": 80,
        "fluency": 76,
        "accent": 72
      },
      "currentMetrics": {
        "confidence": 85,
        "clarity": 87,
        "fluency": 83,
        "accent": 80
      }
    }
  ]

connectToDatabase();

const seedUsers = async () => {
    try {
        const insertedUsers = await User.insertMany(userData);
        if(insertedUsers) console.log("User data seeded successfully");
    } catch (error) {
        console.error("Error seeding user data:", error);
        process.exit(1);
    }
}

seedUsers();