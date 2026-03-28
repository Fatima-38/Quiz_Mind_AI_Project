from fastapi import APIRouter, HTTPException
from models import ScoreRequest, ScoreResponse
from database import get_db
from typing import List

router = APIRouter()

@router.post("/save")
def save_score(request: ScoreRequest):
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO scores (topic, difficulty, correct, total)
            VALUES (?, ?, ?, ?)
        """, (request.topic, request.difficulty, request.correct, request.total))
        conn.commit()
        conn.close()
        return {"message": "Score saved successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/all", response_model=List[ScoreResponse])
def get_all_scores():
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM scores ORDER BY created_at DESC")
        scores = cursor.fetchall()
        conn.close()
        return [dict(score) for score in scores]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))