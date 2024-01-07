/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link, useHistory } from "react-router-dom";
import { Dropdown, OverlayTrigger, Spinner } from "react-bootstrap";
import useScrollPosition from "use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
//import LogoutPage from './Logout';
import img from "../../../images/thumbnail.svg";
/// Image
import { Button } from "react-bootstrap";
import IconMoon from "../../components/Icon/IconMoon";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedProject,
  selectAllProjects,
} from "../../../store/selectors/ProjectSelectors";
import {
  getAllProjectsAction,
  getProjectByIdAction,
  updateLogoAction,
} from "../../../store/actions/ProjectAction";
import {
  getBusinessPlanHistoryAction,
  getBusinessPlanTeamMembersAction,
  getBusinessPlanConcurrenceAction,
  getBusinessPlanAllSocietiesAction,
} from "../../../store/actions/BusinessPlanActions";
import { selectProjectAction } from "../../../store/actions/ProjectAction";
import { fetchPdfBusinessCanvas } from "../../../store/actions/TableauxFinancierActions";
import BASE_URL from "../../../../src/apiConfig";
import { async } from "regenerator-runtime";
import { getAllProjects, updateLogo } from "../../../services/ProjetService";
import { useUploadImage } from "../../../hooks/useUploadImage";
import Tooltip from "@mui/material/Tooltip";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);

  const dispatch = useDispatch();

  let scrollPosition = useScrollPosition();
  const history = useHistory();

  const projects = useSelector(selectAllProjects);
  const selectProject = localStorage.getItem("selectedProjectId");

  const selectedProject = useSelector(getSelectedProject);
  const { image, setImg, handleUpload } = useUploadImage();

  const isloading = useSelector((state) => state.project.isloading);

  const [selectedItem, setSelectedItem] = useState(selectedProject[0]);

  const permissionTab = Object.keys(selectedProject);
  const permissionList = permissionTab.includes("permissionListe")
    ? selectedProject.permissionListe
    : false;

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let app = [
      "app-profile",
      "post-details",
      "app-calender",
      "email-compose",
      "email-inbox",
      "email-read",
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "post-details",
      "ecom-product-detail",
    ],
    charts = [
      "chart-rechart",
      "chart-flot",
      "chart-chartjs",
      "chart-chartist",
      "chart-sparkline",
      "chart-apexchart",
    ],
    bootstrap = [
      "ui-accordion",
      "ui-badge",
      "ui-alert",
      "ui-button",
      "ui-modal",
      "ui-button-group",
      "ui-list-group",
      "ui-media-object",
      "ui-card",
      "ui-carousel",
      "ui-dropdown",
      "ui-popover",
      "ui-progressbar",
      "ui-tab",
      "ui-typography",
      "ui-pagination",
      "ui-grid",
    ],
    redux = ["redux-form", "redux-wizard", "todo"],
    widget = ["widget-basic"];

  const handleSelectProject = async (item) => {
    setSelectedItem(item);
    const itemPermission = item.permissionListe;

    if (!itemPermission || item) {
      setIsOpen(false);
      await dispatch(selectProjectAction(item));
      dispatch(getProjectByIdAction(item.id));

      if (itemPermission) {
        history.push("/dashboard");
      }
    } else {
      setIsOpen(false);
      history.push("/dashboard");
    }
  };
  // update the project image
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleEditClick = () => {
    // Trigger the file input click
    document.getElementById("fileInput").click();
  };

  const handleUploadCallback = (uploadedImage) => {
    // Set the image in the state and mark it as uploaded
    setImg(uploadedImage);
    setIsImageUploaded(true);
  };

  // Use useEffect to dispatch updateLogoAction when isImageUploaded changes
  useEffect(() => {
    const updateLogoIfNeeded = async () => {
      if (isImageUploaded) {
        await dispatch(updateLogoAction(selectProject, { logo: image }));
      }
    };

    updateLogoIfNeeded();
  }, [isImageUploaded, dispatch, selectProject, image]);

  // End update project image

  const handlePdfButtonClick = () => {
    const pdfUrl = generatePdfUrl(selectedItem, BASE_URL);

    // Open the URL in a new tab
    window.location.href = pdfUrl;
  };

  const generatePdfUrl = (selectedItem, BASE_URL) => {
    return `${BASE_URL}/api/${selectedItem}/busnessModelinfo/pdf/generator`;
  };

  const handleNavigate = () => {
    history.push("/partners");
  };

  return (
    <div
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? scrollPosition > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <MM className="metismenu" id="menu">
          <Link to="/dashboard">
            <li className={`${app.includes(path) ? "mm-active" : ""}`}>
              <Button variant="outline-dark" className="dashboard-button">
                <div>
                  <IconMoon
                    className="dashboard-table-icon"
                    // color="#352853"
                    name="grid"
                    size={24}
                  />
                </div>
                <span className="nav-text">Tableau de bord</span>
              </Button>
            </li>
          </Link>
          <div className="responsive-section">
            {projects.length > 0 ? (
              <>
                <div className="responsive-project-container">
                  <div className="flex flex-col items-center mb-3">
                    <div className="project-image-container mb-3">
                      <img
                        className="project-image"
                        src={selectedProject.logo ? selectedProject.logo : img}
                        alt="project-img"
                      />
                    </div>
                    <input
                      type="file"
                      id="fileInput"
                      className="d-none"
                      onChange={(e) => handleUpload(e, handleUploadCallback)}
                    />
                    <div
                      className="responsive-edit-icon nav-text"
                      onClick={handleEditClick}
                    >
                      <IconMoon
                        className="responsive-edit-icon"
                        color="#504C87"
                        name="edit-input"
                        size={18}
                      />
                    </div>
                  </div>
                </div>
                <div className="ml-6 flex flex-col items-center py-2">
                  <div className="text-center text-lg font-bold mb-3">
                    {selectedProject && selectedProject.name}
                  </div>
                  <Dropdown
                    className="sidebar-dropdown-container"
                    show={isOpen}
                    onToggle={toggleDropdown}
                  >
                    <Dropdown.Toggle
                      className="sidebar-dropdown-icon"
                      id="dropdown-basic"
                      style={{ paddingTop: "0px" }}
                    >
                      <IconMoon
                        color="#2C2C2C"
                        name="arrow-right-solid"
                        size={12}
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {Array.isArray(projects) && projects.length > 0
                        ? projects.map((project) => (
                            <Dropdown.Item
                              key={project.id}
                              href="#action-1"
                              onClick={() => handleSelectProject(project)}
                            >
                              {project.name}
                            </Dropdown.Item>
                          ))
                        : null}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </>
            ) : null}
          </div>
          {permissionList ? (
            <Tooltip
              arrow
              placement="bottom"
              title={
                <p>
                  Seul le propriétaire de ce projet peut générer ce document.
                </p>
              }
            >
              <div
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "0.625rem 1.875rem", display: "block" }}
                className="disabled cursor-not-allowed"
              >
                <li className={`${app.includes(path) ? "mm-active" : ""}`}>
                  <Button
                    variant="outline-dark"
                    className="generate-button disabled-link"
                  >
                    <div
                      className="generate-button-1"
                      style={{ marginRight: "15px" }}
                    >
                      <div className="nav-text generate-lock-container">
                        <IconMoon
                          className="generate-lock-icon"
                          color="#14A800"
                          name="lock"
                          size={24}
                        />
                      </div>
                      <span className="nav-text generate-text">
                        Générer mon document
                      </span>
                    </div>
                    <br />
                    <div>
                      <IconMoon
                        className="generate-lock-icon "
                        color="#2C2C2C"
                        name="download"
                        size={24}
                      />
                    </div>
                  </Button>
                </li>
              </div>
            </Tooltip>
          ) : (
            <Link
              to={`api/${selectProject}/busnessModelinfo/pdf/generator`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className={`${app.includes(path) ? "mm-active" : ""}`}>
                <Button
                  variant="outline-dark"
                  className="generate-button disabled-link"
                  onClick={handlePdfButtonClick}
                >
                  <div
                    className="generate-button-1"
                    style={{ marginRight: "15px" }}
                  >
                    <div className="nav-text generate-lock-container">
                      <IconMoon
                        className="generate-lock-icon"
                        color="#14A800"
                        name="lock"
                        size={24}
                      />
                    </div>
                    <span className="nav-text generate-text">
                      Générer mon document
                    </span>
                  </div>
                  <br />
                  <div>
                    <IconMoon
                      className="generate-lock-icon "
                      color="#2C2C2C"
                      name="download"
                      size={24}
                    />
                  </div>
                </Button>
              </li>
            </Link>
          )}
          <li>
            {permissionList ? (
              <Tooltip
                arrow
                placement="bottom"
                title={
                  <p>
                    Seul le propriétaire de ce projet peut modifier les
                    permissions.
                  </p>
                }
              >
                <Link
                  to={"#"}
                  className={`${
                    widget.includes(path) === "permissions" ? "mm-active" : ""
                  }`}
                >
                  <IconMoon color="#8F8F8F" name="lock" size={24} />
                  <span className="nav-text">Permissions</span>
                </Link>
              </Tooltip>
            ) : (
              <Link
                to={"/permissions"}
                className={`${
                  widget.includes(path) === "permissions" ? "mm-active" : ""
                }`}
              >
                <IconMoon color="#8F8F8F" name="lock" size={24} />
                <span className="nav-text">Permissions</span>
              </Link>
            )}{" "}
          </li>
          <li>
            <Link
              to="/simulateurs"
              className={`${
                widget.includes(path) === "simulateurs" ? "mm-active" : ""
              }`}
            >
              <IconMoon color="#8F8F8F" name="affaire" size={24} />

              <span className="nav-text">Simulateurs</span>
            </Link>
          </li>
          <li>
            <Link
              to="/ResourceTuto"
              className={`${
                widget.includes(path) === "partners" ? "mm-active" : ""
              }`}
            >
              <IconMoon color="#8F8F8F" name="resources" size={24} />

              <span className="nav-text">Ressources et Tutos</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Aides"
              className={`${
                widget.includes(path) === "partners" ? "mm-active" : ""
              }`}
            >
              <IconMoon color="#8F8F8F" name="help" size={24} />

              <span className="nav-text">Les Aides</span>
            </Link>
          </li>
          <li>
            <a
              onClick={handleNavigate}
              className={` cursor-pointer${
                widget.includes(path) === "partners" ? "mm-active" : ""
              }`}
            >
              <IconMoon color="#8F8F8F" name="people-holding-hands" size={24} />
              <span className="nav-text">Partenaires</span>
            </a>
          </li>

          <li>
            <Link
              className={`${redux.includes(path) === "faq" ? "mm-active" : ""}`}
              to="/faq"
            >
              <IconMoon name="faq" size={24} />

              <span className="nav-text">FAQ</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Actualite"
              className={`${
                widget.includes(path) === "partners" ? "mm-active" : ""
              }`}
            >
              <IconMoon color="#8F8F8F" name="refresh" size={24} />

              <span className="nav-text">Actualités</span>
            </Link>
          </li>
        </MM>
        <div className="copyright">
          <div className="flex">
            <Link to="/PC">
              <p>Politique de confidentialité / </p>
            </Link>
            <Link to="/CGU">
              <p>CGU</p>
            </Link>
          </div>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
