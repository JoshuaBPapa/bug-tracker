import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import useAxios from '../../hooks/useAxios';

import { convertStatusToString } from '../../helpers/status';

const TicketsStatusBarChart = ({ endpoint }) => {
  const { data, error, sendRequest, reset } = useAxios();

  // reset useAxios on endpoint changes
  useEffect(() => {
    reset();
  }, [endpoint, reset]);

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
    const chartValues = [
      {
        status: 1,
        count: 0
      },
      {
        status: 2,
        count: 0
      },
      {
        status: 3,
        count: 0
      },
      {
        status: 4,
        count: 0
      },
    ];

    chartValues.forEach((chartValue, i) => {
      const findStatus = data.find(({ status }) => {
        return status === chartValue.status;
      });

      if (findStatus) {
        chartValues[i].count = findStatus.count;
      }        
    });

    const chartData = {
      labels: chartValues.map(chartValue => {
        return convertStatusToString(chartValue.status);
      }),
      datasets: [
        {
          data: chartValues.map(chartValue => chartValue.count),
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
      <h2>
        Tickets by Status
      </h2>
      {barChartContent}
    </div>
  );
};

export default TicketsStatusBarChart;