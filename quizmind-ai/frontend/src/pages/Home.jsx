import { useNavigate } from "react-router-dom";
import { useState } from "react";

const topics = [
  "DSA", "OOP", "DBMS", "Operating System",
  "Computer Networks", "Algorithms", "Software Engineering", "System Design"
];

const difficulties = ["Easy", "Medium", "Hard"];

function Home() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);

  const handleStart = () => {
    if (!selectedTopic || !selectedDifficulty) {
      alert("Please select a topic and difficulty!");
      return;
    }
    navigate("/quiz", {
      state: { topic: selectedTopic, difficulty: selectedDifficulty, numQuestions }
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white", padding: "40px 20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#6366f1" }}>🧠 QuizMind AI</h1>
        <p style={{ color: "#94a3b8", marginBottom: "40px" }}>Test your CS knowledge with AI-generated questions!</p>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Select Topic</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {topics.map(topic => (
              <button key={topic} onClick={() => setSelectedTopic(topic)}
                style={{
                  padding: "10px 20px", borderRadius: "20px", border: "2px solid",
                  borderColor: selectedTopic === topic ? "#6366f1" : "#334155",
                  background: selectedTopic === topic ? "#6366f1" : "transparent",
                  color: "white", cursor: "pointer"
                }}>
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Select Difficulty</h3>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            {difficulties.map(diff => (
              <button key={diff} onClick={() => setSelectedDifficulty(diff)}
                style={{
                  padding: "10px 25px", borderRadius: "20px", border: "2px solid",
                  borderColor: selectedDifficulty === diff ? "#6366f1" : "#334155",
                  background: selectedDifficulty === diff ? "#6366f1" : "transparent",
                  color: "white", cursor: "pointer"
                }}>
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Number of Questions</h3>
          <select value={numQuestions} onChange={e => setNumQuestions(Number(e.target.value))}
            style={{ padding: "10px 20px", borderRadius: "10px", background: "#1e293b", color: "white", border: "2px solid #334155" }}>
            {[3, 5, 10, 15].map(n => <option key={n} value={n}>{n} Questions</option>)}
          </select>
        </div>

        <button onClick={handleStart}
          style={{
            padding: "15px 50px", fontSize: "1.1rem", borderRadius: "25px",
            background: "#6366f1", color: "white", border: "none", cursor: "pointer"
          }}>
          Start Quiz 🚀
        </button>
      </div>
    </div>
  );
}

export default Home;