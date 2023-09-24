from fastapi import APIRouter, HTTPException
from ..util.speech_models import AudioRqst, AudioInBase64
from fastapi.responses import StreamingResponse
from fastapi import File, UploadFile
from gtts import gTTS
import io
import os
import base64
import speech_recognition as sr
from pydub import AudioSegment
from pydub.playback import play


router = APIRouter()

@router.post('/text-to-speech')
async def text_to_speech(rqst: AudioRqst):
    tts = gTTS(rqst.text, lang='en-za')
    mp3_fp = io.BytesIO()
    tts.write_to_fp(mp3_fp)
    mp3_fp.seek(0)
    return StreamingResponse(mp3_fp, media_type="audio/mpeg")


# @router.post("/speech-to-text")
# async def speech_to_text(audio_base64: AudioInBase64):
#     try:
#         # decode base64 string to bytes

#         audio_data = base64.b64decode(audio_base64.audio)

#         # create a BytesIO object and load the audio data
#         audio_io = io.BytesIO(audio_data)

#         # load the audio file as a pydub.AudioSegment
#         audio = AudioSegment.from_file(audio_io, format="wav")

#         # play the audio file
#         play(audio)

        # audio_data = base64.b64decode(audio_base64.audio)
        # audio = AudioSegment.from_file(io.BytesIO(audio_data), format="wav")
        # audio.export("temp.wav", format="wav")
        
#         recognizer = sr.Recognizer()
#         with sr.AudioFile("temp.wav") as source:
#             audio_data = recognizer.record(source)
#             text = recognizer.recognize_google(audio_data, language="en-US")
#         return {"text": text}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))


# @router.post("/speech-to-text")
# async def speech_to_text(file: UploadFile = File(...)):
#     print(f"MIME type of the file: {file.content_type}")
#     audio_data = await file.read()
#     # wav_data = io.BytesIO(audio_data)
#     # recognizer = sr.Recognizer()
#     # text = ""
#     # with sr.AudioFile(wav_data) as source:
#     #     audio_data = recognizer.record(source)
#     #     text = recognizer.recognize_google(
#     #         audio_data,
#     #         language="en-US",
#     #     )
    
#     # Recognize the converted WAV audio (you can add your speech recognition logic here)
#     text = "This is where your speech recognition logic goes."
#     # play(output_file_path)
    
#     # Clean up the temporary audio file
#     # os.remove(input_file_path)
#     return {"text": "text"}


@router.post("/speech-to-text")
async def speech_to_text(file: UploadFile = File(...)):
    recognizer = sr.Recognizer()
    print("DFds")
    with sr.AudioFile(io.BytesIO(file)) as source:
        audio_data = recognizer.record(source)
    try:
        text = recognizer.recognize_google(audio_data)
        return {"text": text}
    except sr.UnknownValueError:
        return "Google Speech Recognition could not understand the audio."
    except sr.RequestError as e:
        return f"Could not request results from Google Speech Recognition service; {e}"
