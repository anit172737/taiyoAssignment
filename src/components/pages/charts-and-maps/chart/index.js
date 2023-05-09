import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchGraphDataList } from "../store";
import "../../../sass/Chart.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const { graphDataList } = useSelector((state) => state?.chartsMaster);
  const dispatch = useDispatch();
  let cases = graphDataList?.cases;
  let deaths = graphDataList?.deaths;
  let recovered = graphDataList?.recovered;

  useEffect(() => {
    dispatch(fetchGraphDataList());
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "The Cases Fluctuations",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Cases",
        data: cases,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Deaths",
        data: deaths,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Recovered",
        data: recovered,
        borderColor: "rgb(40, 238, 43)",
        backgroundColor: "rgba(40, 238, 43, 0.5)",
      },
    ],
  };
  return (
    <div className="chart">
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
