'use client';

import { BarChart } from '@mui/x-charts/BarChart';

const PurchaseChart = ({
  successCount,
  createdCount,
}: {
  successCount: number;
  createdCount: number;
}) => {
  return (
    <BarChart
      xAxis={[
        {
          id: 'purchase',
          data: ['Created', 'Success'],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: [createdCount, successCount],
          label: 'Purchase',
          color: 'var(--color-dark-red)',
        },
      ]}
      width={250}
      height={300}
    />
  );
};

export default PurchaseChart;
