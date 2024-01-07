import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import Box from "../../Box/Box";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid } from "@mui/material";

import IconMoon from "../../Icon/IconMoon";
import { getBusinessPlanAllPositioningAction } from "../../../../store/actions/BusinessPlanActions";
import {
  getPositioning,
  getBPPositioningLoaderSelector,
  addPositioningLoaderSelector,
  getAllSocieties,
} from "../../../../store/selectors/BusinessPlanSelectors";
import { getBusinessPlanAllSocietiesAction } from "../../../../store/actions/BusinessPlanActions";
import { Spinner } from "react-bootstrap";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import ProgressLinear from "../../ProgressLinear/ProgressLinear";

// import ProgressLinear from "../../ProgressLinear/ProgressLinear";

const PositioningThree = () => {
  const dispatch = useDispatch();
  const allSocieties = useSelector(getAllSocieties);
  const [loadingSociety, setLoadingSociety] = useState(true);

  const history = useHistory();
  const colorTable = [
    "#F00020",
    "#F3D617",
    "#0080FF",
    "#00561B",
    "#7F00FF",
    "#FF6600",
    "#582900",
  ];
  const handlePrevStep = () => {
    history.push("/positionnement/positionnement_two");
  };

  const [societies, setSocieties] = useState();
  const chartRef = useRef(null);
  const selectedProject = localStorage.getItem("selectedProjectId");
  const allPositioning = useSelector(getPositioning)["besoin"];
  const [positioning, setPositioning] = useState([{ id: null, content: "" }]);
  const avancement =
    useSelector(getPositioning).PositionnementConcurrentielAvancement;

  const isLoading = useSelector(getBPPositioningLoaderSelector);
  const [loadingBesoin, setLoadingBesoin] = useState(true);

  useEffect(() => {
    dispatch(getBusinessPlanAllPositioningAction(selectedProject));
  }, [dispatch, selectedProject]);

  useEffect(() => {
    setLoadingBesoin(true);

    setPositioning(allPositioning);
    setTimeout(() => {
      setLoadingBesoin(false);
    }, 3000);
  }, [allPositioning]);

  useEffect(() => {
    setLoadingSociety(true);
    setSocieties(allSocieties[0]);
    setTimeout(() => {
      setLoadingSociety(false);
    }, 3000);
  }, [allSocieties[0]]);
  useEffect(() => {
    if (!loadingBesoin && !isLoading) {
      const xValues = positioning?.map((position) => position?.name);

      const sValues =
        societies &&
        societies.map((society) => {
          const societyVolumes = positioning?.map((besoin) => {
            const concurrent = besoin?.concurrent?.find(
              (concurrent) => concurrent?.societe === society?.id
            );
            return concurrent && concurrent?.volume !== ""
              ? Number(concurrent?.volume)
              : 0;
          });

          return societyVolumes;
        });

      const datasets = societies?.map((society, index) => ({
        fill: false,
        lineTension: 0,
        backgroundColor: colorTable[index],
        borderColor: colorTable[index],
        data: sValues[index],
      }));

      const chartData = {
        labels: loadingBesoin ? ["Loading..."] : xValues,
        datasets: datasets,
      };

      const chartOptions = {
        legend: { display: false },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Note",
              },
              ticks: {
                min: 0,
                max: 10,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Besoin",
              },
            },
          ],
        },
      };

      new Chart(chartRef.current, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });
    }
  }, [loadingBesoin, isLoading, positioning, societies]);
   
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#F2F4FC",
      color: "#000",
      fontSize: 10,
    },
  }));
  let progress = 0;
  if (avancement) {
    progress = ((avancement / 100) * 100).toFixed(2);
  }
  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container pb-32 min-h-[800px]">
        <div className="mx-5 mb-7 flex items-center ">
          <div className="flex-grow">
            <Box
              title={"POSITIONNEMENT CONCURRENTIEL"}
              color={"bg-yellow"}
              iconNameOne={"grid"}
              iconNameTwo={"people"}
              iconColor={"#fff"}
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
                Cette partie est faite pour vous amener à confronter les
                besoins/problèmes du marché de vos clients expliqués dans la
                partie &#x2039;&#x2039; Marché et Concurrence &#x203A;&#x203A; à
                la manière dont vous y répondez vous et vos concurrents. L'idée
                est, pour chaque besoin client, d'attribuer une note qui
                indiquera à quel point vous répondez à ce même besoin par
                rapport à vos concurrents. Cela vous donnera une idée assez
                précise de la manière dont vous êtes positionnés par rapport à
                vos concurrents.
              </p>
            }
          >
            <div className="flex items-center mx-1">
              <div className="p-2 bg-yellow  rounded-full">
                <IconMoon color={"#fff"} name={"i"} size={25} />
              </div>
            </div>
          </LightTooltip>
        </div>
        <div className="text-center">
          {isLoading && <Spinner animation="border" variant="primary" />}
        </div>

        <div className="mb-5">
          <ProgressLinear progress={progress} color="#F7D44B" />
        </div>
        <div className="text-[14px] text-slate-600 mx-auto text-center w-3/4 my-4">
          Cette partie est faite pour vous amener à confronter les
          besoins/problèmes du marché de vos clients expliqués dals la partie
          &#x2039;&#x2039; Marché et Concurrence &#x203A;&#x203A; à la manière
          dont vous y répondez vous et vos concurrents.
          <br />
          L'idée est, pour chaque besoin client, d'attribuer une note qui
          indiquera à quel point vous répondez à ce même besoin par rapport à
          vos concurrents. Cela vous donnera une idée assez précise de la
          manière dont vous êtes positionnés par rapport à vos concurrents.
        </div>

        <div className="flex flex-row-reverse mr-[4%]">
          {societies &&
            societies.map((el, index) => {
              return (
                <div className="flex flex-row mr-4 items-center content-center justify-center text-center">
                  <div
                    className="w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: `${colorTable[index]}` }}
                  />
                  <div style={{ color: `${colorTable[index]}` }}>{el.name}</div>
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-center p-5 w-full">
          <Grid container>
            <canvas ref={chartRef} style={{ width: "100%" }} />
          </Grid>
        </div>
        <div>
          <div></div>
          <div className="bmc-step-page">
            <button className="bmc-page-count" onClick={handlePrevStep}>
              <IconMoon color="#F7D44B" name="arrow-left" size={24} />
            </button>
            <span>
              {3}/{3}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PositioningThree;
