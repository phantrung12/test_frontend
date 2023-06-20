import React from 'react';
import Chart from '../../../../components/Chart';

const Revenue = () => {
  return (
    <div>
      <Chart
        chartData={[
          {
            type: 'column',
            data: Array.from({ length: 12 }, () =>
              Math.floor(Math.random() * 40),
            ),
            name: 'Revenue',
            color: '#84BDEC',
          },
        ]}
        chartCategories={[
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]}
        chartLoading={true}
        title={'Revenue'}
        chartOptions={{
          title: {
            align: 'center',
          },
        }}
      />
    </div>
  );
};

export default Revenue;
