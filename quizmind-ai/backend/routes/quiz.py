from fastapi import APIRouter, HTTPException
from models import QuizRequest, QuizResponse
from services.ai_service import generate_questions

router = APIRouter()

@router.post("/generate", response_model=QuizResponse)
async def generate_quiz(request: QuizRequest):
    try:
        questions = generate_questions(
            topic=request.topic,
            difficulty=request.difficulty,
            num_questions=request.num_questions
        )
        return QuizResponse(
            topic=request.topic,
            difficulty=request.difficulty,
            questions=questions
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))