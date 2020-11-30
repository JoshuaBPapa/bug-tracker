import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import useAxios from '../../hooks/useAxios';

import { convertPriorityToString } from '../../helpers/priority';

const TicketsPriorityPieChart = ({ endpoint }) => {
  const { data, error, sendRequest, reset } = useAxios();

  // reset useAxios on endpoint changes
  useEffect(() => {
    reset();
  }, [endpoint, reset]);

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
    const chartValues = [
      {
        priority: 1,
        count: 0
      },
      {
        priority: 2,
        count: 0
      },
      {
        priority: 3,
        count: 0
      },
      {
        priority: 4,
        count: 0
      },
    ];

    chartValues.forEach((chartValue, i) => {
      const findPriority = data.find(({ priority }) => {
        return priority === chartValue.priority;
      });

      if (findPriority) {
        chartValues[i].count = findPriority.count;
      }        
    });

    const chartData = {
      labels: chartValues.map(chartValue => {
        return convertPriorityToString(chartValue.priority);
      }),
      datasets: [
        {
          data: chartValues.map(chartValue => chartValue.count),
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
      <h2>
        Tickets by Priority
      </h2>
      {pieChartContent}
    </div>
  );
};

export default TicketsPriorityPieChart;