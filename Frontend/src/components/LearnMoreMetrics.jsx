import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {useNavigate} from "react-router-dom";
import { RiMicAiFill } from "react-icons/ri";
import {
  BarChart2,
  BookOpen,
  Star,
  MessageSquare,
  Mic,
  Volume2,
} from "lucide-react";

const faqs = [
  {
    q: "How accurate are these analysis metrics?",
    a: "Our AI models are trained on large-scale speech datasets, providing highly accurate and consistent results. While no AI system is perfect, these metrics deliver reliable and actionable insights.",
  },
  {
    q: "Can I use this for language learning?",
    a: "Yes. These metrics are especially useful for language learners to identify pronunciation, clarity, and fluency gaps, accelerating improvement.",
  },
  {
    q: "Is my data private and secure?",
    a: "Absolutely. All speech data is processed securely and never shared with third parties. You retain full control over your data.",
  },
  {
    q: "What if I speak multiple languages?",
    a: "Our models are currently optimized for English, but support for additional languages is actively being developed.",
  },
];

const LearnMoreMetrics = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);
  const { isSignedIn, isLoaded, user } = useUser();

  const handleClick = () => {
    if (!isLoaded) return;
    if (isSignedIn) {
      navigate(`/${user.username}/analyze`);
    } else {
      navigate("/auth/signup");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HEADER ================= */}
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-blue-600">
          <RiMicAiFill className="w-5 h-5" />
          Vocalify
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 cursor-pointer">Help</span>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-20">
        {/* ================= HERO ================= */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">
            Learn More About Your Speech Analysis Metrics
          </h1>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Understand the science behind your speech, improve your
            communication, and master every nuance of your vocal delivery with
            our detailed metric explanations.
          </p>
        </section>

        {/* ================= CORE METRICS ================= */}
        <section className="space-y-10">
          <h2 className="text-2xl font-semibold text-center">
            Core Metrics Explained
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              icon={<Star />}
              title="Confidence"
              desc="Measures how certain the AI is about transcription and analysis. Higher scores indicate clearer, more consistent speech."
            />
            <MetricCard
              icon={<MessageSquare />}
              title="Clarity"
              desc="Assesses the precision of pronunciation and articulation. High scores mean easily distinguishable words."
            />
            <MetricCard
              icon={<Mic />}
              title="Fluency"
              desc="Measures smoothness and rhythm of your speech, including pace and pauses."
            />
            <MetricCard
              icon={<Volume2 />}
              title="Accent"
              desc="Identifies phonetic characteristics of your speech relative to a standard pronunciation model."
            />
          </div>
        </section>

        {/* ================= CONFIDENCE ================= */}
        <MetricSection
          title="Confidence"
          description="Confidence gauges the certainty of the AI’s acoustic model in recognizing spoken words and assessing speech characteristics. High confidence indicates stable pitch, volume, and articulation."
          calculation="Confidence is calculated using probability scores assigned by the speech recognition model to each phoneme and word. Higher average probabilities and lower variance across the utterance increase the score."
          examples={[
            [
              "Poor Confidence (20%)",
              "Um… I think… maybe we should try this?",
              "Uncertainty",
            ],
            [
              "Average Confidence (60%)",
              "I believe this could work, though there may be challenges.",
              "Some Hesitation",
            ],
            [
              "Good Confidence (85%)",
              "We are confident in our ability to deliver results.",
              "Clear & Consistent",
            ],
            [
              "Excellent Confidence (95%)",
              "Absolute certainty in our strategic direction.",
              "Strong & Fluent",
            ],
          ]}
        />

        {/* ================= CLARITY ================= */}
        <MetricSection
          title="Clarity"
          description="Clarity evaluates how distinct and understandable individual sounds and words are, focusing on crisp consonants and open vowels."
          calculation="Clarity is computed by analyzing phoneme-level acoustic features and comparing them against standard pronunciation models. Slurring and incomplete sound formation reduce the score."
          examples={[
            ["Poor Clarity (25%)", "Didya wannago t’ the store?", "Mumbled"],
            [
              "Average Clarity (65%)",
              "Could you please repeat that?",
              "Some Slurring",
            ],
            [
              "Good Clarity (88%)",
              "Please articulate each word clearly.",
              "Well-Articulated",
            ],
            [
              "Excellent Clarity (97%)",
              "Every syllable was enunciated distinctly.",
              "Crystal Clear",
            ],
          ]}
        />

        {/* ================= FLUENCY ================= */}
        <MetricSection
          title="Fluency"
          description="Fluency measures the natural flow, rhythm, and pacing of speech, including pause placement and filler word usage."
          calculation="Fluency is calculated using speech rate (WPM), pause duration, timing consistency, and filler word frequency. Speech aligning with natural human rhythm scores higher."
          examples={[
            ["Poor Fluency (30%)", "I… uh… wanted to… say…", "Choppy"],
            [
              "Average Fluency (70%)",
              "The report, although comprehensive, needs revisions.",
              "Some Pauses",
            ],
            [
              "Good Fluency (90%)",
              "Her presentation flowed smoothly.",
              "Smooth",
            ],
            [
              "Excellent Fluency (98%)",
              "He spoke with effortless rhythm.",
              "Effortless",
            ],
          ]}
        />

        {/* ================= PRACTICAL TIPS ================= */}
        <section className="border rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 font-semibold">
            <BookOpen className="text-blue-500" />
            Practical Tips & Suggested Exercises
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700">
            <ul className="list-disc pl-5 space-y-2">
              <li>Identify sounds that differ from your target accent.</li>
              <li>Imitate native speakers’ rhythm and intonation.</li>
              <li>Practice minimal sound pairs.</li>
              <li>Record and compare pronunciation.</li>
            </ul>
            <ul className="list-disc pl-5 space-y-2">
              <li>Shadow native speakers.</li>
              <li>Practice vowel and consonant drills.</li>
              <li>Analyze recorded speech.</li>
            </ul>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-center">
            Frequently Asked Questions
          </h2>

          <div className="border rounded-2xl divide-y">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex justify-between font-medium"
                >
                  {faq.q}
                  <span>{openFAQ === i ? "−" : "+"}</span>
                </button>
                {openFAQ === i && (
                  <p className="mt-3 text-sm text-gray-600">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <div className="text-center">
          <button
            onClick={() => handleClick()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium"
          >
            Try a Sample Analysis
          </button>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="text-center text-xs text-gray-400 border-t pt-6">
          © 2026 SpeechInsights. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

/* ---------------- HELPERS ---------------- */

const MetricCard = ({ icon, title, desc }) => (
  <div className="border rounded-xl p-6 bg-white shadow-sm space-y-3">
    <div className="text-blue-500">{icon}</div>
    <h3 className="font-semibold">{title}</h3>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
);

const MetricSection = ({ title, description, calculation, examples }) => (
  <section className="space-y-8">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="text-gray-700">{description}</p>

    <div className="bg-gray-50 border rounded-2xl p-6 space-y-2">
      <div className="flex items-center gap-2 font-semibold">
        <BarChart2 className="text-blue-500" />
        How Scores Are Calculated
      </div>
      <p className="text-sm text-gray-700">{calculation}</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {examples.map(([t, txt, tag]) => (
        <div key={t} className="border rounded-xl p-4 bg-white shadow-sm">
          <h4 className="font-semibold text-sm">{t}</h4>
          <p className="text-sm italic text-gray-600 mt-1">“{txt}”</p>
          <span className="inline-block mt-2 text-xs bg-gray-100 px-2 py-1 rounded-full">
            {tag}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default LearnMoreMetrics;
