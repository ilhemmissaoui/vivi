import React, { useState, useEffect } from "react";
import moment from "moment";
import Card from "../../components/BusinessPlan/Cards/card";
import Box from "../../components/Box/Box";
import { getSelectedProject } from "../../../store/selectors/ProjectSelectors";
import { useSelector } from "react-redux";
import CardData from "./data";

const BusinessPlan = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const numColumns = windowWidth <= 800 ? 2 : 3;

  const cardData = CardData();
  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        backgroundColor: "#F2F4FC",
        paddingTop: "20px",
        marginRight: "80px",
      }}
    >
      <div>
        <Box title={"BUSINESS PLAN"} />
        <div className="text-[14px] text-slate-600 mx-auto text-center w-3/4 my-8">
          Bienvenue sur la création de votre Business Plan ! Chaque module
          correspond à une partie du Business Plan : libre à vous de les
          parcourir dans l'ordre que vous le souhaitez
        </div>
        <div className="flex flex-wrap justify-evenly">
          {cardData.map((card, index) => (
            <div key={index} className="">
              <Card
                month={card.month}
                date={card.date}
                avancement={card.avancement}
                ProgressColor={card.ProgressColor}
                title={card.title}
                colorText={card.colorText}
                colorbadge={card.colorbadge}
                progressBar={card.progressBar}
                icon={card.icon}
                bgColor={card.bgColor}
                border={card.border}
                path={card.path}
                backGround={card.backGround}
                disabled={card.disabled}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessPlan;
