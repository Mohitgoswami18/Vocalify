from fastapi import FastAPI, UploadFile, File
import shutil
import os

from model_inference.emotion_inference import predict_emotion
from model_inference.age_inference import predict_age
from model_inference.gender_inference import predict_gender 
from model_inference.accent_inference import predict_accent 
from other_matrics import analyze_speech_detailed

app = FastAPI()

UPLOAD_DIR = "temp"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def root():
    return {"status": "ML API running"}

@app.post("/analyze/speech")
async def analyze_speech(userAudio: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, userAudio.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(userAudio.file, buffer)
    emotion_result = predict_emotion(file_path)
    gender_result = predict_gender(file_path)
    age_result = predict_age(file_path)
    accent_result = predict_accent(file_path)
    other_speech_features = analyze_speech_detailed(file_path)


    os.remove(file_path)
    print(emotion_result)
    print(age_result)
    print(gender_result)
    print(accent_result)

    return {
        "status": "success",
        "emotion": emotion_result,
        "age": age_result,
        "gender": gender_result,
        "accent": accent_result,
        "other_features": other_speech_features
    }
