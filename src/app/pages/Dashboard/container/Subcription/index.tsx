import React from 'react';
import Chart from '../../../../components/Chart';

const Subscription = () => {
  return (
    <div>
      <Chart
        chartData={[
          {
            type: 'spline',
            data: Array.from({ length: 7 }, () =>
              Math.floor(Math.random() * 40),
            ),
            name: 'High',
            color: '#84BDEC',
          },
          {
            type: 'spline',
            data: Array.from({ length: 7 }, () =>
              Math.floor(Math.random() * 40),
            ),
            name: 'Low',
            color: '#646464',
          },
        ]}
        chartCategories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        chartLoading={true}
        title={'Average High & Low Temperature'}
        chartOptions={{
          yAxis: {
            title: {
              text: 'Temperature (°C)',
            },
          },
          xAxis: {
            title: { text: 'Date' },
          },
        }}
      />
    </div>
  );
};

export default Subscription;
