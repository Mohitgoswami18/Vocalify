import whisper

model = whisper.load_model("base")  # start with base
result = model.transcribe("s.mp3")

print(result["text"])
