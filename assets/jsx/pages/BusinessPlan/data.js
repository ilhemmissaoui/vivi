import { useSelector } from "react-redux";
import { getSelectedProject } from "../../../store/selectors/ProjectSelectors";
import React, { useState, useEffect } from "react";
import { getAvancement } from "../../../services/ProjetService";

const CardData = () => {
  const [avancement, setAvancement] = useState({});
  const selectedProject = useSelector(getSelectedProject);
  const selectedProjectt = localStorage.getItem("selectedProjectId");

  const permissionTab = Object.keys(selectedProject);

  const fetchAvancements = async () => {
    try {
      const avancements = await getAvancement(selectedProjectt);
      setAvancement(avancements?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAvancements();
  }, [selectedProjectt]);
  const permissionList = permissionTab.includes("permissionListe")
    ? selectedProject.permissionListe
    : false;
  const verifyTab =
    selectedProject?.permissionListe?.length === 0 ? true : false;

  const cardData = [
    {
      date: avancement?.dateCreation,
      month: avancement?.month,

      avancement:
        avancement && avancement?.histoireEtEquipe
          ? avancement?.histoireEtEquipe
          : 0,
      ProgressColor: "#f4b25f",
      id: 1,
      title: "HISTOIRE ET ÉQUIPE",
      colorText: "text-light-orange",
      colorbadge: "bg-light-orange",
      progressBar: "bg-light-orange",
      icon: "people-2",
      backGround:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("histpoire_equipe") &&
          !verifyTab)
          ? "bg-white"
          : "bg-gray-100",
      bgColor: "bg-light-orange",
      border: "border-light-orange",
      path:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("histpoire_equipe") &&
          !verifyTab)
          ? "history"
          : "business-plan",
      disabled:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("histpoire_equipe") &&
          !verifyTab)
          ? ""
          : "disabled cursor-not-allowed",
    },
    {
      date: avancement?.dateCreation,
      month: avancement?.month,
      avancement:
        avancement && avancement?.MarcheEtConcurrence
          ? avancement?.MarcheEtConcurrence
          : 0,
      ProgressColor: "#352853",
      id: 2,
      title: "MARCHÉ ET CONCURRENCE",
      colorText: "text-dark-purple",
      colorbadge: "bg-dark-purple",
      progressBar: "bg-dark-purple",
      icon: "go-up",
      bgColor: "bg-dark-purple",
      backGround:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("marche_concurrence") &&
          !verifyTab)
          ? "bg-white"
          : "bg-gray-100",

      border: "border-dark-purple",
      path:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("marche_concurrence") &&
          !verifyTab)
          ? "market-competition"
          : "business-plan",
      disabled:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("marche_concurrence") &&
          !verifyTab)
          ? ""
          : "disabled cursor-not-allowed",
    },
    {
      date: avancement?.dateCreation,
      month: avancement?.month,
      avancement:
        avancement && avancement?.NotreSolution ? avancement?.NotreSolution : 0,
      ProgressColor: "#fdd691",
      id: 3,
      title: "NOTRE SOLUTION",
      colorText: "text-banana",
      colorbadge: "bg-banana",
      progressBar: "bg-banana",
      icon: "idea",
      bgColor: "bg-banana",
      border: "border-banana",
      backGround:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("notre_solution") &&
          !verifyTab)
          ? "bg-white"
          : "bg-gray-100",
      path:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("notre_solution") &&
          !verifyTab)
          ? "annees"
          : "business-plan",
      disabled:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("notre_solution") &&
          !verifyTab)
          ? ""
          : "disabled cursor-not-allowed",
    },
    {
      date: avancement?.dateCreation,
      month: avancement?.month,
      avancement:
        avancement && avancement?.PositionnementConcurrentiel
          ? avancement?.PositionnementConcurrentiel
          : 0,
      ProgressColor: "#f7d44b",
      id: 4,
      title: "POSITIONNEMENT CONCURRENTIEL",
      colorText: "text-yellow",
      colorbadge: "bg-yellow",
      progressBar: "bg-yellow",
      icon: "podium",
      bgColor: "bg-yellow",
      border: "border-yellow",
      backGround:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes(
            "positionnement_concurrentiel"
          ) &&
          !verifyTab)
          ? "bg-white"
          : "bg-gray-100",
      path:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes(
            "positionnement_concurrentiel"
          ) &&
          !verifyTab)
          ? "positionnement"
          : "business-plan",
      disabled:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes(
            "positionnement_concurrentiel"
          ) &&
          !verifyTab)
          ? ""
          : "disabled cursor-not-allowed",
    },
    {
      date: avancement?.dateCreation,
      month: avancement?.month,
      avancement:
        avancement && avancement?.visionStrategiesForBusinessPlan
          ? avancement?.visionStrategiesForBusinessPlan
          : 0,
      ProgressColor: "#fc2e53",
      id: 5,
      title: "VISION & STRATÉGIE",
      colorText: "text-dark-red",
      colorbadge: "bg-dark-red",
      progressBar: "bg-dark-red",
      icon: "strategy",
      bgColor: "bg-dark-red",
      border: "border-dark-red",
      backGround:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("vision_strategie") &&
          !verifyTab)
          ? "bg-white"
          : "bg-gray-100",
      path:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("vision_strategie") &&
          !verifyTab)
          ? "vision-strategie"
          : "business-plan",
      disabled:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("vision_strategie") &&
          !verifyTab)
          ? ""
          : "disabled cursor-not-allowed",
    },
    {
      date: avancement?.dateCreation,
      month: avancement?.month,
      avancement:
        avancement && avancement?.FinancementEtCharges
          ? avancement?.FinancementEtCharges
          : 0,
      ProgressColor: "#514495",
      id: 6,
      title: "FINANCEMENT & CHARGES",
      colorText: "text-light-purple",
      colorbadge: "bg-light-purple",
      progressBar: "bg-light-purple",
      icon: "charge",
      bgColor: "bg-light-purple",
      border: "border-light-purple",
      backGround:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("financement_charge") &&
          !verifyTab)
          ? "bg-white"
          : "bg-gray-100",
      path:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("financement_charge") &&
          !verifyTab)
          ? "financement"
          : "business-plan",
      disabled:
        !permissionList ||
        (permissionList &&
          selectedProject?.permissionListe?.includes("financement_charge") &&
          !verifyTab)
          ? ""
          : "disabled cursor-not-allowed",
    },
  ];

  return cardData;
};

export default CardData;
