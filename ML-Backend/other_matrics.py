import whisper
import numpy as np
import re

# Load Whisper model ONCE
model = whisper.load_model("base")

FILLER_WORDS = ["uh", "um", "like", "you know", "ah", "er"]

def analyze_speech_detailed(audio_path):
    # 1. Transcription
    result = model.transcribe(audio_path)

    text = result["text"]
    segments = result["segments"]

    if len(segments) == 0:
        return {"error": "No speech detected"}

    # 2. Duration
    duration = segments[-1]["end"]

    # 3. Word count
    words = re.findall(r"\b\w+\b", text.lower())
    num_words = len(words)

    if duration > 0:
        wpm = (num_words / duration) * 60
    else:
        wpm = 0

    # 4. Pause detection
    pauses = []

    for i in range(len(segments) - 1):
        current_end = segments[i]["end"]
        next_start = segments[i + 1]["start"]

        gap = next_start - current_end

        if gap > 0.5:
            pauses.append(gap)

    pause_count = len(pauses)

    if pause_count > 0:
        total_pause = 0
        for p in pauses:
            total_pause += p
        avg_pause = total_pause / pause_count
    else:
        avg_pause = 0

    if duration > 0:
        pause_density = pause_count / duration
    else:
        pause_density = 0

    # 5. Filler words
    filler_count = 0
    lower_text = text.lower()

    for filler in FILLER_WORDS:
        filler_count += lower_text.count(filler)

    # 6. Lexical diversity
    unique_words = set()

    for w in words:
        unique_words.add(w)

    if num_words > 0:
        lexical_diversity = len(unique_words) / num_words
    else:
        lexical_diversity = 0

    # 7. Average segment length
    total_segment_length = 0

    for seg in segments:
        total_segment_length += (seg["end"] - seg["start"])

    avg_segment_length = total_segment_length / len(segments)

    # 8. Continuity score
    short_pause_count = 0

    for p in pauses:
        if p < 1.0:
            short_pause_count += 1

    continuity_score = (short_pause_count / len(segments)) * 100

    # 9. Speech rate score
    if wpm >= 110 and wpm <= 160:
        speech_rate_score = 90
    elif (wpm >= 90 and wpm < 110) or (wpm > 160 and wpm <= 180):
        speech_rate_score = 70
    else:
        speech_rate_score = 40

    # 10. Hesitation score
    hesitation_score = (filler_count * 6) + (pause_count * 4)

    if hesitation_score > 100:
        hesitation_score = 100

    # 11. Clarity score
    clarity_score = (
        (0.4 * lexical_diversity) +
        (0.3 * (1 - pause_density)) +
        (0.3 * (avg_segment_length / 3))
    ) * 100

    if clarity_score > 100:
        clarity_score = 100

    # 12. Fluency score
    fluency_score = (
        (speech_rate_score * 0.4) +
        (continuity_score * 0.4) +
        ((100 - hesitation_score) * 0.2)
    )

    if fluency_score > 100:
        fluency_score = 100

    # 13. Confidence score
    confidence_score = (
        (fluency_score * 0.5) +
        ((100 - hesitation_score) * 0.5)
    )

    if confidence_score > 100:
        confidence_score = 100
    # 14. Final output
    return {
        "transcript": text.strip(),

        "duration_sec": round(duration, 2),
        "total_words": num_words,
        "wpm": round(wpm, 2),

        "pauses": {
            "count": pause_count,
            "average_duration": round(avg_pause, 2),
            "density": round(pause_density, 4)
        },

        "fillers": {
            "count": filler_count
        },

        "linguistics": {
            "lexical_diversity": round(lexical_diversity, 3),
            "average_segment_length": round(avg_segment_length, 2)
        },

        "scores": {
            "clarity": round(clarity_score, 2),
            "fluency": round(fluency_score, 2),
            "confidence": round(confidence_score, 2)
        },

        "overallScore": {
            "value": round((clarity_score + fluency_score + confidence_score) / 3, 2)
        }
    }
