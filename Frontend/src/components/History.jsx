import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const History = () => {
  const { username } = useParams();
  const location = useLocation();
  const selectedMetric = location.state?.metric || null;

  const [userData, setUserData] = useState(null);
  console.log(userData)
  const [currentMetrics, setCurrentMetrics] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [showDetailed, setShowDetailed] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  console.log(userData)

  const [overallTrend, setOverallTrend] = useState([]);
  const [metricTrends, setMetricTrends] = useState({
    Confidence: [],
    Clarity: [],
    Fluency: [],
    Accent: [],
  });
  const [detailedMetricTrends, setDetailedMetricTrends] = useState({
    Confidence: [],
    Clarity: [],
    Fluency: [],
    Accent: [],
  });


  /* ================= FETCH DATA ================= */

  useEffect(() => {
    if (!username) return;

    const fetchHistory = async () => {
      const res = await axios.get(
        `http://localhost:10000/api/v1/user/history?username=${username}`,
      );
      setUserData(res.data);
    };

    const fetchCurrentMetrics = async () => {
      const res = await axios.get(
        `http://localhost:10000/api/v1/user/details?username=${username}`,
      );
      setCurrentMetrics(res.data.user);
    };

    fetchHistory();
    fetchCurrentMetrics();
  }, [username]);

  /* ================= PREPARE CHART DATA ================= */

  useEffect(() => {
    if (!userData?.history?.length) return;

    const sorted = [...userData.history].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );

    /* ---------- OVERALL TREND ---------- */
    const overall = sorted.map((item) => ({
      x: new Date(item.createdAt).toLocaleDateString(),
      score: item.overallScore,
    }));

    setOverallTrend(overall);

    /* ---------- SMALL CHARTS (LAST 3) ---------- */
    const lastThree = sorted.slice(-3);

    setMetricTrends({
      Confidence: lastThree.map((item, i) => ({
        x: i + 1,
        y: item.metrics.confidence,
      })),
      Clarity: lastThree.map((item, i) => ({
        x: i + 1,
        y: item.metrics.clarity,
      })),
      Fluency: lastThree.map((item, i) => ({
        x: i + 1,
        y: item.metrics.fluency,
      })),
      Accent: lastThree.map((item, i) => ({
        x: i + 1,
        y: item.metrics.accent,
      })),
    });

    /* ---------- DETAILED CHARTS (LAST 15) ---------- */
    const lastFifteen = sorted.slice(-15);

    setDetailedMetricTrends({
      Confidence: lastFifteen.map((item, i) => ({
        x: i + 1,
        y: item.metrics.confidence,
      })),
      Clarity: lastFifteen.map((item, i) => ({
        x: i + 1,
        y: item.metrics.clarity,
      })),
      Fluency: lastFifteen.map((item, i) => ({
        x: i + 1,
        y: item.metrics.fluency,
      })),
      Accent: lastFifteen.map((item, i) => ({
        x: i + 1,
        y: item.metrics.accent,
      })),
    });

    setSelectedHistory(sorted[sorted.length - 1]);
  }, [userData]);


  /* ================= AUTO SCROLL FROM DASHBOARD ================= */

  useEffect(() => {
    if (selectedMetric) {
      setShowDetailed(true);
      setTimeout(() => {
        document
          .getElementById(selectedMetric)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [selectedMetric]);

  /* ================= COMPARISON ================= */

  const comparison = {
    previous: {
      Confidence: currentMetrics?.prevMetrics?.confidence || 0,
      Clarity: currentMetrics?.prevMetrics?.clarity || 0,
      Fluency: currentMetrics?.prevMetrics?.fluency || 0,
      Accent: currentMetrics?.prevMetrics?.accent || 0,
    },
    current: {
      Confidence: currentMetrics?.currentMetrics?.confidence || 0,
      Clarity: currentMetrics?.currentMetrics?.clarity || 0,
      Fluency: currentMetrics?.currentMetrics?.fluency || 0,
      Accent: currentMetrics?.currentMetrics?.accent || 0,
    },
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Your Voice Journey</h1>
        <p className="text-sm text-muted-foreground">
          Track your progress and insights over time.
        </p>
      </div>

      {/* COMPARISON */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["previous", "current"].map((type) => (
          <Card key={type}>
            <CardHeader>
              <CardTitle className="text-base">
                {type === "previous" ? "Previous Analysis" : "Current Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(comparison[type]).map(([label, value]) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{label}</span>
                    <span>{value}/100</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SELECTED HISTORY DETAILS */}
      {selectedHistory && (
        <Card id="selected-history">
          <CardHeader>
            <CardTitle className="text-base">Analysis Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <span>
                Overall: <b>{selectedHistory.overallScore}%</b>
              </span>
              <span>
                Duration: <b>{selectedHistory.duration}s</b>
              </span>
              <span>
                Source: <b className="capitalize">{selectedHistory.source}</b>
              </span>
              <span>
                Date:{" "}
                <b>
                  {new Date(selectedHistory.createdAt).toLocaleDateString()}
                </b>
              </span>
            </div>

            {selectedHistory.audioUrl && (
              <audio
                controls
                src={selectedHistory.audioUrl}
                className="w-full"
              />
            )}

            <button onClick={() => setShowTranscript(!showTranscript)} className="text-white font-bold rounded-md p-2  bg-blue-500 text-xs hover:bg-blue-600 cursor-pointer">
              {showTranscript ? "Hide Transcript" : "Show Transcript"}
            </button>

            {showTranscript && (
              <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
                {selectedHistory.transcript || "No transcript available."}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* OVERALL TREND */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Overall Progress Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={overallTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* SMALL METRIC CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(metricTrends).map(([metric, data]) => (
          <Card key={metric}>
            <CardHeader>
              <CardTitle className="text-sm">{metric}</CardTitle>
            </CardHeader>
            <CardContent className="h-28">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="x" hide />
                  <YAxis hide />
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TOGGLE */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setShowDetailed(!showDetailed)}
        >
          {showDetailed ? "Hide Detailed History" : "View Detailed History"}
        </Button>
      </div>

      {/* DETAILED METRIC SECTIONS */}
      {showDetailed && (
        <div className="space-y-12 w-[60%] mx-auto">
          {Object.entries(detailedMetricTrends).map(([metric, data]) => (
            <section key={metric} id={metric}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {metric} – Detailed History
                  </CardTitle>
                </CardHeader>

                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="y"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </section>
          ))}
        </div>
      )}

      {/* PREVIOUS RECORDINGS */}
      {userData?.history?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Previous Recordings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {userData.history.slice(0, 5).map((item, index) => (
              <div
                key={item._id}
                className="flex justify-between items-center border rounded-lg p-3"
              >
                <div className="text-sm">
                  <p className="font-medium">Analysis #{index + 1}</p>
                  <p className="text-muted-foreground">
                    {item.overallScore} · {item.duration}s · {item.source}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedHistory(item);
                    setTimeout(() => {
                      document
                        .getElementById("selected-history")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 150);
                  }}
                >
                  View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default History;
