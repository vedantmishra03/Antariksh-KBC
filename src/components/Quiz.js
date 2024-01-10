import React, { useContext } from "react";
import DataContext from "../context/dataContext";
// import bgImage from '../kbcboilerplate.jpg';
import styled from 'styled-components';

const StyledButton = styled.button`
  transition: transform 0.1s ease, background-color 0.1s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #0056b3;
  }
`;

const Quiz = () => {
  const {
    showQuiz,
    question,
    quizs,
    checkAnswer,
    correctAnswer,
    selectedAnswer,
    questionIndex,
    nextQuestion,
    showTheResult,
    use5050Lifeline,
    used5050Lifeline,
    useExpertAdvice,
    usedExpertAdvice,
    useRandomAnswer,
    usedRandomAnswer,
  } = useContext(DataContext);

  const optionsPerRow = Math.ceil(question?.options?.length / 2);

  const renderOptions = () => (
    question?.options?.map((item, index) => (
      <div key={index} className={`col-md-${12 / optionsPerRow}`}>
        <StyledButton
          className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded-pill btn-dark ${correctAnswer === item && "bg-success"}`}
          onClick={(event) => checkAnswer(event, item)}
        >
          {item}
        </StyledButton>
      </div>
    ))
  );

  return (
    <section
      className="bg-dark text-white"
      // style={{
      //   display: showQuiz ? "block" : "none",
      //   backgroundImage: `url(${bgImage})`,
      //   backgroundSize: 'cover',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundPosition: 'center',
      // }}
    >
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-9 rounded">
            <div
              className="card p-4 shadow-lg border-0 p-3 rounded-3"
              style={{ background: "rgba(255, 179, 102 , 0.4)", borderColor: "#646464", width: "auto", backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
              <div className="d-flex justify-content-between gap-lg-3" style={{ borderColor: '#646464' }}>
                <h4 className="mb-3 fs-normal lh-base">{question?.question}</h4>
                <h4 style={{ color: "#60d600", width: "150px", textAlign: "right" }}>
                  {quizs.indexOf(question) + 1} / {quizs?.length}
                </h4>
              </div>

              <div className="d-flex justify-content-between mt-3">
                <StyledButton
                  className="btn py-2 w-32 bg-info text-white fw-bold rounded-pill"
                  style={{ backgroundColor: '#17A2B8' }}
                  onClick={use5050Lifeline}
                  disabled={used5050Lifeline}
                >
                  50:50 Lifeline
                </StyledButton>
                <StyledButton
                  className="btn py-2 w-32 bg-warning text-dark fw-bold rounded-pill"
                  onClick={useExpertAdvice}
                  disabled={usedExpertAdvice}
                >
                  Expert Advice
                </StyledButton>
                <StyledButton
                  className="btn py-2 w-32 bg-primary text-white fw-bold rounded-pill"
                  onClick={useRandomAnswer}
                  disabled={usedRandomAnswer}
                >
                  Random Select
                </StyledButton>
              </div>

              <div>
                <div className="row">{renderOptions()}</div>
              </div>

              {questionIndex + 1 !== quizs.length ? (
                <StyledButton
                  className={`btn py-2 w-100 mt-3 bg-primary rounded-pill text-light fw-bold ${correctAnswer && "bg-success"}`}
                  onClick={nextQuestion}
                  disabled={!selectedAnswer}
                >
                  Next Question
                </StyledButton>
              ) : (
                <StyledButton
                  className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold rounded-pill"
                  onClick={showTheResult}
                  disabled={!selectedAnswer}
                >
                  Show Result
                </StyledButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
