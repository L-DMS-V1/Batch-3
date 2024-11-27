import React, { useEffect, useState } from "react";
import Navbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { getAllCourseProgress } from "../Api";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeeProgresses = () => {
  const [ProgressData, setProgressData] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const data = await getAllCourseProgress();
        setProgressData(data);

        // Aggregate the data by course
        const courseAggregates = {};

        data.forEach((item) => {
          const courseName = item.course.courseName;
          const progress = item.progressPercentage;

          if (!courseAggregates[courseName]) {
            courseAggregates[courseName] = { totalProgress: 0, count: 0 };
          }

          courseAggregates[courseName].totalProgress += progress;
          courseAggregates[courseName].count += 1;
        });

        // Calculate average progress for each course
        const courses = [];
        const averageProgress = [];

        for (const [courseName, aggregate] of Object.entries(courseAggregates)) {
          courses.push(courseName);
          averageProgress.push(aggregate.totalProgress / aggregate.count);
        }

        // Set the chart data
        setChartData({
          labels: courses,
          datasets: [
            {
              label: 'Average Progress Percentage',
              data: averageProgress,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching course progress:", error);
      }
    };

    fetchCourseProgress();
  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div className="min-vh-100 d-flex">
      {/* Sidebar */}
      <div className="sidebar">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {/* Header with Back Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-3 fw-bold text-center flex-grow-1">Detailed Employee Progress</h2>
          <button onClick={handleBack} className="btn btn-secondary">Go Back</button>
        </div>

        {/* Chart Display */}
        <div className="mb-5">
          {chartData.labels ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Course Progress Comparison',
                  },
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>

        {/* Table for Employee Progress */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th className="py-3 px-6">Employee Name</th>
                <th className="py-3 px-6">Course Name</th>
                <th className="py-3 px-6">Progress (%)</th>
              </tr>
            </thead>
            <tbody>
              {ProgressData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "table-light" : "table-secondary"}>
                  <td>{item.employee.username}</td>
                  <td>{item.course.courseName}</td>
                  <td>{item.progressPercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProgresses;
