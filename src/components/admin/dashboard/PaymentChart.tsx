'use client';

import { BarChart } from '@mui/x-charts/BarChart';

const PaymentChart = ({
  gameName,
  sold_count,
}: {
  gameName: string[];
  sold_count: number[];
}) => {
  return (
    <BarChart
      xAxis={[
        {
          id: 'selling',
          data: gameName,
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: sold_count,
          label: 'Bestsellers',
          color: '#56ce5c',
        },
      ]}
      width={250}
      height={300}
    />
  );
};

export default PaymentChart;
