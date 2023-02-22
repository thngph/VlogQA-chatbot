from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from youtube_transcript_api import YouTubeTranscriptApi


app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def qa(question="", context=""):
  return {"text": question, "answer_start": len(context)}

@app.get("/")
async def root():
    return {"data": "Hello World"}


@app.get('/get-transcript/{id}')
async def get_transcript(id):
  try:
    list_transcript = YouTubeTranscriptApi.list_transcripts(id)
    transcript = list_transcript.find_transcript(['vi']).fetch()
    text = ' '.join([item['text'] for item in transcript])
    text = ' '.join(text.split()[:4096])
    return {'transcript': text}
  except:
    return {'transcript': 'transcript not available'}
  

from pydantic import BaseModel


class Item(BaseModel):
    question: str = ""
    context: str = ""


@app.post('/bot-response')
async def bot_response(item: Item):
  results = {"text": "", "answer_start": 0}
  if item:
      results = qa(item.question, item.context)
  return results