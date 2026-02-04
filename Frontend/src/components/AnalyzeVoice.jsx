import { SiKdenlive } from "react-icons/si";
import { ImUpload } from "react-icons/im";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AnalyzeVoice = () => {
  const navigate = useNavigate();
  const param = useParams();
  const username = param.username;
  const [selectedOption, setSelectedOption] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const handleClick = () => {
    if (selectedOption == "record") {
      navigate(`/:${username}/recording`);
    } else {
      // Handle file upload option
      navigate(`/:${username}/analysisResult`, {
        state: { userAudio: audioFile, username: username },
      });
    }
  };

  const isAnalyzeDisabled =
    !selectedOption || (selectedOption === "upload" && !audioFile);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8 shadow-sm border">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center">
        Start Your Voice Analysis
      </h1>
      <p className="text-center text-gray-500 text-sm mt-2">
        Choose an option below to analyze your speaking patterns.
      </p>

      {/* Options */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Record */}
        <div
          onClick={() => {
            setSelectedOption("record");
            setAudioFile(null);
          }}
          className={`border rounded-xl p-6 text-center cursor-pointer transition ${
            selectedOption === "record"
              ? "border-blue-500 ring-2 ring-blue-100"
              : ""
          }`}
        >
          <div className="p-2 bg-blue-500 mx-auto mb-4 w-fit rounded-md">
            <SiKdenlive className="text-2xl text-white" />
          </div>
          <h3 className="font-semibold">Record Live Voice</h3>
          <p className="text-sm text-gray-500 mt-2">
            Capture your speech directly through your microphone.
          </p>
          <button
            type="button"
            className="mt-12 px-4 py-2 border-2 rounded-lg text-sm cursor-pointer"
          >
            Record Live
          </button>
        </div>

        {/* Upload */}
        <div
          onClick={() => setSelectedOption("upload")}
          className={`border rounded-xl p-6 text-center cursor-pointer transition ${
            selectedOption === "upload"
              ? "border-blue-500 ring-2 ring-blue-100"
              : ""
          }`}
        >
          <div className="p-2 bg-blue-500 mx-auto mb-4 w-fit rounded-md">
            <ImUpload className="text-2xl text-white" />
          </div>
          <h3 className="font-semibold">Upload Audio File</h3>
          <p className="text-sm text-gray-500 mt-2">
            Select an audio file (MP3, WAV) from your device.
          </p>

          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
            className="mt-12 block mx-auto cursor-pointer text-sm"
          />

          {audioFile && (
            <p className="text-xs text-gray-500 mt-2">
              Selected: {audioFile.name}
            </p>
          )}
        </div>
      </div>

      {/* Analyze Button */}
      <button
        disabled={isAnalyzeDisabled}
        className={`w-full mt-8 py-3 rounded-xl font-medium transition ${
          isAnalyzeDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
        }`}
        onClick={() => handleClick()}
      >
        Continue
      </button>

      <p
        className="text-center text-sm text-blue-500 mt-4 cursor-pointer"
        onClick={() => navigate("/help/analysis-metrics")}
      >
        Learn more about Vocalify's analysis metrics
      </p>
    </div>
  );
};

export default AnalyzeVoice;
