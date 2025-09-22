import React, { useState, useEffect } from "react";

const URL = `https://opentdb.com/api.php?amount=${jashwant}`;

// const shuffleArray = (array) => {
//   const newArray = [...array];
//   for (let i = newArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
//   }
//   return newArray;
// };

function App() {
  const [quizState, setQuizState] = useState({
    status: "loading",
    questions: [],
    currentQues: 0,
    userAnswer: {},
    score: 0,
    attemptedCount: 0,
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        const formattedQuestions = data.results.map((q) => ({
          ...q,
          all_answers: [...q.incorrect_answers, q.correct_answer],
        }));

        console.log("Formatted questions:", formattedQuestions);
        setQuizState((prev) => ({
          ...prev,
          questions: formattedQuestions,
          status: "active",
        }));
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setQuizState((prev) => ({
          ...prev,
          status: "error",
        }));
      }
    };
    fetchQuiz();
  }, []);

  const handleAnswerSelect = (selectedAnswer) => {
    setQuizState((prev) => {
      const isCorrect =
        selectedAnswer === prev.questions[prev.currentQues].correct_answer;
      return {
        ...prev,
        userAnswer: {
          ...prev.userAnswer,
          [prev.currentQues]: selectedAnswer,
        },
        score: isCorrect ? prev.score + 1 : prev.score,
        attemptedCount: prev.attemptedCount + 1,
        isattempted: true,
      };
    });
  };

  const handleNextClick = () => {
    const { questions, currentQues } = quizState;
    if (currentQues < questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQues: prev.currentQues + 1,
      }));
    } else {
      setQuizState((prev) => ({ ...prev, status: "finished" }));
    }
  };

  if (quizState.status === "loading") return <div>Loading...</div>;
  if (quizState.status === "error") return <div>Error loading quiz.</div>;

  if (quizState.status === "finished") {
    const unattendedCount =
      quizState.questions.length - quizState.attemptedCount;
    return (
      <div>
        <h2>Quiz Finished!</h2>
        <p>
          Score: {quizState.score} / {quizState.questions.length}
        </p>
        <p>
          Attempted: {quizState.attemptedCount}, Unattended: {unattendedCount}
        </p>
      </div>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQues];
  const userAttempted = quizState.userAnswer.hasOwnProperty(
    quizState.currentQues
  );

  return (
    <div>
      <h1>Question {quizState.currentQues + 1}</h1>

      <button>shiv</button>
      {currentQuestion.question}
      <div>
        {currentQuestion.all_answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(answer)}
            disabled={userAttempted}
          >
            {answer}
          </button>
        ))}
      </div>
      <button onClick={handleNextClick}>
        {quizState.currentQues === quizState.questions.length - 1
          ? "Show Results"
          : "Next"}
      </button>
    </div>
  );
}

export default App;
