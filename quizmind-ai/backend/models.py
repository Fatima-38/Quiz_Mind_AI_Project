from pydantic import BaseModel
from typing import List, Optional

class QuizRequest(BaseModel):
    topic: str
    difficulty: str
    num_questions: int = 5

class Option(BaseModel):
    label: str
    text: str

class Question(BaseModel):
    question: str
    options: List[Option]
    correct_answer: str
    explanation: str

class QuizResponse(BaseModel):
    topic: str
    difficulty: str
    questions: List[Question]

class ScoreRequest(BaseModel):
    topic: str
    difficulty: str
    correct: int
    total: int

class ScoreResponse(BaseModel):
    id: int
    topic: str
    difficulty: str
    correct: int
    total: int
    created_at: str

class BookmarkRequest(BaseModel):
    question: str
    options: str
    correct_answer: str
    explanation: Optional[str] = ""
    topic: str

class BookmarkResponse(BaseModel):
    id: int
    question: str
    options: str
    correct_answer: str
    explanation: str
    topic: str
    created_at: str