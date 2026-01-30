import { TiMicrophoneOutline } from "react-icons/ti";
import { GiMusicalNotes } from "react-icons/gi";
import { PiPersonArmsSpreadFill } from "react-icons/pi";
import { PiMedalDuotone } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";
import { MdHistoryToggleOff } from "react-icons/md";

const features = [
  {
    title: "Analyze Voice",
    desc: "Get detailed insights into pronunciation, tone, and speaking patterns.",
    icon: <TiMicrophoneOutline />,
    highlight: true,
  },
  {
    title: "Record & Upload",
    desc: "Record live using microphone or upload audio files easily.",
    icon: <GiMusicalNotes />,
    highlight: true,
  },
  {
    title: "AI Metrics: Confidence",
    desc: "AI-powered analysis to measure confidence, clarity, and fluency.",
    icon: <PiPersonArmsSpreadFill />,
    highlight: true,
  },
  {
    title: "AI Metrics: Clarity & Fluency",
    desc: "Receive scores on your speech clarity, articulation, and the natural flow of your language.",
    icon: <PiMedalDuotone />,
    highlight: true,
  },
  {
    title: "Progress Tracking",
    desc: "Track improvements over time with detailed analytics.",
    icon: <GiProgression />,
    highlight: true,
  },
  {
    title: "Profile & History",
    desc: "Access previous analyses and personalized history anytime.",
    icon: <MdHistoryToggleOff />,
    highlight: true,
  },
];

const FeatureSection = () => {
  return (
    <div>
      <section id="features" className="bg-gray-50 py-16 px-18 font-[Inter]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center">
            Powerful Features to Elevate Your Communication
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 border ${
                  item.highlight ? "border-blue-400" : ""
                }`}
              >
                <div className="text-3xl rounded-full bg-cyan-100 p-2 w-fit text-blue-500">{item.icon}</div>
                <h3 className="mt-4 font-bold">{item.title}</h3>
                <p className="mt-4 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      ;
    </div>
  );
}

export default FeatureSection

