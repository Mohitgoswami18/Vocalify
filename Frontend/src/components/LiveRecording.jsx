import { useEffect, useRef, useState } from "react";
import { Play, Square, RefreshCw } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const randomParagraphs = [
  "Public speaking is a valuable skill that improves with consistent practice and feedback.",
  "Clear communication helps convey ideas effectively and builds confidence over time.",
  "Technology and artificial intelligence are transforming how humans learn and communicate.",
];

const RecordPractice = () => {
  const [mode, setMode] = useState(null);
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const param = useParams();
  const navigate = useNavigate();
  const username = param.username;

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  /* ---------------- Timer ---------------- */
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(
        () => setSeconds((prev) => prev + 1),
        1000,
      );
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  /* ---------------- Recording Logic ---------------- */
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    mediaRecorderRef.current = recorder;
    audioChunksRef.current = [];

    recorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);

      setAudioBlob(blob);
      setAudioUrl(url);
    };

    recorder.start();
    setSeconds(0);
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  /* ---------------- Cleanup Object URL ---------------- */
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  /* ---------------- Text Helpers ---------------- */
  const generateParagraph = () => {
    const random =
      randomParagraphs[Math.floor(Math.random() * randomParagraphs.length)];
    setMode("generated");
    setText(random);
  };

  /* ---------------- Analysing Logic ---------------- */
  const handleSubmit = () => {
    navigate(`/${username}/analysisResult`, {
      state: { userAudio: audioBlob, username: username, method: "record" },
    });
  };

  const handleRecordingSaveLogic = () => {
    // Implement saving logic here
    return;
  };

  return (
    <div className="max-w-6xl mx-auto bg-white border rounded-2xl p-8 space-y-8">
      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ================= LEFT : TEXT ================= */}
        <section className="space-y-4">
          <button
            onClick={() => {
              setMode("plain");
              setText("start Recording Now ...");
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            Prepare Your Text
          </button>

          <button
            onClick={generateParagraph}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw size={16} />
            Generate Random Paragraph
          </button>

          <textarea
            value={text}
            onChange={(e) => {
              setMode("own");
              setText(e.target.value);
            }}
            placeholder="Click 'Generate Random Paragraph' or type your own text here to start practicing."
            className="w-full h-48 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <p className="text-xs text-gray-500">
            Ensure your microphone is enabled and allowed in browser settings.
          </p>
        </section>

        {/* ================= RIGHT : RECORDER ================= */}
        <section className="border rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold">Recording Controls</h2>

          <div className="text-center text-3xl font-mono">
            {formatTime(seconds)}
          </div>

          {/* Fake waveform */}
          <div className="h-20 bg-gray-100 rounded-lg flex items-end gap-1 px-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-blue-500 rounded"
                style={{
                  height: isRecording ? Math.random() * 60 + 10 : 10,
                }}
              />
            ))}
          </div>

          <div className="flex justify-center">
            {!isRecording ? (
              <button
                onClick={startRecording}
                disabled={!text}
                className={`p-4 rounded-full ${
                  text
                    ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Play />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white cursor-pointer"
              >
                <Square />
              </button>
            )}
          </div>
        </section>
      </div>

      {/* ================= PLAYBACK ================= */}
      {audioBlob && (
        <div className="border rounded-xl p-4 space-y-3">
          <p className="font-semibold text-sm">Playback</p>
          <audio ref={audioRef} src={audioUrl} controls className="w-full" />
        </div>
      )}

      {/* ================= ACTIONS ================= */}
      <div className="flex justify-end gap-4">
        <button
          disabled={!audioBlob}
          className={`px-4 py-2 rounded-lg text-sm ${
            audioBlob
              ? "border cursor-pointer"
              : "border text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => handleRecordingSaveLogic()}
        >
          Save Recording
        </button>

        <button
          disabled={!audioBlob}
          className={`px-4 py-2 rounded-lg text-sm ${
            audioBlob
              ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
              : "bg-blue-200 text-white cursor-not-allowed"
          }`}
          onClick={() => handleSubmit()}
        >
          Analyze Voice
        </button>
      </div>

      <p className="text-center text-xs text-gray-400">
        © 2026 Voice IQ. All rights reserved.
      </p>
    </div>
  );
};

export default RecordPractice;
