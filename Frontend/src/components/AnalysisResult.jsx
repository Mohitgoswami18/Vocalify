import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios"
import Waveform from "./Waveform.jsx"

/* ---------------- component ---------------- */

const AnalysisResult = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [useResult, setUseResult] = useState(null);
  const [prevUserData, setPrevUserData] = useState(null);
  const userAudio = location.state?.userAudio || "not recieved";
  const username = location.state?.username || "default";
  const [audioUrl, setAudioUrl] = useState(null);
  const formData = new FormData();
  if (userAudio) {
    formData.append("audio", userAudio);
  }
  console.log(useResult);
  console.log(prevUserData)

  /* ---------------- mock data ---------------- */

  const trendData = [
    {
      name: "Previous",
      Confidence: prevUserData?.prevMetrics.confidence || 0,
      Fluency: prevUserData?.prevMetrics.fluency || 0,
      Clarity: prevUserData?.prevMetrics.clarity || 0,
      Accent: prevUserData?.prevMetrics.accent || 0,
    },
    {
      name: "Current",
      Confidence: useResult?.emotion.confidence || 0,
      Fluency: useResult?.fluency || 0,
      Clarity: useResult?.clarity || 0,
      Accent: useResult?.accent || 0,
    },
  ];

  const comparisonData = [
    {
      metric: "Confidence",
      Previous: prevUserData?.prevMetrics.confidence || 0,
      Current: useResult?.emotion.confidence || 0,
    },
    { metric: "Fluency", Previous: prevUserData?.prevMetrics.fluency || 0, Current: useResult?.fluency || 0 },
    { metric: "Clarity", Previous: prevUserData?.prevMetrics.clarity || 0, Current: useResult?.clarity || 0 },
    { metric: "Accent", Previous: prevUserData?.prevMetrics.accent || 0, Current: useResult?.accent || 0 },
  ];

  const metrics = [
    { label: "Confidence", value: useResult?.emotion.confidence || 0 },
    { label: "Fluency", value: useResult?.fluency || 0 },
    { label: "Clarity", value: useResult?.clarity || 0 },
    { label: "Accent", value: useResult?.accent || 0 },
  ];

  const exerciseMap = {
    confidence: [
      "Practice speaking in front of a mirror.",
      "Emphasize key words while speaking.",
      "Record yourself and analyze tone variations.",
    ],
    clarity: [
      "Practice tongue twisters daily.",
      "Slow down your speech for better articulation.",
      "Focus on pronouncing ending consonants clearly.",
    ],
    fluency: [
      "Practice reading aloud without pauses.",
      "Reduce filler words by pausing silently.",
      "Use breathing techniques to maintain flow.",
    ],
    accent: [
      "Listen and repeat native pronunciation samples.",
      "Practice vowel and consonant sounds separately.",
      "Shadow native speakers using short audio clips.",
    ],
  };

  const sortedScores = [...metrics].sort((a, b) => a.value - b.value);
  const lowestTwo = sortedScores.slice(0, 2);


  useEffect(() => {
    if (!username) return;
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user/details?username=${username}`,
        );
        setPrevUserData(response.data.user);
        // console.log("User Data:", response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  useEffect(() => {
    if (!userAudio) return;

    const url = URL.createObjectURL(userAudio);
    setAudioUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [userAudio]);

  /* -------- simulate API fetch -------- */
  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/api/analyze-audio-result",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        setUseResult(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analysis result:", error);
        setLoading(false);
      }
    };

    fetchDataFromBackend();
  }, []);

  if(useResult){
    const handleHistoryUpdation = async () => {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/get-history",
        {
          username: username,
          confidence: useResult?.emotion.confidence || 0,
          clarity: useResult?.clarity || 0,
          fluency: useResult?.fluency || 0,
          accent: useResult?.accent || 0,
          overallScore: useResult?.overallScore || 0,
          audioUrl: audioUrl,
          transcript: useResult?.transcript || null,
          duration: useResult?.duration || 0,
          source: "analysis",
        },
      );
      console.log("History updated:", response.data);

      handleHistoryUpdation();
    };
  }

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <h2 className="text-lg font-semibold">Analyzing your voice…</h2>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          We’re processing your audio and generating personalized insights. This
          usually takes a few seconds.
        </p>
      </div>
    );
  }

  if (!useResult) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-lg font-semibold">No analysis results available</h2>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Please ensure your audio was processed correctly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ================= OVERALL SCORE ================= */}
      <div className="bg-blue-50 rounded-xl p-6 text-center">
        <p className="text-4xl font-bold text-blue-600">
          {useResult?.overallScore || 0}
        </p>
        <p className="text-sm text-gray-600 mt-1">Overall Score</p>

        <div className="flex justify-center gap-4 font-bold text-xs text-gray-500 mt-2">
          <span>Emotion: {useResult?.emotion.label || "unknown"}</span>
          <span>Age: {useResult?.age?.label || "unknown"}</span>
          <span>Gender: {useResult?.gender?.label || "unknown"}</span>
        </div>
      </div>

      {/* ================= METRIC BREAKDOWN ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((item) => (
          <div key={item.label} className="bg-white border rounded-xl p-4">
            <div className="flex justify-between text-sm">
              <span>{item.label}</span>
              <span className="font-semibold">{item.value}%</span>
            </div>

            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ================= AUDIO ANALYSIS ================= */}
      <div className="bg-white border rounded-xl p-4">
        <div className="bg-white border rounded-xl p-5">
          <h3 className="font-semibold mb-3 text-sm">Audio Analysis</h3>
          <Waveform audioUrl={audioUrl} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ================= CHARTS SECTION ================= */}
        {/* Metric Trends */}
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-semibold mb-3 text-sm">Metric Trends</h3>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[60, 100]} />
              <Tooltip />
              <Line dataKey="Confidence" stroke="#3b82f6" strokeWidth={2} />
              <Line dataKey="Fluency" stroke="#22c55e" strokeWidth={2} />
              <Line dataKey="Clarity" stroke="#a855f7" strokeWidth={2} />
              <Line dataKey="Accent" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Comparison */}
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-semibold mb-3 text-sm">Performance Comparison</h3>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis domain={[60, 100]} />
              <Tooltip />
              <Bar dataKey="Previous" fill="#c7d2fe" />
              <Bar dataKey="Current" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= SUGGESTED EXERCISES ================= */}
      <div className="bg-white border rounded-xl p-5">
        <h3 className="font-semibold mb-3">
          Suggested Exercises (Focus Areas)
        </h3>

        <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
          {lowestTwo.map(({ label }) => {
            const metricKey = label.toLowerCase();

            return exerciseMap[metricKey]?.map((exercise, i) => (
              <li key={`${metricKey}-${i}`}>{exercise}</li>
            ));
          })}
        </ul>
      </div>
    </div>
  );
};;

export default AnalysisResult;
