import React from 'react';
import './styles.css';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const feedbackRatings = [5, 3, 4, 4, 5, 2, 3];

const barData = {
  labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
  datasets: [
    {
      label: "Rating Distribution",
      data: [1, 1, 2, 2, 3],
      backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#8e44ad", "#27ae60"],
    },
  ],
};

const pieData = {
  labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
  datasets: [
    {
      data: [1, 1, 2, 2, 3],
      backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#8e44ad", "#27ae60"],
    },
  ],
};

function FeedbackCharts() {
  return (
    <div className="charts-container">
      <h2>Feedback and Rating Distribution</h2>
      <div className="chart">
        <Bar data={barData} />
      </div>
      <div className="chart">
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default FeedbackCharts;
