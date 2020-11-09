import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import useAxios from '../../hooks/useAxios';

const TicketsStatusBarChart = ({ endpoint }) => {
  const { data, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest('GET', `tickets/column_count/status${endpoint}`);
  }, [sendRequest, endpoint]);

  let barChartContent = <LoadingSpinner />;
  if (error) {
    barChartContent = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    const chartData = {
      labels: ['Backlog', 'In progress', 'Requires testing', 'Complete'],
      datasets: [
        {
          data: data.map(status => status.count),
          backgroundColor: [
            '#e74c3c', // red
            '#E67E22', // orange
            '#e0b70f', // yellow
            '#2ecc71' // green
          ]
        }
      ]
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: (value) => value % 1 === 0 ? value : ''
            }
          }
        ]
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
            top: 15,
        }
      } 
    };

    barChartContent = (
      <Bar data={chartData} options={options} />
    );
  }

  return (
    <div className="chart">
      <span className="chart-title">
        Tickets by Status
      </span>
      {barChartContent}
    </div>
  );
};

export default TicketsStatusBarChart;