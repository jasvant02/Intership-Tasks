import { useEffect,useState } from 'react'
import axios from 'axios';






function App() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [score,setScore]=useState(0)
  const [result,setResult]=useState(false)
  const [currentque,setCurrentque]=useState(0)
  const [attempted,setAttempted]=useState(new Set())
  const [quizeid,setQuizeid]=useState(0)

const URL = 'https://opentdb.com/api.php?amount=10 ';

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(URL);
        const data = await response.json();
        const formattedQuestions = data.results.map((q) => ({
          ...q,
          
          all_answers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
          isAttempted:false

        }));
        
        setQuestions(formattedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [quizeid]);

console.log('questions', questions)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };



// //    const res = [
// //       {
// //         id: 1,
// //         questions: "this is question",
// //         correctAnswer: "correct",
// //         answers: ["ans1", "ans2","ans3"],
// //         attempted: false,
// //         isCorrect: false,
// //         userAnswer: "sdjkasjd"
// //       },
// //        {
// //         id: 2,
// //         questions: "this is question",
// //         correctAnswer: "correct",
// //         answers: ["ans1", "ans2","ans3"],
// //         attempted: true,
// //         isCorrect: true,
// //       },
// //        {
// //         id: 3,
// //         questions: "this is question",
// //         correctAnswer: "correct",
// //         answers: ["ans1", "ans2","ans3"],
// //         attempted: false,
// //         isCorrect: false,
// //         score: 5,
// //       }, {
// //         id: 4,
// //         questions: "this is question",
// //         correctAnswer: "correct",
// //         answers: ["ans1", "ans2","ans3"],
// //         attempted: false,
// //         isCorrect: false,
// //         score: 10
// //       }
// //     ]

// // let finalScore = 0;
// // res.filter((k) => k.isCorrect).map((k) => {
// //   finalScore += k.score
// // })

   const handleAnswer = () => {
    // const data = [...res];
    // data[answer.id] = {
    //   ...data[answer.id],
    //   userAnswer: answer
    // }
    
    // if (isAttempted.has(currentque)) {
    //   return;
      
    // }
    setAttempted(prev => new Set(prev).add(currentque));
    if (answer === questions[currentque].correct_answer) {
      setScore(score + 1);
      
    }
  };

  const nextQue = () => {
    const nextQue = currentque + 1;
    if (nextQue < questions.length) {
      setCurrentque(nextQue);
    } else {
      setResult(true);
    }
  };

  
  if (loading) {
    return <div>Loading questions...</div>;
  }

//   // const restartQuiz = () => {
//   //   setCurrentque(0);
//   //   setScore(0);
//   //   setResult(false);
//   //   setAttempted(new Set());
//   //   setQuestions([]);
//   //   setQuizeid(prevKey => prevKey + 1);
//   // };

// //   if (loading) {
// //     return <div>Loading questions...</div>;
// //   }
  if (result) {
    return (
      <div>
        <h2>Quiz Results</h2>
        <p>You scored {score} out of {questions.length}!</p>
         <p>You have attempted Question Number {attempted} out of {questions.length}!</p>
        {/* <button onClick={restartQuiz}>Restart Quiz</button> */}
      </div>
    );
  }

  const currentQues = questions[currentque];




//  axios.get('https://opentdb.com/api.php?amount=10 ')
//       .then(response => console.log('API Data:', response.data))
//       .catch(error => console.error('Error fetching data:', error));

  return (
    <>
     <h1>Quize App</h1>
     {/* <div>
      
      {JSON.stringify(data, null, 2)}
    </div> */}

    <div>
      <div>
        <h2>{currentQues.question}</h2>
        {/* <p>Question {currentQues + 1} of {questions.length}</p> */}
      </div>
      <div>
        {currentQues.all_answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswer(answer)} disabled={attempted.has(currentque)}>
            {answer}
          </button>
        ))}
      </div>
      <div>
        <button onClick={nextQue} >
          {currentque === questions.length - 1 ? 'Finish' : 'Next Question'}
        </button>
      </div>
     
    </div>


   
     
     
    

    

    </>
  )
}

export default App
