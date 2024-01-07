import React, { useEffect } from "react";
import Box from "../../Box/Box";
import IconMoon from "../../Icon/IconMoon";
import ItemCard from "./items/ItemCard";
import CardContent from "./items/CardContent";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSolutionAction } from "../../../../store/actions/BusinessPlanActions";
import { getOneSolutionSelector } from "../../../../store/selectors/BusinessPlanSelectors";
import { Spinner } from "react-bootstrap";
const Solution = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.bp.getYearLoading);
  const idSolution = localStorage.getItem("idSolution");
  const selectedProject = localStorage.getItem("selectedProjectId");
  const TheSolution = useSelector(getOneSolutionSelector);
  const OneSolution = TheSolution.solutionListe;
  const history = useHistory();
  useEffect(() => {
    dispatch(getOneSolutionAction(selectedProject, idSolution));
  }, [dispatch, selectedProject, idSolution]);
  const handleButtonClick = (id) => {
    dispatch(getOneSolutionAction(selectedProject, id));
    history.push(`/edit-Solution/${id}`);
  };
  const handleRetourClick = () => {
    history.push("annees");
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
          ajouter &#x2039;&#x2039; Plateforme Web &#x203A;&#x203A;,l'expliquer
          en détail, indiquer en quoi elle est innovante (si c'est le cas),
          ainsi que ces points forts (par rapport aux solutions de la
          concurence)
        </div>
        {isLoading ? (
          <div className="loader mb-5">
            <Spinner
              animation="border"
              role="status"
              size="md"
              currentcolor="#E73248"
            />
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <ItemCard name={OneSolution?.name}>
                <div>
                  <div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleButtonClick(OneSolution?.id)}
                      >
                        <IconMoon
                          color="#707070"
                          name="edit-input1"
                          size={24}
                        />
                      </button>
                    </div>
                    <p className="text-xl text-center pt-2 flex justify-center text-banana font-extrabold">
                      {OneSolution?.name.toUpperCase()}
                    </p>
                    <div className="flex flex-wrap justify-center items-center my-2 mx-10 border-2 border-banana rounded-lg p-2 bg-white">
                      {OneSolution?.listeAnnee?.length > 0 ? (
                        OneSolution.listeAnnee.map((annee) => (
                          <p className="text-base text-center pt-2 flex justify-center text-black font-medium mx-2">
                            {annee.annee}
                          </p>
                        ))
                      ) : (
                        <p className="text-lg text-center pt-2 flex justify-center text-black font-medium mx-4">
                          Pas d'année
                        </p>
                      )}
                    </div>
                  </div>
                  <CardContent
                    id={OneSolution?.id}
                    strength={OneSolution?.pointFort}
                    description={OneSolution?.descTechnique}
                    innovation={OneSolution?.innovation}
                    revenus={OneSolution?.chiffreAffaireListe}
                  />
                </div>
              </ItemCard>
            </div>
          </>
        )}
        <div className="flex justify-center p-2 m-2">
          <button
            onClick={handleRetourClick}
            className="text-white bg-banana hover:bg-[rgb(253 214 145 / 1)] font-bold hover:border-none py-2 px-6 rounded-lg focus:outline-none self-center shadow-md"
          >
            Retour vers nos solutions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Solution;
