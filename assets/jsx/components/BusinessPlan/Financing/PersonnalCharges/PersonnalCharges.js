import React, { useState } from "react";
import Box from "../../../Box/BoxFinancement";
import IconMoon from "../../../Icon/IconMoon";
import ProgressLinear from "../../../ProgressLinear/ProgressLinear";
import { Tab, Tabs } from "@mui/material";
import CollaboratorCharges from "./CollaboratorCharge";
import LeaderCharges from "./LeaderCharges";
import Simulateur from "./Simulateur";
const PersonnalCharges = () => {
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index } = props;

    return (
      <div hidden={value !== index}>
        {value === index && <div>{children}</div>}
      </div>
    );
  };

  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container h-auto pb-5">
        <div className="mx-5 mb-15 flex items-center">
          <div className="flex-grow">
            <Box
              title={"FINANCEMENT & CHARGES"}
              color="bg-light-purple"
              iconNameOne={"grid"}
              iconNameTwo={"charge"}
              iconColor={"#FDD691"}
              titleColor={"text-white"}
            />
          </div>
          <div className="flex items-center mx-1">
            <div className="p-2 bg-light-purple bg-opacity-50 rounded-full">
              <IconMoon color={"white"} name={"i"} size={25} />
            </div>
          </div>
        </div>
        <ProgressLinear progress={20} color="#514495" />
        <div className="mx-5 ">
          <div className="flex justify-center items-center">
            <span className="my-4 font-medium text-[21px]">
              Salaires et Charges sociales
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center mr-4 ml-4">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab
              value="one"
              label="Salaires et Charges sociales des collaborateurs"
              wrapped
            />
            <Tab
              value="two"
              label="Salaires et Charges sociales des dirigeants"
              wrapped
            />
            <Tab
              value="three"
              label="Simulateur de revenus pour salarié"
              wrapped
            />
          </Tabs>
        </div>

        <div className="flex justify-center items-center">
          <div
            className="h-700 mt-10 mx-auto border-2 rounded p-10"
            style={{ width: "80%" }}
          >
            <TabPanel value={value} index="one">
              <CollaboratorCharges />
            </TabPanel>
            <TabPanel value={value} index="two">
              <LeaderCharges />
            </TabPanel>
            <TabPanel value={value} index="three">
              <Simulateur />
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonnalCharges;
