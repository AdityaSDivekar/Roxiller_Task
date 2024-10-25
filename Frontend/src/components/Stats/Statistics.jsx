import React from 'react';

const StatisticsCard = ({ totalSales, totalSoldItems, totalNotSoldItems }) => {
    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 max-w-xs mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">Statistics</h2>
            <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-700">Total Sales:</span>
                <span className="font-bold text-gray-900">${totalSales}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-700">Total Sold Items:</span>
                <span className="font-bold text-gray-900">{totalSoldItems}</span>
            </div>
            <div className="flex justify-between py-2">
                <span className="text-gray-700">Total Not Sold Items:</span>
                <span className="font-bold text-gray-900">{totalNotSoldItems}</span>
            </div>
        </div>
    );
};

export default StatisticsCard;
