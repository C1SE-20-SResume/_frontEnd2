import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";

import Summary from "./Summary";

function QuizPer({person, aptitudeScore}) {
  const [cookies] = useCookies(["user"]);

  const [quiz, setQuiz] = useState([]);
  const [sumType, setSumType] = useState([]);

  const [result, setResult] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    for (let key in person) {
      setQuiz((prev) => {
        return [
          ...prev,
          ...person[key].map((item) => ({
            question: item.ques_content,
            ques_id: item.ques_id,
            type_id: item.type_id,
          })),
        ];
      });
    }
  }, [person]);
  useEffect(() => {
    setSumType(
      quiz.reduce((rv, x) => {
        (rv[x.type_id] = rv[x.type_id] || []).push(x);
        return rv;
      }, {})
    );
  }, [quiz]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = [];

    for (let key in sumType) {
      score.push({
        type_id: key,
        score: sumType[key].reduce((rv, x) => {
          return rv + x.score;
        }, 0),
      });
    }

    fetch(
      `${process.env.REACT_APP_API_URL}/candidate/quiz/result?api_token=${cookies.user}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ques_result: [...score, ...aptitudeScore],
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage(data.message);
          setResult(data);
          console.log(data);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {message === "" ? (
        <form className="menu-func-recruiter" onSubmit={handleSubmit}>
          <h3 className="text-center font-semibold text-2xl ">
            What Kind Of People Are You ?
          </h3>
          <div className="mx-auto">
            To take the Big Five personality assessment, rate each statement
            according to how well it describes you. Base your ratings on how you
            really are, not how you would like to be.
          </div>
          <div className="mb-4">
            <table className="mb-2 w-full table-auto mt-4 rounded-lg">
              <thead className="text-base bg-green-400 text-white px-7 py-4  uppercase ">
                <tr>
                  <th className="text-center">Question</th>
                  <th className="text-center">INACCURATE</th>
                  <th className="text-center"></th>
                  <th className="text-center">NEUTRAL</th>
                  <th className="text-center"></th>
                  <th className="text-center">ACCURATE</th>
                </tr>
              </thead>
              <tbody>
                {quiz.map((item, index) => (
                  <tr key={index}>
                    <td className="text-left">{item.question}</td>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <td key={i} className="text-center">
                        <input
                          type="radio"
                          value={i}
                          name={`ques_id_${item.ques_id}`}
                          attr-type={item.type_id}
                          onChange={(e) => {
                            item.score = parseInt(e.target.value);
                          }}
                          {...(i === 1 && {required: true})}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="block border  bg-green-400 text-white rounded-2xl px-8 py-2 text-base outline-none select-none mt-4 cursor-pointer hover:bg-[#fff] hover:text-black mx-auto transition duration-300">
            Submit
          </button>
        </form>
      ) : (
        <Summary message={message} result={result} />
      )}
    </>
  );
}

export default QuizPer;
