import React, { useState, useEffect } from "react";
import IconMoon from "../../Icon/IconMoon";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessPlanAllSocietiesAction } from "../../../../store/actions/BusinessPlanActions";
import {
  getAllSocieties,
  getBPSocietyLoaderSelector,
} from "../../../../store/selectors/BusinessPlanSelectors";
import ItemCard from "./Cards/itemCard";
import { Link } from "react-router-dom";
import Box from "../../Box/Box";
import { useHistory } from "react-router-dom";
import ProgressLinear from "../../ProgressLinear/ProgressLinear";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
const Societies = () => {
  const history = useHistory();
  const loadingSociety = useSelector(getBPSocietyLoaderSelector);
  const dispatch = useDispatch();

  const allSocieties = useSelector(getAllSocieties);
  const [societies, setSocieties] = useState([]);
  const concurrenceInfo = useSelector((state) => state.bp.societies);
  const avancement = concurrenceInfo.avancement;
  const selectedProject = localStorage.getItem("selectedProjectId");

  useEffect(() => {
    dispatch(getBusinessPlanAllSocietiesAction(selectedProject));
  }, [dispatch, selectedProject]);
  useEffect(() => {}, [allSocieties[0]]);

  useEffect(() => {
    setSocieties(allSocieties[0]);
  }, [allSocieties[0], selectedProject]);

  const handleNavigate = () => {
    history.push("/market-competition/societies/add");
  };

  const renderSpinner = (
    <div className="loader mb-5">
      <Spinner
        animation="border"
        role="status"
        size="md"
        currentcolor="#E73248"
      />
    </div>
  );
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
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container pb-32">
        <div className="mx-5 mb-18 flex items-center ">
          <div className="flex-grow">
            <Box
              title={"MARCHÉ & CONCURRENCE"}
              color={"bg-dark-purple"}
              iconNameOne={"grid"}
              iconNameTwo={"go-up"}
              iconColor={"#fff"}
              titleColor={"text-white"}
            />
          </div>
          <LightTooltip
            arrow
            placement="top-start"
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 500 }}
            title={
              <p>
                Dans cette partie, vous pourrez détailler plus précisément à
                quel(s) probléme(s) du marché vous répondez avec votre projet et
                quels sont les concurrents qui répondent(plus ou moins) à ces
                mêmes problémes. Cette partie fait directement suite au module
                &laquo;tendances du marché&raquo; abordé dans la partie Histoire
                & Equipe .
              </p>
            }
          >
            <div className="flex items-center mx-1">
              <div className="p-2 bg-dark-purple rounded-full">
                <IconMoon color={"#fff"} name={"i"} size={25} />
              </div>
            </div>
          </LightTooltip>
        </div>
        {loadingSociety ? (
          renderSpinner
        ) : societies ? (
          <>
            <div className="mb-7">
              <ProgressLinear progress={avancement} color="#342752" />
            </div>
            <div
              className={`text-black text-lg font-bold self-start mt-2  ms-5 `}
            >
              Liste des concurrents
            </div>
            {societies.length > 0 && (
              <div className="flex justify-center my-3 py-2 ms-2">
                <div
                  className={`row row-cols-1 row-cols-md-${Math.min(
                    2,
                    societies?.length
                  )} row-cols-lg-${Math.min(3, societies?.length)} g-4 ms-3 `}
                >
                  {societies?.map((society, index) => (
                    <div key={index}>
                      <ItemCard
                        setSocieties={setSocieties}
                        idSociety={society.id}
                        name={society.name}
                        pointFort={society.pointFort}
                        pointFaible={society.pointFaible}
                        directIndirect={society.directIndirect}
                        taille={society.taille}
                        effectif={society.effectif}
                        ca={society.CA}
                        logo={society.logo}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center text-center mt-20">
            <span>
              Veuillez ajouter une société en utilisant le bouton ci-dessous.
            </span>
          </div>
        )}

        <div className="flex flex-row mt-5 ms-5 ">
          <IconMoon
            className="me-2"
            color={"#B1A6CB"}
            name="Groupe-4498"
            size={30}
          />
          <button
            onClick={handleNavigate}
            className=" shadow-grey-600 shadow-md bg-dark-purple hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none 	 self-center "
          >
            Ajouter une société
          </button>
        </div>
        <div className="bmc-step-page ">
          <button
            className="bmc-page-count"
            // onClick={handleNextStep}
          >
            <Link to="/market-competition">
              <IconMoon color="#342752" name="arrow-left" size={24} />
            </Link>
          </button>
          <span>
            {2}/{2}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Societies;
