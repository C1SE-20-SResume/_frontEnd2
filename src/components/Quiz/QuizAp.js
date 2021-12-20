import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import OverQuizAp from "./OverQuizAp";

function QuizAp() {
  const [cookies] = useCookies(["user"]);

  const [quiz, setQuiz] = useState([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState([]);

  const [person, setPerson] = useState({});

  const [mess, setMess] = useState("");

  const [countdown, setCountdown] = useState(5);

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  const pickAnswers = (e, type_id) => {
    let userAnswer = e.target.outerText;
    setScore((prev) => [
      ...prev,
      {
        type_id: type_id,
        score: quiz[number].answer === userAnswer ? 1 : 0,
      },
    ]);

    setNumber(number + 1);
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/candidate/quiz/test?api_token=${cookies.user}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setPerson({...res.personality});
          let listQuiz = {...res.aptitude};
          let count = 0;
          for (let key in listQuiz) {
            if (listQuiz[key] !== null) {
              setQuiz((prev) => {
                return [
                  ...prev,
                  ...listQuiz[key].map((item) => ({
                    question: item.ques_content,
                    options:
                      (item.option !== null &&
                        shuffle([
                          ...item.option.map((option) => option.option_content),
                        ])) ||
                      [],
                    answer:
                      item.option &&
                      item.option.find((option) => option.correct)
                        .option_content,
                    type_id: item.type_id,
                  })),
                ];
              });
            }
            count++;
            if (count === 14) break;
          }
        } else {
          setMess(res.message);
          //  redirect to home page in 3s
          const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
          }, 1000);
          setTimeout(() => {
            clearInterval(interval);
            window.location.href = "/";
          }, 5000);
        }
      })
      .catch((err) => console.error(err));
  }, [cookies.user]);

  return (
    <div className="menu-func-recruiter max-w-[calc(800px+1.75rem)] my-0 mx-auto py-8">
      {quiz.length === 15 &&
        quiz.map((ques, index) => {
          return (
            quiz[number] &&
            ques.type_id === quiz[number]["type_id"] && (
              <div key={index}>
                <div className="mx-auto font-semibold">{ques.question}</div>
                <div className="flex flex-col my-8 mx-auto min-h-[400px] justify-center">
                  {ques.options.map((item, index) => (
                    <button
                      key={index}
                      className="block border border-[#e7e2e2] rounded-2xl px-8 py-4 text-base outline-none select-none mt-4 cursor-pointer hover:bg-green-400 transition duration-300"
                      onClick={(e) => {
                        // hidden element parent when click
                        e.target.parentElement.parentElement.style.display =
                          "none";
                        pickAnswers(e, ques.type_id);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )
          );
        })}
      {number === 15 && (
        <OverQuizAp score={[...score]} number={15} person={person} />
      )}
      {mess && (
        <div className="text-center">
          <div>{mess}</div>
          <div>Will redirect to home page in {countdown}... seconds</div>
        </div>
      )}
    </div>
  );
}

export default QuizAp;
