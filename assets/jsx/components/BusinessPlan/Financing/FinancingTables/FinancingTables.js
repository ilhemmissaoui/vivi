import * as React from "react";
import { useState, useEffect } from "react";
import Box from "../../../Box/BoxFinancement";
import IconMoon from "../../../Icon/IconMoon";
import TresorerieTable from "./tresorerieTable";
import ResultatCompte from "./ResultatCompteTable";
import "../../../../../css/table.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBilanPerYear,
  fetchCompteResultat,
  fetchDataPerYear,
  fetchPlanFinancier,
  fetchTresAnnees,
} from "../../../../../store/actions/TableauxFinancierActions";
import Spinner from "react-bootstrap/Spinner";
import Bilan from "./BilanTable";
import PlanFinancier from "./PlanFinancierTable";
export default function FinancingTables() {
  const [selected, setSelected] = useState("");
  const { TresAnnees, TresData, BilanData, ResultatData, PlanData } =
    useSelector((state) => state.tableauFinancier);
  const selectProject = localStorage.getItem("selectedProjectId");
  // Add a new state variable to store the selected annee.id
  const [selectedAnneeId, setSelectedAnneeId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  /*  useEffect(() => {
    dispatch(fetchTresAnnees(selectProject));
    dispatch(fetchCompteResultat(selectProject));
  }, [dispatch, selectProject]); */
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchTresAnnees(selectProject));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, selectProject]);

  useEffect(() => {
    if (!selected && TresAnnees.length !== 0) {
      dispatch(fetchCompteResultat(selectProject));
      setSelected("COMPTE DE RÉSULTAT");
    }
  }, [dispatch, selectProject, selected, TresAnnees]);

  /*  useEffect(() => {
    dispatch(fetchBilanPerYear(selectProject, selectedAnneeId));
  }, [dispatch, selectProject, selectedAnneeId]); */

  // Dispatch the action when the "TRÉSORERIE" button is clicked
  const handleTresorerieButtonClick = async () => {
    if (TresAnnees.length != 0) {
      await dispatch(fetchDataPerYear(selectProject, TresAnnees[0].id));
      //setSelectedAnneeId(TresAnnees[0].id);
    }
    setSelected("TRÉSORERIE");
    dispatch(fetchTresAnnees(selectProject));
  };
  // Dispatch the action when the "COMPTE DE RESULTAT" button is clicked
  const handleCompteResultatButtonClick = async () => {
    await dispatch(fetchCompteResultat(selectProject));
    setSelected("COMPTE DE RÉSULTAT");
  };
  // Dispatch the action when the "BILAN" button is clicked
  const handleBilanButtonClick = async () => {
    if (TresAnnees.length != 0) {
      await dispatch(fetchBilanPerYear(selectProject, TresAnnees[0].id));
      setSelectedAnneeId(TresAnnees[0].id);
      setSelected("BILAN");
      dispatch(fetchTresAnnees(selectProject));
    }
  };
  // Dispatch the action when the "COMPTE DE RESULTAT" button is clicked
  const handlePlanFinancierButtonClick = async () => {
    await dispatch(fetchPlanFinancier(selectProject));
    setSelected("PLAN DE FINANCEMENT");
  };
  // Function to handle button click and change selectedAnneeId
  const handleAnneeButtonClick = (anneeId) => {
    setSelectedAnneeId(anneeId);
    // Dispatch the fetchDataPerYear action when the button is clicked
    dispatch(fetchDataPerYear(selectProject, anneeId));
  };
  const handleAnneeButtonClick2 = (anneeId) => {
    setSelectedAnneeId(anneeId);
    // Dispatch the fetchBilanPerYear action when the button is clicked
    dispatch(fetchBilanPerYear(selectProject, anneeId));
  };
  return (
    <div className="flex flex-col justify-center">
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bg-white rounded-xl shadow-2xl flex flex-col justify-center">
        <div className="flex flex-row ">
          <div className="w-[88%] ml-[4%] mr-[1%]">
            <Box
              title={"FINANCEMENT & CHARGES"}
              color="bg-light-purple"
              iconNameOne={"grid"}
              iconNameTwo={"charge"}
              iconColor={"#FDD691"}
              titleColor={"text-white"}
            />
          </div>
          <div className="p-2 bg-light-purple rounded-full h-fit mt-6">
            <IconMoon color={"#fff"} name={"i"} size={25} />
          </div>
        </div>
        <h1 className="flex justify-center" style={{ fontWeight: "600" }}>
          Mes tableaux financiers
        </h1>
        {isLoading ? (
          <div className="flex justify-center align-middle">
            <Spinner
              animation="border"
              role="status"
              className="spinner-border"
            />
          </div>
        ) : (
          <div className="rounded-md w-[80%] flex justify-around mx-[10%] py-2 border-2">
            <button
              className={`annee border-none font-bold text-base${
                selected === "COMPTE DE RÉSULTAT" &&
                "text-violet-900 underline decoration-violet-900"
              }`}
              onClick={handleCompteResultatButtonClick}
            >
              COMPTE DE RÉSULTAT
            </button>
            <button
              className={`border-none font-bold text-base${
                selected === "BILAN" &&
                "text-violet-900 underline decoration-violet-900"
              }`}
              onClick={handleBilanButtonClick}
            >
              BILAN
            </button>
            <button
              className={`border-none font-bold text-base${
                selected === "PLAN DE FINANCEMENT" &&
                "text-violet-900 underline decoration-violet-900"
              }`}
              onClick={handlePlanFinancierButtonClick}
            >
              PLAN DE FINANCEMENT
            </button>
            <button
              className={`border-none font-bold text-base${
                selected === "TRÉSORERIE" &&
                "text-violet-900 underline decoration-violet-900"
              }`}
              onClick={handleTresorerieButtonClick}
            >
              TRÉSORERIE
            </button>
          </div>
        )}
        {TresAnnees.length == 0 && !selected ? (
          <div className="flex justify-center align-middle">
            <p className="p-10 text-violet-900 decoration-violet-900 text-base">
              Aucune année
            </p>
          </div>
        ) : (selected == "COMPTE DE RÉSULTAT" && TresAnnees.length != 0) ||
          (!selected && TresAnnees.length != 0) ? (
          <ResultatCompte TresAnnees={TresAnnees} ResultatData={ResultatData} />
        ) : selected == "BILAN" && TresAnnees.length != 0 ? (
          <div>
            <div className="rounded-xl w-[70%] flex justify-around mx-[15%] py-2 my-4">
              {TresAnnees?.map((annee) => {
                return (
                  <button
                    key={annee.id}
                    style={{ padding: "2px 8px" }}
                    className={`border-none font-bold rounded-md text-sm ${
                      selectedAnneeId === annee.id
                        ? "bg-violet-900 text-white"
                        : ""
                    }`}
                    onClick={() => {
                      handleAnneeButtonClick2(annee.id);
                    }}
                  >
                    {annee.Name}
                  </button>
                );
              })}
            </div>
            {BilanData && (
              <Bilan
                selectProject={selectProject}
                selectedAnnee={selectedAnneeId}
              />
            )}
          </div>
        ) : selected === "PLAN DE FINANCEMENT" && TresAnnees.length != 0 ? (
          <PlanFinancier
            TresAnnees={TresAnnees}
            ResultatData={PlanData}
            selectProject={selectProject}
          />
        ) : selected === "TRÉSORERIE" && TresAnnees.length != 0 ? (
          <div>
            <div className="rounded-xl w-[70%] flex justify-around mx-[15%] py-2 my-4">
              {TresAnnees?.map((annee) => {
                return (
                  <button
                    key={annee.id}
                    style={{ padding: "2px 8px" }}
                    className={`border-none font-bold rounded-md text-sm ${
                      selectedAnneeId === annee.id
                        ? "bg-violet-900 text-white"
                        : ""
                    }`}
                    onClick={() => {
                      handleAnneeButtonClick(annee.id);
                    }}
                  >
                    {annee.Name}
                  </button>
                );
              })}
            </div>
            <TresorerieTable
              TresData={TresData}
              selectProject={selectProject}
              selectedAnneeId={selectedAnneeId}
            />
          </div>
        ) : (
          <div className="flex justify-center align-middle">
            <p className="p-10 text-violet-900 decoration-violet-900 text-base">
              Aucune année
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
