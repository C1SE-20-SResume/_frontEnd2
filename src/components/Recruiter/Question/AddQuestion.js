import React, {useState} from "react";
import {useCookies} from "react-cookie";

function AddQuestion({userInfo}) {
  const [cookies, setCookie] = useCookies(["user"]);
  const [user, setUser] = useState({...userInfo});

  const [question, setQuestion] = useState({
    option: "1",
  });

  const [personality] = useState({
    4: "openness",
    5: "conscientiousness",
    6: "extroversion",
    7: "agreeableness",
    8: "neuroticism",
  });

  const [aptitude] = useState({
    1: "math",
    2: "english",
    3: "programming",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setQuestion({[e.target.name]: e.target.value});
  };

  const handleChangeAptitude = (e) => {
    e.preventDefault();
    setQuestion((prev) => ({
      ...prev,
      aptitude: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data;
    if (question.option === "2") {
      data = {
        type_id: e.target.aptitude.value,
        ques_content: e.target.question_content.value,
        ques_option: [
          {
            opt_content: e.target.answer1.value,
            correct: e.target.right.value === "1" ? 1 : 0,
          },
          {
            opt_content: e.target.answer2.value,
            correct: e.target.right.value === "2" ? 1 : 0,
          },
          {
            opt_content: e.target.answer3.value,
            correct: e.target.right.value === "3" ? 1 : 0,
          },
          {
            opt_content: e.target.answer4.value,
            correct: e.target.right.value === "4" ? 1 : 0,
          },
        ],
      };
    } else {
      data = {
        type_id: e.target.personality.value,
        ques_content: e.target.question_content.value,
      };
    }
    fetch(
      `${process.env.REACT_APP_API_URL}/recruiter/ques/add?api_token=${cookies.user}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          alert("Add question success");
          window.location.reload();
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="menu-func-recruiter m-2 relative">
      <h2 className="text-xl mb-4">
        <span className="font-bold">
          {user.info.company_name ? user.info.company_name : "Loading..."}
        </span>
        {` - `}
        <span className="font-bold">Add New Question</span>
      </h2>
      <hr />
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-bold mb-2">Question</label>
            <select
              name="option"
              id="question"
              onChange={handleChange}
              className="p-2 w-full rounded-lg capitalize"
            >
              <option value="1">Personality</option>
              <option value="2">Aptitude</option>
            </select>
          </div>
          <div className="col-span-1">
            {question.option === "1" && (
              <>
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Personality
                  </label>
                  <select
                    name="personality"
                    id="personality"
                    className="p-2 w-full rounded-lg capitalize"
                  >
                    {Object.keys(personality).map((key) => (
                      <option key={key} value={key}>
                        {personality[key]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Question
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="question_content"
                    placeholder="Question"
                  />
                </div>
              </>
            )}
            {question.option === "2" && (
              <>
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Aptitude
                  </label>
                  <select
                    name="aptitude"
                    className="p-2 w-full rounded-lg capitalize"
                    onChange={handleChangeAptitude}
                  >
                    {Object.keys(aptitude).map((key) => (
                      <option key={key} value={key}>
                        {aptitude[key]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Question
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="question_content"
                    placeholder="Question"
                  />
                  <div>
                    <div>
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="answer1"
                      >
                        Answer 1
                      </label>
                      <div className="flex items-center">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          name="answer1"
                          placeholder="Answer 1"
                        />
                        <input
                          className="ml-2"
                          type="radio"
                          name="right"
                          value="1"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="answer2"
                      >
                        Answer 2
                      </label>
                      <div className="flex items-center">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          name="answer2"
                          placeholder="Answer 2"
                        />
                        <input
                          className="ml-2"
                          type="radio"
                          name="right"
                          value="2"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="answer3"
                      >
                        Answer 3
                      </label>
                      <div className="flex items-center">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          name="answer3"
                          placeholder="Answer 3"
                        />
                        <input
                          className="ml-2"
                          type="radio"
                          name="right"
                          value="3"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="answer4"
                      >
                        Answer 4
                      </label>
                      <div className="flex items-center">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          name="answer4"
                          placeholder="Answer 4"
                        />
                        <input
                          className="ml-2"
                          type="radio"
                          name="right"
                          value="4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="col-span-2 text-center mt-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Question
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddQuestion;
