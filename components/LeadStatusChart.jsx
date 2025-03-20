import React from "react";

const LeadStatusChart = ({ data = {} }) => {
  // Dummy Data to prevent undefined error
  const defaultData = {
    Open: 10,
    "Under Discussion": 5,
    Awaiting: 7,
    Awarded: 3,
    Closed: 4,
  };

  // Use default data if `data` is undefined or empty
  const finalData = Object.keys(data).length ? data : defaultData;

  const chartData = Object.keys(finalData).map((key) => ({
    status: key,
    count: finalData[key] || 0,
  }));

  return (
    <div className="chart-container">
      <h3>📊 Lead Status Overview</h3>

    </div>
  );
};

export default LeadStatusChart;