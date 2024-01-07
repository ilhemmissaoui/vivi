import React from "react";
import HistoryParts from "../HistoryParts";
import partsData from "../data/data";

const PartnerHistory = () => {
  return (
    <div>
      <HistoryParts title={partsData[0].title} name={partsData[0].name} />
    </div>
  );
};
export default PartnerHistory;
