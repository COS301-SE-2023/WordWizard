from fastapi import APIRouter
from ..util.speech_models import AudioRqst
from fastapi.responses import StreamingResponse
from fastapi import FastAPI, File, UploadFile
from gtts import gTTS
import io
import speech_recognition as sr
import os


router = APIRouter()

@router.post('/text-to-speech')
async def text_to_speech(rqst: AudioRqst):
    tts = gTTS(rqst.text, lang='en-za')
    mp3_fp = io.BytesIO()
    tts.write_to_fp(mp3_fp)
    mp3_fp.seek(0)
    return StreamingResponse(mp3_fp, media_type="audio/mpeg")


@router.post("/speech-to-text")
async def speech_to_text(file: UploadFile = File(...)):
    audio_data = await file.read()
    # print(audio_format)
    wav_data = io.BytesIO(audio_data)
    recognizer = sr.Recognizer()
    text = ""
    with sr.AudioFile(wav_data) as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(
            audio_data,
            language="en-US",
        )
    return {"text": text}
