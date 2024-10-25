import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DropdownMenuDemo } from './DropdownMenuDemo';  // Adjust import path
import StatisticsCard from './StatisticsCard';  // Adjust import path

const MainComponent = () => {
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  const fetchStatistics = async (month) => {
    try {
      const response = await axios.get(`/api/statistics?month=${month}`);
      const { totalSales, totalSoldItems, totalNotSoldItems } = response.data;
      setStatistics({ totalSales, totalSoldItems, totalNotSoldItems });
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setStatistics({ totalSales: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
    }
  };

  const handleMonthSelect = (month) => {
    fetchStatistics(month);  // Fetch statistics when the month changes
  };

  return (
    <div>
      <DropdownMenuDemo onMonthSelect={handleMonthSelect} />
      <StatisticsCard 
        totalSales={statistics.totalSales}
        totalSoldItems={statistics.totalSoldItems}
        totalNotSoldItems={statistics.totalNotSoldItems}
      />
    </div>
  );
};

export default MainComponent;
