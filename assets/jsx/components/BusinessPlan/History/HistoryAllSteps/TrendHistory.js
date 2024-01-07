import React from "react";
import HistoryParts from "../HistoryParts";
import partsData from "../data/data";

const TrendHistory = () => {
  return (
    <div>
      <HistoryParts
        title={partsData[2].title}
        name={partsData[2].name}
        description={partsData[2].description}
      />
    </div>
  );
};
export default TrendHistory;
