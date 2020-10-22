import React, { useEffect } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTooltip } from 'victory';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';

import useAxios from '../../hooks/useAxios';

import { convertStatusToString } from '../../helpers/status';

const TicketsStatusBarChart = ({ endpoint }) => {
  const { data, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest('GET', `tickets/column_count/status${endpoint}`);
  }, [sendRequest]);

  let barChartContent = <p>loading...</p>;
  if (error) {
    barChartContent = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    barChartContent = (
      <div>
        Status Count
        <VictoryChart
          domainPadding={20}>
          <VictoryAxis
            tickValues={[4, 3, 2, 1]}
            tickFormat={[
              'Backlog',
              'In progress',
              'Requires testing',
              'Complete'
            ]} />
          <VictoryAxis
            dependentAxis={true} />
          <VictoryBar
            data={data.map(value => {
              return {
                x: value.status,
                y: value.count,
                label: `${convertStatusToString(value.status)}: ${value.count}`
              };
            })}
            labelComponent={<VictoryTooltip />}
            events={[{
              target: 'data',
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => ({ style: { width: 50 } })
                    },
                    {
                      target: "labels",
                      mutation: () => ({ active: true })
                    }
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => { }
                    },
                    {
                      target: "labels",
                      mutation: () => ({ active: false })
                    }
                  ];
                }
              }
            }]} />
        </VictoryChart>
      </div>
    );
  }

  return barChartContent;
};

export default TicketsStatusBarChart;