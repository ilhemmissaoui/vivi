import React, { useContext } from "react";

/// React router dom
import { Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";

/// Dashboard
import Home from "./pages/Home";

/// Pages
import Error404 from "./pages/Error404";
import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";
import Profile from "./pages/Profile";
import News from "./pages/News";
import Project from "./pages/Project";
import Partner from "./pages/Partner";

import BusinessModelResult from "./components/businessModel/BusinessModelResult";
import Collaborator from "./pages/Collaborator";
import ListPartner from "./pages/ListPartner";
import BusinessModel from "./pages/BusinessModel/BusinessModel";
import BusinessPlan from "./pages/BusinessPlan/BusinessPlan";
import PartnerDetails from "./pages/PartnerDetails";
import History from "./components/BusinessPlan/History/History";
import Positioning from "./components/BusinessPlan/Positioning/Positioning";
import Solution from "./components/BusinessPlan/Solution/Solution";
import Concurrence from "./components/BusinessPlan/Concurrence/Concurrence";
import MembersHistory from "./components/BusinessPlan/History/MembersHistory";
import HistoryAll from "./components/BusinessPlan/History/HistoryAllSteps/HistoryAll";
import PartnerHistory from "./components/BusinessPlan/History/HistoryAllSteps/PartnerHistory";
import TargetHistory from "./components/BusinessPlan/History/HistoryAllSteps/TargetHistory";
import SectorHistory from "./components/BusinessPlan/History/HistoryAllSteps/SectorHistory";
import TrendHistory from "./components/BusinessPlan/History/HistoryAllSteps/TrendHistory";
import Societies from "./components/BusinessPlan/Concurrence/Societies";
import Society from "./components/BusinessPlan/Concurrence/Society";
import AddSolution from "./components/BusinessPlan/Solution/AddSolution";
import EditSolution from "./components/BusinessPlan/Solution/EditSolution";

import PositioningTwo from "./components/BusinessPlan/Positioning/PositioningTwo";
import VisionStrategy from "./components/BusinessPlan/VisionStrategy/VisionStrategy";
import VisionStrategyUpdated from "./components/BusinessPlan/VisionStrategy/V2/VisionStrategyUpdated";
import PositioningThree from "./components/BusinessPlan/Positioning/PositioningThree";
import YearsSolution from "./components/BusinessPlan/Solution/YearsSolution";
import AddYear from "./components/BusinessPlan/Solution/AddYear";
import ExternalCharges from "./components/BusinessPlan/Financing/ExternalCharges/ExternalCharges";
import ChiffreAffaire from "./components/BusinessPlan/Financing/ChiffreAffaire/ChiffreAffaire";
import Financement from "./components/BusinessPlan/Financing/Financement";
import FinancingTables from "./components/BusinessPlan/Financing/FinancingTables/FinancingTables";
import Investment from "./components/BusinessPlan/Financing/Investment/Investment";
import Financements from "./components/BusinessPlan/Financing/financement/Financements";

import PersonnalCharges from "./components/BusinessPlan/Financing/PersonnalCharges/PersonnalCharges";
import SynthesePrev from "./components/BusinessPlan/Financing/Synthese/SynthesePrev";
import FAQ from "./pages/FAQ";
import UpdateSociety from "./components/BusinessPlan/Concurrence/UpdateSociety";
import CGU from "./pages/CGU";
import PC from "./pages/PC";
import ResourceTuto from "./pages/ResourceTuto";
import Actualite from "./pages/Actualite";
import Aides from "./pages/Aides";
import Encaissement from "./components/BusinessPlan/Financing/financement/Encaissement";
import Decaissement from "./components/BusinessPlan/Financing/financement/Decaissement";
import ListYearsModal from "./components/BusinessPlan/Financing/ListYearsModal";
import Acces from "./pages/Acces";
import Simulateur from "./pages/Simulateur";
// import Acces from "./pages/Acces";

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    /// Dashboard
    { url: "", component: Home },
    { url: "dashboard", component: Home },
    { url: "business-plan", component: BusinessPlan },
    { url: "project", component: Project },
    { url: "CGU", component: CGU },
    { url: "PC", component: PC },
    { url: "ResourceTuto", component: ResourceTuto },
    { url: "Aides", component: Aides },
    { url: "permissions", component: Acces },
    { url: "simulateurs", component: Simulateur },
    // { url: "collaborator", component: Collaborator },
    { url: "Actualite", component: Actualite },
    { url: "history", component: History },
    { url: "history/members", component: MembersHistory },

    { url: "history/partner", component: PartnerHistory },
    { url: "history/targets", component: TargetHistory },
    { url: "history/presentation", component: TargetHistory },
    { url: "history/sectors", component: SectorHistory },
    { url: "history/trends", component: TrendHistory },

    { url: "market-competition", component: Concurrence },

    { url: "market-competition/societies", component: Societies },
    { url: "market-competition/societies/add", component: Society },
    {
      url: "market-competition/societies/update-society/:id",
      component: UpdateSociety,
    },
    ,
    { url: "solution", component: Solution },
    { url: "annees", component: YearsSolution },
    { url: "ajouter-annee", component: AddYear },

    { url: "add-solution", component: AddSolution },
    { url: "edit-Solution/:id", component: EditSolution },

    { url: "positionnement", component: Positioning },
    { url: "positionnement/positionnement_two", component: PositioningTwo },
    {
      url: "positionnement/positionnement_two/positionnement_three",
      component: PositioningThree,
    },
    { url: "financement", component: Financement },

    // { url: 'vision-strategie', component: VisionStrategy },
    { url: "vision-strategie", component: VisionStrategyUpdated },
    { url: "chiffre-affaire", component: ChiffreAffaire },
    { url: "charges-externes", component: ExternalCharges },

    { url: "history/history-all", component: HistoryAll },

    { url: "partners", component: ListPartner },
    { url: "faq", component: FAQ },

    { url: "depenses", component: ExternalCharges },
    { url: "tables-financement", component: FinancingTables },
    { url: "investissement", component: Investment },
    { url: "financements", component: Financements },
    { url: "financements/encaissement/:id", component: Encaissement },
    { url: "financements/decaissement/:id", component: Decaissement },

    { url: "ListYearsModal", component: ListYearsModal },

    { url: "charges-personnel", component: PersonnalCharges },
    { url: "synthese-previsionnelle", component: SynthesePrev },

    { url: "business-model", component: BusinessModel },
    { url: "business-model-result", component: BusinessModelResult },

    { url: "news-page", component: News },
    /// Account
    { url: "app-profile", component: Profile },
    { url: "create-partner", component: Partner },
    { url: "partner_details/:id", component: PartnerDetails },
    /// pages

    { url: "page-error-404", component: Error404 },
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>

        {!pagePath && <Footer />}
      </div>

      <Setting />
    </>
  );
};

export default Markup;
