from fastapi import FastAPI, UploadFile, File
import shutil
import os

from emotion_inference import predict_emotion

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

    os.remove(file_path)

    return {
        "status": "success",
        "emotion": emotion_result,
        "age": None,
        "gender": None,
        "accent": None
    }
