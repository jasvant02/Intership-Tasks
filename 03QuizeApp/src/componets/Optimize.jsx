import React, { useState, useEffect } from 'react';

const URL = 'https://opentdb.com/api.php?amount=10';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const Optimize = () => {
  const [quizState, setQuizState] = useState({
    status: 'loading',
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    score: 0,
    
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        const formattedQuestions = data.results.map(q => ({
          ...q,
          all_answers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
          attemptedCount: 0,
        }));
        setQuizState(prev => ({
          ...prev,
          questions: formattedQuestions,
          status: 'active',
        }));
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setQuizState(prev => ({
          ...prev,
          status: 'error',
        }));
      }
    };
    fetchQuiz();
  }, []);

  const handleAnswerSelect = (selectedAnswer) => {
    if (quizState.userAnswers.hasOwnProperty(quizState.currentQuestionIndex)) return;

    setQuizState(prev => {
      const isCorrect = selectedAnswer === prev.questions[prev.currentQuestionIndex].correct_answer;
      return {
        ...prev,
        userAnswers: {
          ...prev.userAnswers,
          [prev.currentQuestionIndex]: selectedAnswer,
        },
        score: isCorrect ? prev.score + 1 : prev.score,
        attemptedCount: prev.attemptedCount + 1,
      };
    });
  };

  const handleNextClick = () => {
    const { questions, currentQuestionIndex } = quizState;
    if (currentQuestionIndex < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    } else {
      setQuizState(prev => ({ ...prev, status: 'finished' }));
    }
  };

  if (quizState.status === 'loading') return <div>Loading...</div>;
  if (quizState.status === 'error') return <div>Error loading quiz.</div>;

  if (quizState.status === 'finished') {
    const unattendedCount = quizState.questions.length - quizState.attemptedCount;
    return (
      <div>
        <h2>Quiz Finished!</h2>
        <p>Score: {quizState.score} / {quizState.questions.length}</p>
        <p>Attempted: {quizState.attemptedCount}, Unattended: {unattendedCount}</p>
      </div>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const userAttempted = quizState.userAnswers.hasOwnProperty(quizState.currentQuestionIndex);

  return (
    <div>
      <h1>Question {quizState.currentQuestionIndex + 1}</h1>
      <p>{currentQuestion.question}</p>
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
      <button onClick={handleNextClick} disabled={!userAttempted}>
        {quizState.currentQuestionIndex === quizState.questions.length - 1 ? 'Show Results' : 'Next'}
      </button>
    </div>
  );
};
