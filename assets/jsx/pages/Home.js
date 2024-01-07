import React, { useState, useContext, useEffect } from "react";
import { ProgressBar } from "../components/Dashboard/ProgressBar";
import { Link } from "react-router-dom";
import CarouselComponent from "../components/Dashboard/Carousel/CarouselComponent";
import NewsItem from "../components/Dashboard/News/NewsItem";
import EventSidebar from "../layouts/EventSidebar";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../../context/ThemeContext";
import Spinner from "react-bootstrap/Spinner";
import { format } from "date-fns";

import {
  getAllProjectsAction,
  getAllProjectsloadingAction,
  getProjectByIdAction,
} from "../../store/actions/ProjectAction";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjectsLoading,
  getSelectedProject,
  selectAllProjects,
} from "../../store/selectors/ProjectSelectors";
import CreateProjectPrompt from "../components/Dashboard/CreateProject/CreateProjectPrompt";
import { selectProjectAction } from "../../store/actions/ProjectAction";
import { fetchResource } from "../../store/actions/ResourceActions";
import { getBusinessModelInfoAction } from "../../store/actions/BusinessModelActions";
import {
  getBusinessModelInfoLoader,
  getBusinessModelInfoSelector,
} from "../../store/selectors/BusinessModelSelectors";

const Home = (props) => {
  const dispatch = useDispatch();

  const [createDate, setCreateDate] = useState(new Date("2022-12-18"));

  const [modifyDate, setModifyDate] = useState(new Date("2022-12-18"));

  const { toggle, setToggle } = useContext(ThemeContext);
  const selectedProjectId = localStorage.getItem("selectedProjectId");
  useEffect(() => {
    dispatch(getProjectByIdAction(selectedProjectId));
    dispatch(getBusinessModelInfoAction(selectedProjectId));
  }, [selectedProjectId]);

  const allProjects = useSelector(selectAllProjects);

  const showLoading = useSelector(getAllProjectsLoading);

  const selectedProject = useSelector(getSelectedProject);

  const avancementBM = selectedProject
    ? selectedProject.businesModelAvancement
    : 0;
  const totalBM = 10;
  const progressBM = (avancementBM * 1).toFixed(2);

  const avancementBP = selectedProject
    ? selectedProject.businessPlanAvancement
    : 0;
  const totalBP = 10;
  const progressBP = (avancementBP * 1).toFixed(2);
  const inputDate =
    selectedProject && selectedProject.DateCreation
      ? new Date(selectedProject.DateCreation)
      : "";

  const lastModifiedBP =
    selectedProject && selectedProject.businesslaseUpdate
      ? new Date(selectedProject.businesslaseUpdate)
      : "";
  const lastModifiedBM =
    selectedProject && selectedProject.businesModellaseUpdate
      ? new Date(selectedProject.businesModellaseUpdate)
      : "";
  const dateCreation =
    selectedProject && selectedProject.DateCreation
      ? format(inputDate, "dd/MM/yyyy")
      : "";
  const businessModelLastUpdated =
    selectedProject && selectedProject.businesModellaseUpdate
      ? format(lastModifiedBM, "dd/MM/yyyy")
      : "";
  const businessPlanLastUpdated =
    selectedProject && selectedProject.businesslaseUpdate
      ? format(lastModifiedBP, "dd/MM/yyyy")
      : "";

  useEffect(() => {
    const id = localStorage.getItem("selectedProjectId");
    !id &&
      allProjects.length > 0 &&
      dispatch(selectProjectAction(allProjects[0]));
  }, [allProjects]);

  // Ressources des informations pour Actualité
  useEffect(() => {
    dispatch(fetchResource());
  }, [dispatch]);
  const { resourceData } = useSelector((state) => state.resource);
  const permissionTab = Object.keys(selectedProject);
  const permissionList = permissionTab.includes("permissionListe")
    ? selectedProject.permissionListe
    : false;
  const verifyTab =
    selectedProject?.permissionListe?.length === 0 ? true : false;

  const isBusinesCanvaEnabled =
    permissionList &&
    selectedProject?.permissionListe?.includes("busines_canva")
      ? true
      : false;

  return (
    <>
      <div className="home-app-container">
        <div className="w-full">
          <div
            /*  className={`${
              toggle
                ? "home-content-wrapper-closed "
                : "home-content-wrapper-open"
            }`} */
            className="w-full"
          >
            {showLoading ? (
              <div className="dasboard-loader">
                <Spinner
                  animation="border"
                  role="status"
                  size="md"
                  currentcolor="#E73248"
                />
              </div>
            ) : allProjects && allProjects.length > 0 ? (
              <div>
                <div className="w-full">
                  <CarouselComponent />
                </div>
                <div className="flex flex-row justify-between items-center self-center mx-1 my-6">
                  <Link to={"business-plan"} className="w-full">
                    <div
                      className="progress-item-container"
                      style={{ marginRight: "20px" }}
                    >
                      <span className="progress-item-title">Business plan</span>
                      <div className="dashboard-progress-bar">
                        <ProgressBar
                          progress={progressBP}
                          pathColor={"#F7D44B"}
                          trailColor={"#F3EDFF"}
                          textColor={"#F7D44B"}
                        />
                      </div>
                      <div>
                        <span className="flex text-xs">
                          <div className="text-[#19BE69] mx-1">
                            {progressBP}%
                          </div>
                          Avancement
                        </span>
                      </div>
                      <div className="progress-date-container">
                        <span className="progress-item-date-created">
                          Créé le {dateCreation}
                        </span>
                        {businessPlanLastUpdated ? (
                          <span className="progress-item-date-modified">
                            Modifié le {businessPlanLastUpdated}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                  <Link
                    to={
                      !permissionList || (isBusinesCanvaEnabled && !verifyTab)
                        ? "business-model"
                        : "#"
                    }
                    className={
                      !permissionList || (isBusinesCanvaEnabled && !verifyTab)
                        ? "w-full"
                        : "w-full disabled cursor-not-allowed"
                    }
                  >
                    <div
                      className={
                        !permissionList || (isBusinesCanvaEnabled && !verifyTab)
                          ? "progress-item-container"
                          : "w-full disabled-container-card cursor-not-allowed"
                      }
                    >
                      <span className="progress-item-title">
                        Business model canva
                      </span>
                      <div className="dashboard-progress-bar">
                        <ProgressBar
                          progress={progressBM}
                          pathColor={"#FF67E6"}
                          trailColor={"#F3EDFF"}
                          textColor={"#FF67E6"}
                        />
                      </div>
                      <div>
                        <span className="flex text-xs">
                          <div className="text-[#19BE69] text-xs mx-1">
                            {progressBM}%
                          </div>
                          Avancement
                        </span>
                      </div>
                      <div className="progress-date-container">
                        <span className="progress-item-date-created">
                          Créé le {dateCreation}
                        </span>
                        <span className="progress-item-date-modified">
                          {businessModelLastUpdated ? (
                            <span className="progress-item-date-modified">
                              Modifié le {businessModelLastUpdated}
                            </span>
                          ) : null}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <CreateProjectPrompt />
              </div>
            )}

            <div class="flex justify-center items-center bg-white rounded-lg mx-1">
              <Link to={"Actualite"}>
                <div className="news-container">
                  <div className="bg-white rounded-lg flex justify-center items-center">
                    <span className="news-title">Actualités</span>
                    <span>
                      <li className="fas fa-up-to-line"></li>
                    </span>
                  </div>
                  <div className="flex flex-row mt-8 max-w-720 justify-between gap-10">
                    {resourceData?.slice(0, 2)?.map((resource, index) => {
                      return (
                        <NewsItem
                          key={index}
                          title={resource.title}
                          description={resource.description}
                        />
                      );
                    })}
                  </div>

                  <div className="view-more-btn-container">
                    <button className="view-more-btn-view">
                      <span className="btn-view-title">Lire la suite</span>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <aside className="home-aside">
            <div className="">
              <div className="">
                <EventSidebar />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Home;
