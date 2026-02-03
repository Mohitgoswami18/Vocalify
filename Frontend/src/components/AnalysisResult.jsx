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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

/* ---------------- mock data ---------------- */

const metrics = [
  { title: "Overall Performance", value: 85, subtitle: "Consistent progress" },
  { title: "Confidence", value: 92, subtitle: "Strong presence" },
  { title: "Clarity", value: 88, subtitle: "Clear articulation" },
  { title: "Fluency", value: 80, subtitle: "Smooth delivery" },
  { title: "Accent", value: 75, subtitle: "Neutral clarity" },
];

const waveform = [
  { time: "0:00", score: 60 },
  { time: "0:15", score: 70 },
  { time: "0:30", score: 78 },
  { time: "0:45", score: 82 },
  { time: "1:00", score: 85 },
];

const recommendations = [
  {
    title: "Vocal Warm-up Exercises",
    desc: "Spend 5 minutes warming up your voice before presentations.",
  },
  {
    title: "Pacing Control",
    desc: "Slow down slightly during key points for better clarity.",
  },
  {
    title: "Confidence Building",
    desc: "Practice emphasizing keywords to strengthen delivery.",
  },
];

const comparison = [
  { metric: "Confidence", current: 92, previous: 85 },
  { metric: "Clarity", current: 88, previous: 82 },
  { metric: "Fluency", current: 80, previous: 78 },
];

/* ---------------- component ---------------- */

const AnalysisResult = () => {
  const [loading, setLoading] = useState(true);

  /* -------- simulate API fetch -------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // replace with real API completion
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

  /* ================= RESULT UI ================= */
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Pitch Deck Presentation Practice
          </h1>
          <p className="text-sm text-muted-foreground">
            Post-analysis performance insights
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">Share</Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((item) => (
          <Card key={item.title}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{item.title}</p>
              <p className="text-3xl font-bold mt-1">{item.value}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                {item.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Waveform Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Waveform Timeline</CardTitle>
        </CardHeader>
        <CardContent className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={waveform}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
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

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="border rounded-lg p-3">
              <p className="font-medium">{rec.title}</p>
              <p className="text-sm text-muted-foreground">{rec.desc}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comparison.map((item) => (
            <div
              key={item.metric}
              className="border rounded-xl p-4 text-center"
            >
              <p className="text-sm text-muted-foreground">{item.metric}</p>
              <p className="text-lg font-semibold mt-1">
                {item.current}{" "}
                <span className="text-xs text-muted-foreground">current</span>
              </p>
              <p className="text-sm text-muted-foreground">
                {item.previous} previous
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex justify-center">
        <Button size="lg">Practice Suggested Exercises</Button>
      </div>
    </div>
  );
};

export default AnalysisResult;

//  Replace this
// setTimeout(() => {
//   setLoading(false);
//   setProgress(100);
// }, 2500);

// with this
// await fetchDataFromBackend();
// setLoading(false);
// setProgress(100);
