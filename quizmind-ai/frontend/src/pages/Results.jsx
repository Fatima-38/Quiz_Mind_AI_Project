import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, topic, difficulty } = location.state || {};

  const percentage = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage >= 80) return { text: "Excellent! 🎉", color: "#22c55e" };
    if (percentage >= 60) return { text: "Good Job! 👍", color: "#f59e0b" };
    return { text: "Keep Practicing! 💪", color: "#ef4444" };
  };

  const message = getMessage();

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white", padding: "40px 20px" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
        
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>🏆</h1>
        <h2 style={{ fontSize: "2rem", color: "#6366f1", marginBottom: "20px" }}>Quiz Complete!</h2>

        <div style={{ background: "#1e293b", borderRadius: "20px", padding: "40px", marginBottom: "30px" }}>
          <p style={{ color: "#94a3b8", marginBottom: "10px" }}>Topic: <strong style={{ color: "white" }}>{topic}</strong></p>
          <p style={{ color: "#94a3b8", marginBottom: "30px" }}>Difficulty: <strong style={{ color: "white" }}>{difficulty}</strong></p>

          <div style={{ fontSize: "5rem", fontWeight: "bold", color: message.color, marginBottom: "10px" }}>
            {percentage}%
          </div>

          <p style={{ fontSize: "1.5rem", color: message.color, marginBottom: "20px" }}>{message.text}</p>

          <p style={{ color: "#94a3b8", fontSize: "1.2rem" }}>
            You got <strong style={{ color: "#22c55e" }}>{score}</strong> out of <strong style={{ color: "white" }}>{total}</strong> correct!
          </p>
        </div>

        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <button onClick={() => navigate("/")}
            style={{
              padding: "12px 30px", borderRadius: "10px", border: "2px solid #6366f1",
              background: "transparent", color: "white", cursor: "pointer", fontSize: "1rem"
            }}>
            🏠 Home
          </button>

          <button onClick={() => navigate("/quiz", { state: { topic, difficulty, numQuestions: total } })}
            style={{
              padding: "12px 30px", borderRadius: "10px", border: "none",
              background: "#6366f1", color: "white", cursor: "pointer", fontSize: "1rem"
            }}>
            🔄 Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;