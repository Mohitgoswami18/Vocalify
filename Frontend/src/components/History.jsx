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

/* ------------------ data ------------------ */

const comparison = {
  previous: {
    Confidence: 75,
    Clarity: 82,
    Fluency: 68,
    Accent: 80,
  },
  current: {
    Confidence: 80,
    Clarity: 85,
    Fluency: 72,
    Accent: 86,
  },
};

const overallTrend = [
  { month: "Jan", score: 62 },
  { month: "Feb", score: 65 },
  { month: "Mar", score: 68 },
  { month: "Apr", score: 72 },
  { month: "May", score: 75 },
  { month: "Jun", score: 78 },
  { month: "Jul", score: 80 },
];

const metricTrends = {
  Confidence: [
    { x: 1, y: 70 },
    { x: 2, y: 75 },
    { x: 3, y: 80 },
  ],
  Clarity: [
    { x: 1, y: 78 },
    { x: 2, y: 85 },
    { x: 3, y: 82 },
  ],
  Fluency: [
    { x: 1, y: 65 },
    { x: 2, y: 70 },
    { x: 3, y: 72 },
  ],
  Accent: [
    { x: 1, y: 88 },
    { x: 2, y: 85 },
    { x: 3, y: 86 },
  ],
};

/* ------------------ component ------------------ */

const History = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Your Voice Journey</h1>
        <p className="text-sm text-muted-foreground">
          Track your progress and insights over time.
        </p>
      </div>

      {/* Comparison */}
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

      {/* Overall Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Overall Progress Trend</CardTitle>
        </CardHeader>

        <CardContent className="h-75">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={overallTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[60, 85]} />
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

      {/* Detailed Metric Trends */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(metricTrends).map(([metric, data]) => (
          <Card key={metric}>
            <CardHeader>
              <CardTitle className="text-sm">{metric}</CardTitle>
            </CardHeader>

            <CardContent className="h-30">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
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

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tips for Improvement</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <p className="text-sm text-muted-foreground max-w-xl">
            Based on your recent analysis, focus on varying your vocal pitch to
            improve engagement. Practice reading aloud with different tones.
          </p>
          <Button>Practice Exercises</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
