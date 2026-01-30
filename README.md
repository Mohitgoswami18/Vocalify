# 🎙️ Speech Analysis System

An end-to-end **AI-powered speech analysis system** that evaluates how a person speaks — not *what* they say. The system provides clear, actionable feedback on speech quality using a combination of **deep learning models**, **automatic speech recognition (ASR)**, and **audio signal processing**.

This project is designed as a **real-world, product-style pipeline**, focusing on explainable metrics, clean UX, and scalability for future features.

---

## 🚀 Features

* 🎭 **Emotion Classification** – Detects speaking emotion (e.g., calm, nervous, confident)
* 🧑 **Gender Classification** – Predicts speaker gender (used as contextual information)
* 🎂 **Age Group Estimation** – Predicts speaker age range (not exact age)
* 🌍 **Accent Classification** – Identifies speaker accent and accent strength
* 📝 **Automatic Transcription (ASR)** – Converts speech to text using Whisper
* 📊 **Speech Quality Metrics**:

  * Confidence Score
  * Clarity Score
  * Fluency Score
  * Accent Strength Score
* 📈 **Progress Tracking** – Shows percentage improvement from previous sessions

---

## 🧠 System Architecture (High Level)

```
Audio Input
 ├── Emotion Model (DL)
 ├── Age Model (DL)
 ├── Gender Model (DL)
 ├── Accent Model (DL)
 └── ASR (Whisper)
       ├── Transcript
       ├── Words Per Minute (WPM)
       ├── Pause Detection
       ├── Filler Word Detection
       └── Speech Continuity

All outputs → Metric Aggregation → Dashboard Scores
```

---

## 🧾 Automatic Speech Recognition (ASR)

The system uses **OpenAI Whisper**, a transformer-based ASR model, to generate transcripts from audio.

The transcript enables:

* Words Per Minute (WPM)
* Fluency analysis
* Pause detection using timestamps
* Vocabulary and filler word analysis

Whisper is used as a **pretrained model** and is not fine-tuned in this project.

---

## 📊 Speech Metrics Explained

### 🔹 1. Confidence Score (0–100)

Represents how confident the speaker sounds.

Computed using:

* Emotion model output (confidence-related emotions)
* Loudness / energy of speech
* Pause frequency

**Interpretation:**

* High score → stable, energetic, confident speech
* Low score → hesitant or nervous delivery

---

### 🔹 2. Clarity Score (0–100)

Represents how easy the speech is to understand.

This version **does not use a pronunciation model**. Instead, it relies on explainable acoustic and linguistic signals.

Computed using:

* Signal-to-Noise Ratio (background noise)
* Speech vs silence ratio
* Spectral articulation sharpness
* Pause density (ASR difficulty proxy)

**Why no pronunciation model?**

* Keeps v1 lightweight and stable
* Avoids need for phoneme-level datasets
* Easy to upgrade in future versions

---

### 🔹 3. Fluency Score (0–100)

Measures how smoothly the speaker talks.

Computed using:

* Words Per Minute (WPM)
* Average pause duration
* Pause frequency

**Interpretation:**

* High score → smooth, natural speech flow
* Low score → frequent stops or uneven pacing

---

### 🔹 4. Accent Strength Score (0–100)

Measures how strong a speaker’s accent is relative to a neutral reference.

Computed using:

* Accent classification confidence

**Important:**

* This is **not a quality judgment**
* It is used to provide pronunciation-related feedback

---

## 📈 Progress Tracking

For each session, scores are compared with the **previous analysis period**.

### Percentage Change Formula:

```
% change = ((current_score - previous_score) / previous_score) × 100
```

This allows users to:

* Track improvement over time
* See trends instead of isolated scores

---

## 🗂️ Data Storage Strategy

Only **lightweight, user-relevant data** is stored:

* Overall score
* Sub-scores (confidence, clarity, fluency, accent)
* Timestamp
* Improvement percentage

The following are **not stored by default**:

* Raw audio
* Model embeddings
* Raw transcripts (optional, privacy-first)

---

## 🌐 Frontend Dashboard

The frontend presents results using:

* Metric cards (score + % change)
* Color-coded indicators
* Short improvement tips
* Trend graphs over time

The UI is designed to be:

* Simple
* Explainable
* Non-technical

---

## 🛠️ Tech Stack

### Machine Learning

* PyTorch
* Hugging Face Transformers
* OpenAI Whisper (ASR)
* Librosa (audio signal processing)

### Backend

* Python
* FastAPI (for Model interaction)
* Node.js, Express.js (for main backend tasks)

### Frontend

* React
* Tailwind CSS
* shadcn UI

### Development

* Google Colab (training & experiments)
* vs code (for frontend and backend integration and development)

---

## 🧭 Future Improvements (Roadmap)

* 🔁 Multitask model with shared audio encoder
* 🗣️ Pronunciation scoring using phoneme alignment
* 🎶 Singing analysis module
* 🎧 Song matching & similarity scoring
* 👤 User profiles with long-term analytics

---

## 🎯 Project Goal

This project focuses on **building a practical, end-to-end speech analysis product**, not just individual ML models. Emphasis is placed on:

* Explainability
* Clean data flow
* User-focused feedback
* Real-world engineering decisions

---

## 📌 Disclaimer

This system is intended for **educational and self-improvement purposes only**. Predictions related to age, gender, or accent are probabilistic and should not be used for sensitive or decision-critical applications.

---

## 🙌 Author

Built with ❤️ as a full-stack + ML project to demonstrate practical AI system design.
