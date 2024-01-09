import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [allQuizs, setAllQuizs] = useState([]); // Keep track of all questions from quiz.json
  const [quizs, setQuizs] = useState([]); // Keep track of selected 15 random questions
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [used5050Lifeline, setUsed5050Lifeline] = useState(false);
  const [usedExpertAdvice, setUsedExpertAdvice] = useState(false);
  const [usedRandomAnswer, setUsedRandomAnswer] = useState(false);



  // const use5050Lifeline = () => {
  //   if (!used5050Lifeline) {
  //     const correctOption = question.answer;
  //     const incorrectOptions = question.options.filter((opt) => opt !== correctOption);
  //     const optionsToHide = shuffleArray(incorrectOptions).slice(0, 2);

  //     const updatedOptions = question.options.map((opt) =>
  //       optionsToHide.includes(opt) ? '' : opt
  //     );

  //     setQuestion({ ...question, options: updatedOptions });
  //     setUsed5050Lifeline(true);
  //   }
  // };
  const use5050Lifeline = () => {
    if (!used5050Lifeline) {
      const correctOption = question.answer;
      const incorrectOptions = question.options.filter((opt) => opt !== correctOption);
      const optionsToHide = shuffleArray(incorrectOptions).slice(0, 2);
  
      const updatedOptions = question.options.map((opt) =>
        optionsToHide.includes(opt) ? '--' : opt
      );
  
      setQuestion({ ...question, options: updatedOptions });
      setUsed5050Lifeline(true);
    }
  };

  const useExpertAdvice = () => {
    if (!usedExpertAdvice) {
      setSelectedAnswer(question.answer);
      setUsedExpertAdvice(true);
      setCorrectAnswer(question.answer);
      setMarks(marks + 1);
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const useRandomAnswer = () => {
    if (!usedRandomAnswer) {
      const randomOption = question.options[Math.floor(Math.random() * question.options.length)];

      setSelectedAnswer(randomOption);
      setUsedRandomAnswer(true);

      if (randomOption === question.answer) {
        setCorrectAnswer(randomOption);
        setMarks(marks + 1);
      } else {
        // If the random answer is incorrect, you can handle it here
        setShowQuiz(false);
        setShowResult(true);
      }
    }
  };

  
  useEffect(() => {
    fetch('quiz.json')
      .then(res => res.json())
      .then(data => {
        setAllQuizs(data);
        setQuizs(data); // Initialize quizs state with all questions
      });
  }, []);

  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuestion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex]);

  useEffect(() => {
    // Select 15 random questions
    const shuffledQuestions = [...allQuizs].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, 15);
    setQuizs(selectedQuestions);
  }, [allQuizs]);

  // Start Quiz
  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  }

  // Check Answer
  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add('bg-success');

        // Check if the question is within the selected 15 questions before updating the score
        if (questionIndex < 15) {
          setMarks(marks + 1);
        }
      } else {
        event.target.classList.add('bg-danger');
        showTheResult();
      }
    }
  };

  // Next Quesion
  const nextQuestion = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
    setQuestionIndex(questionIndex + 1);
  }

  // Show Result
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  }

  // Start Over
  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer('');
    setSelectedAnswer('');
     
      // Select 15 new random questions => if the ans is incorrect
      const shuffledQuestions = [...allQuizs].sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffledQuestions.slice(0, 15);
      setQuizs(selectedQuestions);
      setUsed5050Lifeline(false);
      setUsedExpertAdvice(false);
      setUsedRandomAnswer(false);

    setQuestionIndex(0);
    setMarks(0); // Reset marks to 0 when starting over
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
  };

  
    return (
      <DataContext.Provider
      value={{
        // ... (other state variables)
        startQuiz,
        showStart,
        showQuiz,
        question,
        quizs,
        checkAnswer,
        correctAnswer,
        selectedAnswer,
        questionIndex,
        nextQuestion,
        showTheResult,
        showResult,
        marks,
        startOver,
        use5050Lifeline,
        used5050Lifeline,
        useExpertAdvice,
        usedExpertAdvice,
        useRandomAnswer,
        usedRandomAnswer,
      }}
    >
      {children}
    </DataContext.Provider>
    );
}

export default DataContext;

