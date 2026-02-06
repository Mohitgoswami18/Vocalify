import { IoAnalyticsSharp } from "react-icons/io5";
import { data, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

const Dashboard = () => {

  const navigate = useNavigate();
  const param = useParams();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userData, setUserData] = useState(null);
  const username = param.username;
  console.log(userData)

  const getPercentChange = (prev, curr) => {
    if (prev === 0) {
      return curr === 0 ? 0 : 100;
    }

    const change = ((curr - prev) / prev) * 100;
    let value = change.toString();

    return change < 0 ? `-${value.slice(0, 4)}` : `+${value.slice(0, 4)}`
  };

  const isPositive = (prev, curr) => {
    return curr >= prev;
  }


  const metrics = [
    {
      title: "Confidence",
      value: userData?.currentMetrics.confidence || 0,
      change: getPercentChange(
        userData?.prevMetrics.confidence || 0,
        userData?.currentMetrics.confidence || 0,
      ),
      positive: isPositive(
        userData?.prevMetrics.confidence || 0,
        userData?.currentMetrics.confidence || 0,
      ),
    },
    {
      title: "Clarity",
      value: userData?.currentMetrics.clarity || 0,
      change: getPercentChange(
        userData?.prevMetrics.clarity || 0,
        userData?.currentMetrics.clarity || 0,
      ),
      positive: isPositive(
        userData?.prevMetrics.confidence || 0,
        userData?.currentMetrics.confidence || 0,
      ),
    },
    {
      title: "Fluency",
      value: userData?.currentMetrics.fluency || 0,
      change: getPercentChange(
        userData?.prevMetrics.fluency || 0,
        userData?.currentMetrics.fluency || 0,
      ),
      positive: isPositive(
        userData?.prevMetrics.confidence || 0,
        userData?.currentMetrics.confidence || 0,
      ),
    },
    {
      title: "Accent Score",
      value: userData?.currentMetrics.accent || 0,
      change: getPercentChange(
        userData?.prevMetrics.accent || 0,
        userData?.currentMetrics.accent || 0,
      ),
      positive: isPositive(
        userData?.prevMetrics.confidence || 0,
        userData?.currentMetrics.confidence || 0,
      ),
    },
  ];

  useEffect(() => {
    if(!username) return;
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:10000/api/v1/user/details?username=${username}`,
        );
        setDataLoaded(true);
        setUserData(response.data.user);
        // console.log("User Data:", response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="font-[Inter]">
      {/* Welcome */}
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome back, {username}!
      </h1>
      <p className="text-gray-500 text-sm mt-1">
        Here's an overview of your recent voice analysis metrics and quick
        actions.
      </p>

      {/* Metrics */}
      <h2 className="mt-8 mb-4 font-bold text-gray-800">Your Key Metrics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dataLoaded
          ? metrics.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-sm border"
              >
                <p className="text-sm text-gray-500">{item.title}</p>

                <p className="text-3xl font-bold mt-2">{item.value}</p>

                <p
                  className={`text-sm mt-1 ${
                    item.positive ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.positive ? "↑" : "↓"} {item.change} from last period
                </p>

                <div
                onClick={() => navigate(`/:${username}/history`, { state: { metric: item.title } })}
                className="mt-4 bg-blue-50 text-blue-600 text-xs rounded-lg py-2 text-center cursor-pointer">
                  Trend graph
                </div>
              </div>
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-sm border"
              >
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-8 w-20 mb-3" />
                <Skeleton className="h-4 w-32 mb-6" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
            ))}
      </div>

      {/* Quick Actions */}
      <h2 className="mt-8 mb-4 font-semibold text-gray-800">Quick Actions</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            navigate(`/:${username}/analyze`);
          }}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
        >
          <IoAnalyticsSharp></IoAnalyticsSharp> Start New Analysis
        </button>

        <button
          onClick={() => {
            navigate(`/:${username}/history`);
          }}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
        >
          ⏱ Review Past Results
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
