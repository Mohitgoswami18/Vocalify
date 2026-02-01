import { IoAnalyticsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const metrics = [
  {
    title: "Confidence",
    value: 85,
    change: "+4%",
    positive: true,
  },
  {
    title: "Clarity",
    value: 78,
    change: "+2%",
    positive: true,
  },
  {
    title: "Fluency",
    value: 92,
    change: "-1%",
    positive: false,
  },
  {
    title: "Accent Score",
    value: 70,
    change: "+3%",
    positive: true,
  },
];

const Dashboard = () => {

  const navigate = useNavigate();
  const param = useParams();
  const username = param.username;

  return (
    <div className="font-[Inter]">
      {/* Welcome */}
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome back, Alex Johnson!
      </h1>
      <p className="text-gray-500 text-sm mt-1">
        Here's an overview of your recent voice analysis metrics and quick
        actions.
      </p>

      {/* Metrics */}
      <h2 className="mt-8 mb-4 font-bold text-gray-800">Your Key Metrics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-5 shadow-sm border">
            <p className="text-sm text-gray-500">{item.title}</p>

            <p className="text-3xl font-bold mt-2">{item.value}</p>

            <p
              className={`text-sm mt-1 ${
                item.positive ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.positive ? "↑" : "↓"} {item.change} from last period
            </p>

            <div className="mt-4 bg-blue-50 text-blue-600 text-xs rounded-lg py-2 text-center cursor-pointer">
              Trend graph
            </div>
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
