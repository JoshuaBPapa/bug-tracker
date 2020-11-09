import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import useAxios from '../../hooks/useAxios';

const TicketsPriorityPieChart = ({ endpoint }) => {
  const { data, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest('GET', `tickets/column_count/priority${endpoint}`);
  }, [sendRequest, endpoint]);

  let pieChartContent = <LoadingSpinner />;
  if (error) {
    pieChartContent = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    const chartData = {
      labels: ['Low', 'Moderate', 'High', 'Severe'],
      datasets: [
        {
          data: data.map(priority => priority.count),
          backgroundColor: [
            '#2ecc71', // green
            '#e0b70f', // yellow
            '#E67E22', // orange
            '#e74c3c' // red
          ]
        }
      ]
    };

    pieChartContent = (
      <Doughnut data={chartData} />
    );
  }

  return (
    <div className="chart">
      <span className="chart-title">
        Tickets by Priority
      </span>
      {pieChartContent}
    </div>
  );
};

export default TicketsPriorityPieChart;