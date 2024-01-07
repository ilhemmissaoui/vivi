import { React } from "react";

const ItemCard = ({ children }) => {
  return (
    <div className="rounded-lg solution-card border-banana border-1 mb-5 p-2 relative w-[60%] bg-[#F2F4FC] ">
      {children}
    </div>
  );
};

export default ItemCard;
