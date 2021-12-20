import React, {useState, useEffect, useRef} from "react";
import {Chart, registerables} from "chart.js";
Chart.register(...registerables);

const chartConfigApti = {
  type: "bar",
  data: {
    datasets: [],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
      },
    },
  },
};
const chartConfigPers = {
  type: "bar",
  data: {
    datasets: [],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
      },
    },
  },
};
function Summary({message, result}) {
  const [kq, setKq] = useState({
    aptitude_graph: {maths: 2, english: 1, programing: 2},
    aptitude_score: "5/15",
    message: "RESULT :",
    personality_graph: {
      openness: 3,
      conscientiousness: 3,
      extraversion: 3,
      agreeableness: 3,
      neuroticism: 3,
    },
    personality_score: "15/75",
    success: true,
    total_score: "20/100",
  });

  useEffect(() => {
    setKq(result);
  }, [result]);

  const chartAptitude = useRef(null);
  const chartPersonality = useRef(null);

  const [chartInsApt, setChartInsApt] = useState(null);

  const [chartInsPerson, setChartInsPerson] = useState(null);

  useEffect(() => {
    if (chartInsApt) {
      chartInsApt.destroy();
    }
    if (chartAptitude && chartAptitude.current && kq.aptitude_graph) {
      chartConfigApti.labels = Object.keys(kq.aptitude_graph);
      chartConfigApti.data.datasets = [
        {
          label: ["Aptitude"],
          data: [
            {
              x: "Math",
              y: kq.aptitude_graph.maths,
            },
            {
              x: "English",
              y: kq.aptitude_graph.english,
            },
            {
              x: "Programing",
              y: kq.aptitude_graph.programing,
            },
          ],
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ];
      chartConfigApti.options.scales.y.max = 15;
      const newChartInstance = new Chart(
        chartAptitude.current,
        chartConfigApti
      );
      setChartInsApt(newChartInstance);
    }
  }, [kq.aptitude_graph, chartAptitude]);

  useEffect(() => {
    if (chartInsPerson) {
      chartInsPerson.destroy();
    }
    if (chartPersonality && chartPersonality.current && kq.personality_graph) {
      chartConfigPers.labels = Object.keys(kq.personality_graph);

      chartConfigPers.data.datasets = [
        {
          label: ["Personality"],
          data: [
            {
              x: "Openness",
              y: kq.personality_graph.openness,
            },
            {
              x: "Conscientiousness",
              y: kq.personality_graph.conscientiousness,
            },
            {
              x: "Extraversion",
              y: kq.personality_graph.extraversion,
            },
            {
              x: "Agreeableness",
              y: kq.personality_graph.agreeableness,
            },
            {
              x: "Neuroticism",
              y: kq.personality_graph.neuroticism,
            },
          ],
          backgroundColor: ["rgba(75, 192, 192, 0.2)"],
          borderColor: ["rgba(75, 192, 192, 1)"],
          borderWidth: 1,
        },
      ];
      chartConfigPers.options.scales.y.max = 75;

      const newChartInstance = new Chart(
        chartPersonality.current,
        chartConfigPers
      );
      setChartInsPerson(newChartInstance);
    }
  }, [kq.personality_graph, chartPersonality]);

  return (
    <div className="menu-func-recruiter text-center">
      <h1>{message}</h1>
      <div className="mt-4">
        <h3>
          <span>Total score</span>
        </h3>
        <p>
          <span>{kq.total_score}</span>
        </p>
        <h5>
          <span>Aptitude score</span>
        </h5>
        <p>
          <span>{kq.aptitude_score}</span>
        </p>
        <h5>
          <span>Personality score</span>
        </h5>
        <p>
          <span>{kq.personality_score}</span>
        </p>
      </div>
      <div className="grid ">
        <div className="col-span-1">
          <canvas ref={chartAptitude} />
        </div>
        <div className="col-span-1">
          <canvas ref={chartPersonality} />
        </div>
      </div>
    </div>
  );
}

export default Summary;
