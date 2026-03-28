import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_questions(topic: str, difficulty: str, num_questions: int):
    prompt = f"""Generate {num_questions} multiple choice questions about {topic} at {difficulty} difficulty level.

Return ONLY a valid JSON array with this exact format:
[
  {{
    "question": "Question text here?",
    "options": [
      {{"label": "A", "text": "Option A text"}},
      {{"label": "B", "text": "Option B text"}},
      {{"label": "C", "text": "Option C text"}},
      {{"label": "D", "text": "Option D text"}}
    ],
    "correct_answer": "A",
    "explanation": "Brief explanation why A is correct"
  }}
]

Topics can include: DSA, OOP, DBMS, OS, Computer Networks, Algorithms, Software Engineering.
Make sure questions are technically accurate and educational.
Return ONLY the JSON array, no extra text."""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a CS professor creating exam questions. Always return valid JSON only."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=2000
    )

    content = response.choices[0].message.content.strip()
    
    # Clean JSON if needed
    if content.startswith("```"):
        content = content.split("```")[1]
        if content.startswith("json"):
            content = content[4:]
    
    questions = json.loads(content)
    return questions