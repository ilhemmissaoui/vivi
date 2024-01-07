import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../components/Box/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconMoon from "../components/Icon/IconMoon";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import image from "../../images/logo-les-aides.svg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const Simulateur = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSimulator, setSelectedSimulator] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const [iframeId, setIframeId] = useState("");
  const [iframeTitle, setIframeTitle] = useState("");

  const openModal = (simulator) => {
    const selectedSimulatorData = simulateursData.find(
      (data) => data.name === simulator
    );
    if (selectedSimulatorData) {
      setSelectedSimulator(simulator);
      setIframeSrc(selectedSimulatorData.src);
      setIframeId(selectedSimulatorData.id);
      setIframeTitle(selectedSimulatorData.name);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setSelectedSimulator("");
    setIframeSrc("");
    setIframeId("");
    setIframeTitle("");
    setShowModal(false);
  };

  const simulateursData = [
    {
      id: 1,
      name: "SASU",
      src: "https://mon-entreprise.urssaf.fr/simulateurs/sasu",
    },
    {
      id: 2,
      name: "EIRL",
      src: "https://mon-entreprise.urssaf.fr/simulateurs/eirl",
    },
    {
      id: 3,
      name: "EURL",
      src: "https://mon-entreprise.urssaf.fr/simulateurs/eurl",
    },
    {
      id: 4,
      name: "Coût Salarié",
      src: "https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net",
    },
    {
      id: 5,
      name: "Expert-comptable",
      src: "https://mon-entreprise.urssaf.fr/simulateurs/profession-liberale/expert-comptable",
    },
    {
      id: 6,
      name: "Auto-entrepreneur",
      src: "https://mon-entreprise.urssaf.fr/simulateurs/auto-entrepreneur",
    },
    {
      id: 7,
      name: "Entreprise individuelle (EI)",
      src: "https://mon-entreprise.urssaf.fr/simulateurs/entreprise-individuelle",
    },
    {
      id: 8,
      name: "Impôt sur les sociétés",
      src: "https://mon-entreprise.urssaf.fr/simulateurs/impot-societe",
    },
    {
      id: 9,
      name: "Charges sociales déductibles",
      src: "https://mon-entreprise.urssaf.fr/assistants/declaration-charges-sociales-independant",
    },
    // Add more simulator data as needed
  ];

  return (
    <div>
      <Box title={"Simulateurs"} />

      <div className="bp-container h-auto pb-4 flex items-center">
        <div className="flex justify-around pt-4">
          <img className=" w-1/4 align-middle" src={image} alt="bmc-step-img" />
        </div>

        <div className="text-[14px] text-slate-600 mx-auto text-center w-3/4 my-4">
          Choisissez l'outil correspondant à votre besoin, que ce soit pour
          estimer les charges sociales, les cotisations, ou les coûts salariaux.{" "}
          <br />
          Remplissez les informations requises, telles que le salaire brut, les
          avantages en nature, et d'autres éléments pertinents. Le simulateur
          choisi vous fournira alors une estimation précise des coûts associés.
        </div>
        <div className="mx-8 items-center">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <Grid
              container
              spacing={2}
              style={{
                width: "80%",
              }}
            >
              {simulateursData.map((simulator) => (
                <Grid item xs={4} className="mx-6" key={simulator.id}>
                  <ListItem
                    disablePadding
                    className="bg-blue-900 rounded-[20px] my-2 py-3 px-2"
                    onClick={() => openModal(simulator.name)}
                  >
                    <ListItemButton>
                      <ListItemText
                        className="text-white text-center"
                        primary={simulator.name}
                      />
                    </ListItemButton>
                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
      <Modal show={showModal} size="lg" centered onHide={closeModal}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            id={iframeId}
            src={iframeSrc}
            style={{
              border: "none",
              width: "100%",
              display: "block",
              overflowY: "scroll",
              height: 600,
            }}
            allow="clipboard-write"
            allowFullScreen="true"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            title={iframeTitle}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={closeModal}
            type="button"
            class="text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center bg-light-orange hover:bg-black"
          >
            Fermer
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Simulateur;
