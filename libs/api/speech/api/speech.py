from fastapi import APIRouter
from ..util.speech_models import AudioRqst
from fastapi.responses import StreamingResponse
from gtts import gTTS
import io
import os


router = APIRouter()

@router.post('/text-to-speech')
async def text_to_speech(rqst: AudioRqst):
    tts = gTTS(rqst.text, lang='en-za')
    mp3_fp = io.BytesIO()
    tts.write_to_fp(mp3_fp)
    mp3_fp.seek(0)
    return StreamingResponse(mp3_fp, media_type="audio/mpeg")
