import React, { useEffect } from "react";
import Box from "../../Box/Box";
import IconMoon from "../../Icon/IconMoon";
import TableYear from "./Table/TableYear";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessPlanSolutionsAction } from "../../../../store/actions/BusinessPlanActions";
import { Spinner } from "react-bootstrap";
import { getAllSolutionsSelector } from "../../../../store/selectors/BusinessPlanSelectors";
import { IconButton, Modal } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const YearsSolution = () => {
  const history = useHistory();
  const allSolutions = useSelector(getAllSolutionsSelector);
  const solutions = allSolutions?.SolutionListe;
  const dispatch = useDispatch();
  const selectedProject = localStorage.getItem("selectedProjectId");
  useEffect(() => {
    dispatch(getBusinessPlanSolutionsAction(selectedProject));
  }, [dispatch, selectedProject]);
  const handleAddYearSolution = () => {
    history.push("add-solution");
  };
  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container h-auto pb-5">
        <div className="mx-5 mb-15 flex items-center">
          <div className="flex-grow">
            <Box
              title={"NOTRE SOLUTION"}
              color={"bg-banana"}
              iconNameOne={"grid"}
              iconNameTwo={"people-2"}
              iconColor={"#FDD691"}
              titleColor={"text-white"}
            ></Box>
          </div>
          <div className="flex items-center mx-1">
            <div className="p-2 bg-banana bg-opacity-50 rounded-full">
              <IconMoon color={"white"} name={"i"} size={25} />
            </div>
          </div>
        </div>
        <div className="text-[14px] text-slate-600 mx-auto text-center w-3/4 my-4">
          Ici, vous pouvez ajouter toutes les situations/activités sources de
          revenus pour votre projet.
          <br />
          Par exemple si vous commercialisez une plateforme web, vous pouvez
          ajouter &#x2039;&#x2039;Plateforme Web &#x203A;&#x203A;,l'expliquer en
          détail, indiquer en quoi elle est innovante (si c'est le cas), ainsi
          que ces points forts (par rapport aux solutions de la concurence)
        </div>
        {Array.isArray(solutions) && solutions.length > 0 ? (
          <section className="flex flex-col justify-center mt-5">
            <div className="border-[#707070]  md:mx-auto md:max-w-lg lg:max-w-xl xl:max-w-2xl p-5 rounded-[21px] border-[0.2px]">
              {solutions.map((item, index) => (
                <div key={index} className="mb-4">
                  <TableYear solution={item} />
                </div>
              ))}
            </div>
            {/* <div className="flex justify-center md:mx-auto md:max-w-lg lg:max-w-xl xl:max-w-2xl w-full">
              <div className="flex bmc-box my-5 bg-white flex-col  border-banana border-0.2 px-3 w-full">
                <div className="flex flex-col gap-3 md:grid md:grid-cols-6 items-center bg-light-gray rounded my-4 py-3 ">
                  <div className="col-span-2"></div>
                  <span className="col-span-3 text-[17px] font-medium">
                    Ajouter une solution
                  </span>
                  <IconButton className="col" onClick={handleAddYearSolution}>
                    <IconMoon name="plus-basic" color="#2C2C2C" size={20} />
                  </IconButton>
                </div>
              </div>
            </div> */}
            <div className={`flex flex-col my-5 justify-center px-3 w-full`}>
              <button
                className={`text-white bg-banana hover:bg-[rgb(253 214 145 / 1)] font-bold hover:border-none py-2 px-6 rounded-lg focus:outline-none self-center shadow-md`}
                onClick={handleAddYearSolution}
              >
                Ajouter une solution
              </button>
            </div>
          </section>
        ) : (
          <div className="flex flex-col items-center mt-5">
            <p className="text-[14px] text-slate-600 mx-auto text-center w-3/4 my-4">
              Aucune solution trouvée. Vous pouvez ajouter une solution en
              cliquant sur "Ajouter une solution".
            </p>
            <div className={`flex flex-col my-5 px-3 w-[32rem]`}>
              {/* <div className="flex flex-col gap-3 md:grid md:grid-cols-6 items-center bg-light-gray rounded my-4 py-3 ">
                <div className="col-span-2"></div>
                <span className="col-span-3 text-[17px] font-medium">
                  Ajouter une solution
                </span>
                <IconButton className="col" onClick={handleAddYearSolution}>
                  <IconMoon name="plus-basic" color="#2C2C2C" size={20} />
                </IconButton>
              </div> */}
              <button
                className={`text-white bg-banana hover:bg-[rgb(253 214 145 / 1)] font-bold hover:border-none py-2 px-6 rounded-lg focus:outline-none self-center shadow-md`}
                onClick={handleAddYearSolution}
              >
                Ajouter une solution
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default YearsSolution;
