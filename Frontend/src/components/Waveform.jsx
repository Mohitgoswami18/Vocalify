import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveformPlayer = ({ audioUrl }) => {
    console.log("Waveform audioUrl:", audioUrl);
  const containerRef = useRef(null);
  const waveSurferRef = useRef(null);

  useEffect(() => {
    if (!audioUrl) return;

    waveSurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#c7d2fe",
      progressColor: "#3b82f6",
      cursorColor: "#1d4ed8",
      height: 80,
      barWidth: 3,
      barRadius: 2,
      responsive: true,
    });

    waveSurferRef.current.load(audioUrl);

    return () => {
      waveSurferRef.current.destroy();
    };
  }, [audioUrl]);

  return (
    <div className="space-y-3">
      <div ref={containerRef} />
      <button
        onClick={() => waveSurferRef.current.playPause()}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm cursor-pointer"
      >
        Play / Pause
      </button>
    </div>
  );
};

export default WaveformPlayer;
