import React from "react";
import Box from "../../../Box/Box";
import IconMoon from "../../../Icon/IconMoon";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";

const Header = () => {
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#F2F4FC",
      color: "#000",
      fontSize: 10,
    },
  }));
  return (
    <div className="mx-5 mb-18 flex items-center ">
      <div className="flex-grow">
        <Box
          title={"HISTOIRE & ÉQUIPE"}
          color={"bg-light-orange"}
          iconNameOne={"grid"}
          iconNameTwo={"people-2"}
          iconColor={"#EF9118"}
          titleColor={"text-white"}
        ></Box>
      </div>
      <LightTooltip
        arrow
        placement="top-start"
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: 500 }}
        title={
          <p>
            La partie &laquo;Histoire et Equipe&raquo; constitue la première
            partie du votre Business Plan. Elle sert à introduire et expliquer
            dans les grandes lignes votre projet(la génèse, comment cette idée
            vous est venue, ce que vous faites et comment vous le faites) ainsi
            que la présentation rapide des membres de votre équipe. Vous
            indiquerez également les tendances de votre marché (est-ce un marché
            en croissance ? etc.), cette partie sert de &laquo;bande
            annonce&raquo; de votre Business Plan, avant de rentrer dans les
            détails dans la catégorie &laquo;Marché et Concurrence&raquo; .
          </p>
        }
      >
        <div className="flex items-center mx-1">
          <div className="p-2 bg-light-orange bg-opacity-50 rounded-full">
            <IconMoon color={"white"} name={"i"} size={25} />
          </div>
        </div>
      </LightTooltip>
    </div>
  );
};
export default Header;
