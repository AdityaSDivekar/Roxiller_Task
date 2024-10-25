import React, { useEffect, useState } from 'react';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import axios from 'axios';

export default function TinyBarChart({ selectedMonth }) {
  const [chartData, setChartData] = useState([0, 0, 0, 0]); // Default to 4 ranges
  const [priceRanges, setPriceRanges] = useState(["$0 - $100", "$100 - $200", "$200 - $300", "$300 - $400"]); // Default ranges

  useEffect(() => {
    const fetchData = async () => {
      if (selectedMonth) {
        try {
          const response = await axios.get(`/api/barchart?month=${selectedMonth}`);
          const { priceRanges, itemCounts } = response.data;

          if (Array.isArray(priceRanges) && Array.isArray(itemCounts)) {
            setPriceRanges(priceRanges); // Set price range labels
            setChartData(itemCounts); // Set data for the chart
          } else {
            console.error("API response is not in expected format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching chart data:", error);
        }
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <ChartContainer
      width={500}
      height={300}
      series={[{ data: chartData, label: 'Number of Items', type: 'bar' }]}
      xAxis={[{ scaleType: 'band', data: priceRanges }]} // Ensure this is an array
      yAxis={{ label: 'Number of Items', min: 0 }} // This can be an object, not an array
    >
      <BarPlot />
    </ChartContainer> 
  );
}
