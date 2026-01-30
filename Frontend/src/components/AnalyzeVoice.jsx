const AnalyzeVoice = () => {
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
        <div className="border rounded-xl p-6 text-center">
          <div className="text-3xl mb-3">▶️</div>
          <h3 className="font-semibold">Record Live Voice</h3>
          <p className="text-sm text-gray-500 mt-2">
            Capture your speech directly through your microphone.
          </p>
          <button className="mt-12 px-4 py-2 border rounded-lg text-sm">
            Start Recording
          </button>
        </div>

        {/* Upload */}
        <div className="border rounded-xl p-6 text-center">
          <div className="text-3xl mb-3">☁️</div>
          <h3 className="font-semibold">Upload Audio File</h3>
          <p className="text-sm text-gray-500 mt-2">
            Select an audio file (MP3, WAV) from your device.
          </p>
          <button className="mt-12 px-4 py-2 border rounded-lg text-sm">
            Browse Files
          </button>
        </div>
      </div>

      {/* Analyze Button */}
      <button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium">
        Analyze Voice
      </button>

      <p className="text-center text-sm text-blue-500 mt-4 cursor-pointer">
        Learn more about Vocalify's analysis metrics
      </p>
    </div>
  );
};

export default AnalyzeVoice;
