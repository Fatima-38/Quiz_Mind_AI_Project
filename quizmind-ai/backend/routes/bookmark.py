from fastapi import APIRouter, HTTPException
from models import BookmarkRequest, BookmarkResponse
from database import get_db
from typing import List

router = APIRouter()

@router.post("/save")
def save_bookmark(request: BookmarkRequest):
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO bookmarks (question, options, correct_answer, explanation, topic)
            VALUES (?, ?, ?, ?, ?)
        """, (request.question, request.options, request.correct_answer, request.explanation, request.topic))
        conn.commit()
        conn.close()
        return {"message": "Bookmark saved successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/all", response_model=List[BookmarkResponse])
def get_all_bookmarks():
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM bookmarks ORDER BY created_at DESC")
        bookmarks = cursor.fetchall()
        conn.close()
        return [dict(bookmark) for bookmark in bookmarks]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/delete/{bookmark_id}")
def delete_bookmark(bookmark_id: int):
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM bookmarks WHERE id = ?", (bookmark_id,))
        conn.commit()
        conn.close()
        return {"message": "Bookmark deleted successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))