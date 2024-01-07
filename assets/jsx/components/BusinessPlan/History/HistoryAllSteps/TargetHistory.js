import React from "react";
import HistoryParts from "../HistoryParts";
import partsData from "../data/data";

const TargetHistory = () => {
  return (
    <div>
      <HistoryParts title={partsData[1].title} name={partsData[1].name} />
    </div>
  );
};
export default TargetHistory;
