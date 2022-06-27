// external
import { observer } from "mobx-react-lite";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#c7ef00",
        font: {
          family: "Nunito",
        },
        boxWidth: 0,
        boxHeight: 0,
      },
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Total value locked (TVL)",
      backgroundColor: "#c7ef00",
      borderColor: "#c7ef00",
      data: [0, 10, 5, 2, 20, 30, 45],
      tension: 0.3,
    },
  ],
};

const TVLChart = observer(({ user }) => (
  <Line options={options} data={data} width={100} height={100} />
));

export default TVLChart;
