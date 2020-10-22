import React, { useEffect } from 'react';
import { VictoryPie } from 'victory';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';

import useAxios from '../../hooks/useAxios';

import { convertPriorityToString } from '../../helpers/priority';

const TicketsPriorityPieChart = ({ endpoint }) => {
  const { data, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest('GET', `tickets/column_count/priority${endpoint}`);
  }, [sendRequest]);

  let pieChartContent = <p>loading...</p>;
  if (error) {
    pieChartContent = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    pieChartContent = (
      <div>
        priority count
        <VictoryPie
          data={data.map(value => {
            return {
              x: value.priority,
              y: value.count,
              label: `${convertPriorityToString(value.priority)}: ${value.count}`
            };
          })} />
      </div>
    );
  }

  return pieChartContent;
};

export default TicketsPriorityPieChart;