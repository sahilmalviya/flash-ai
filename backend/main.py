from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

from langchain_mistralai import ChatMistralAI
from langchain_core.messages import SystemMessage, HumanMessage

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://flash-ai-dun.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = ChatMistralAI(
    model="mistral-small-2506",
    temperature=0.9
)

class ChatRequest(BaseModel):
    message: str
    mode: str

def get_mode_prompt(mode: str):
    modes = {
        "normal": "You are a helpful assistant.",
        "angry": "You are an angry AI. Respond aggressively.",
        "funny": "You are a funny AI. Add jokes.",
        "sad": "You are a sad AI. Respond emotionally."
    }
    return modes.get(mode.lower(), modes["normal"])


@app.get("/")
async def root():
    return {"message": "API is running 🚀"}


@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        if not req.message or not req.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")

        system_prompt = get_mode_prompt(req.mode)

        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=req.message)
        ]

        response = model.invoke(messages)

        if not response or not response.content:
            raise HTTPException(
                status_code=500,
                detail="Empty response from AI"
            )

        return {
            "reply": response.content.strip()
        }

    except HTTPException:
        raise 

    except Exception as e:
        print("Error:", str(e))  
        raise HTTPException(
            status_code=500,
            detail="Something went wrong while generating response"
        )
