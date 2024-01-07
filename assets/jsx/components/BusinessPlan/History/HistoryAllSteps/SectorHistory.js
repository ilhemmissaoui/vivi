import React from "react";
import HistoryParts from "../HistoryParts";
import partsData from "../data/data";

const SectorHistory = () => {
  return (
    <div>
      <HistoryParts title={partsData[3].title} name={partsData[3].name} />
    </div>
  );
};
export default SectorHistory;
