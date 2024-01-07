import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Box from "../../../Box/Box";
import IconMoon from "../../../Icon/IconMoon";
import { getBusinessPlanSynthese } from "../../../../../services/BusinessPlanService";

const SynthesePrev = () => {
  const [dataList, setDataList] = useState([]);
  const selectedProject = localStorage.getItem("selectedProjectId");

  const fetchData = async () => {
    try {
      const Data = await getBusinessPlanSynthese(selectedProject);
      setDataList(Data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedProject]);

  // Extract labels and datasets from the dataList
  const years = Object.keys(dataList);
  const chiffreAffaireData = years.map((year) => dataList[year].ChiffreAffaire);
  const resultatExerciceData = years.map(
    (year) => dataList[year].resultatExercice
  );
  const tesorerieData = years.map((year) =>
    parseFloat(dataList[year].Tesorerie)
  );

  const data = {
    labels: years,
    datasets: [
      {
        label: "Le montant total du chiffre d'affaires",
        data: chiffreAffaireData,
        backgroundColor: "#E73248",
        barThickness: 50,
      },
      {
        label: "Le montant total du résultat net",
        data: resultatExerciceData,
        backgroundColor: "#FDD388",
        barThickness: 50,
      },
      {
        label: "Le montant de la trésorerie en fin d'année",
        data: tesorerieData,
        backgroundColor: "#514495",
        barThickness: 50,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container h-auto pb-5">
        <div className="mx-5 mb-15 flex items-center">
          <div className="flex-grow">
            <Box
              title={"SYNTHESE"}
              color="bg-light-purple"
              iconNameOne={"grid"}
              iconNameTwo={"finance"}
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
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default SynthesePrev;
