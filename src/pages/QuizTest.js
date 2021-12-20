import React, {useState, useEffect, useRef} from "react";
import {QuizAp, Start} from "../components";

function QuizTest({title}) {
  const [start, setStart] = useState(false);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <div className="pt-40 pb-[120px] bg-indigo-600 mb-[-120px]">
        <div className="container">
          <div className="w-full md:w-5/6 mx-auto">
            <h1 className="text-[40px] font-bold mb-8 text-white mx-auto">
              Online Aptitude Test and Personality Test For Job Interview .
            </h1>
            <div className="text-lg text-white mx-auto mb-8">
              <div className="mb-3">
                <h3 className="font-semibold text-lg">Aptitude Question</h3>{" "}
                <p>
                  {" "}
                  -These tests assess specific knowledge such as math, English,
                  and programming. We use a variety of quizzes to gauge your
                  aptitude for a particular role.
                </p>
              </div>
              <div className="mb-3">
                <h3 className="font-semibold text-lg">Personality Question</h3>
                <p>
                  {" "}
                  -br These tests assess beliefs, communication style, work
                  ethic, interpersonal, teamwork and leadership skills, and how
                  you respond to various situations. Importantly, they help
                  employers determine if your character traits are suited for a
                  specific role and the likelihood that you will enjoy and
                  succeed in that position in the long run.
                </p>
              </div>
              <div className="mb-3">
                <h3 className="font-semibold text-lg">About this test </h3>
                <p>
                  Recruitment processes, in any organization, which comprise
                  only of interviews often entail subjectivity and this blurs
                  lines between different factors that are taken into
                  consideration while hiring. Strong verbal and written
                  communication skills, logical reasoning and a stronghold over
                  basic mathematical concepts are basic requirements sought
                  after, in any new candidate. Job Interviews often end up
                  wasting Subject Matter Expert's man hours when the candidates
                  that get through to the interview round are often incompetent.
                  Mettl's standardized aptitude tests ensure that you hire the
                  "Right Fit" for your organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container menu-func-recruiter pb-[120px]">
        <div className="w-full bg-[#faf0fc] shadow-2xl rounded-lg p-8">
          {start ? <QuizAp /> : <Start setStart={setStart} />}
        </div>
      </div>
    </>
  );
}

export default QuizTest;
