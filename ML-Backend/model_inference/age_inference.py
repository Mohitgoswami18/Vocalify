import torch
import librosa
import numpy as np
from transformers import Wav2Vec2Processor, Wav2Vec2Model
from model_def.age_model_def import Age_classifier

DEVICE = torch.device("cpu")

# 1️⃣ Load Wav2Vec2
processor = Wav2Vec2Processor.from_pretrained(
    "facebook/wav2vec2-base-960h"
)
wav2vec_model = Wav2Vec2Model.from_pretrained(
    "facebook/wav2vec2-base-960h"
).to(DEVICE)
wav2vec_model.eval()

# Freeze wav2vec
for param in wav2vec_model.parameters():
    param.requires_grad = False

# 2️⃣ Load Emotion Classifier
model = Age_classifier()
model.load_state_dict(
    torch.load("models/age.model.pth", map_location=DEVICE)
)
model.to(DEVICE)
model.eval()

AGE_LABELS = [
    "child", "teen", "young adult", "middle_age", "senior"
]

# 3️⃣ Audio → Embeddings
def extract_wav2vec_embedding(audio_path):
    waveform, sr = librosa.load(audio_path, sr=16000)

    # truncate to 30s
    max_len = 16000 * 30
    if waveform.shape[0] > max_len:
        waveform = waveform[:max_len]

    inputs = processor(
        waveform,
        sampling_rate=16000,
        return_tensors="pt",
        padding=True
    )

    with torch.no_grad():
        outputs = wav2vec_model(inputs.input_values.to(DEVICE))
        hidden_states = outputs.last_hidden_state  # [1, T, 768]

    return hidden_states # [1, 768]

# 4️⃣ Prediction
def predict_age(audio_path):
    embedding = extract_wav2vec_embedding(audio_path)

    with torch.no_grad():
        logits = model(embedding)
        probs = torch.softmax(logits, dim=1)
        score, idx = torch.max(probs, dim=1)

    return {
        "label": AGE_LABELS[idx.item()],
    }
