import React from "react";
import Box from "../../Box/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconMoon from "../../Icon/IconMoon";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
const Financement = () => {
  return (
    <div>
      <Box
        title={"BUSINESS PLAN"}
        color="bg-light-purple"
        iconNameOne={"grid"}
        iconNameTwo={"people"}
        iconColor={"#fff"}
        titleColor={"text-white"}
      />
      <div className="bp-container h-auto pb-6 flex items-center">
        <span className="text-light-purple font-medium text-[1.82rem] mt-5">
          FINANCEMENT & CHARGES
        </span>
        <div className="mx-8 items-center">
          <div>
            <p className="text-[14px] text-slate-600 text-center my-4 mx-4">
              Voici la partie qui concerne le prévisionnel financier et de
              trésorerie de votre Business Plan. Ici encore, vous choisissez
              l'ordre dans lequel vous souhaitez remplir ces informations.
            </p>
          </div>
          <nav aria-label="main mailbox folders" className="mx-3">
            <List className="flex justify-center">
              <Link
                to="chiffre-affaire"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "60%",
                }}
              >
                <ListItem className="bg-light-purple rounded-[20px] my-2 py-3 px-2">
                  <ListItemButton>
                    <ListItemIcon>
                      <IconMoon
                        className="bmc-grid-title-icon"
                        color="#fff"
                        name="affaire"
                        size={24}
                      />
                    </ListItemIcon>
                    <ListItemText
                      className="text-white text-center"
                      primary="CHIFFRE D'AFFAIRES PRÉVISIONNEL"
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </nav>
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
                width: "60%",
              }}
            >
              <Grid item xs={6} className="mx-6">
                <Link to="depenses">
                  <ListItem
                    disablePadding
                    className="bg-light-purple rounded-[20px] my-2 py-3 px-2"
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <IconMoon
                          className="bmc-grid-title-icon"
                          color="#fff"
                          name="money-pile"
                          size={24}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className="text-white text-center"
                        primary="DÉPENSES"
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </Grid>
              <Grid item xs={6} className="mx-6">
                <Link to="charges-personnel">
                  <ListItem
                    disablePadding
                    className="bg-light-purple rounded-[20px] my-2 py-3 px-2"
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <IconMoon
                          className="bmc-grid-title-icon"
                          color="#fff"
                          name="charge"
                          size={24}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className="text-white text-center"
                        primary="CHARGES PERSONNELS"
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </Grid>
              <Grid item xs={6} className="mx-6">
                <Link to="investissement">
                  <ListItem
                    disablePadding
                    className="bg-light-purple rounded-[20px] my-2 py-3 px-2"
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <IconMoon
                          className="bmc-grid-title-icon"
                          color="#fff"
                          name="money-person"
                          size={24}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className="text-white text-center"
                        primary="INVESTISSEMENTS"
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </Grid>
              <Grid item xs={6} className="mx-6">
                <Link to="financements">
                  <ListItem
                    disablePadding
                    className="bg-light-purple rounded-[20px] my-2 py-3 px-2"
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <IconMoon
                          className="bmc-grid-title-icon"
                          color="#fff"
                          name="investment"
                          size={24}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className="text-white text-center"
                        primary="FINANCEMENTS"
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </Grid>
            </Grid>
          </div>
          <div>
            <p className="text-[14px] text-slate-600 text-center my-4 mx-4">
              N'hésitez pas à utiliser ces modules encore et encore pour
              réaliser vos prévisions financières. Nous vous recommandons de
              consulter votre expert comptable pour valider vos éléments
              financiers.
            </p>
          </div>
          <nav aria-label="main mailbox folders" className="mx-4">
            <List className="flex justify-center">
              <Link
                to="synthese-previsionnelle"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "60%",
                }}
              >
                <ListItem
                  disablePadding
                  className="bg-light-purple rounded-[20px] my-2 py-3 px-2"
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <IconMoon
                        className="bmc-grid-title-icon"
                        color="#fff"
                        name="finance"
                        size={24}
                      />
                    </ListItemIcon>
                    <ListItemText
                      className="text-white text-center"
                      primary="SYNTHÈSE PRÉVISIONNELLE"
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </nav>
          <nav aria-label="main mailbox folders" className="mx-4">
            <List className="flex justify-center">
              <Link
                Link
                to="tables-financement"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "60%",
                }}
              >
                <ListItem
                  disablePadding
                  className="bg-light-purple rounded-[20px] my-2 py-3 px-2"
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <IconMoon
                        className="bmc-grid-title-icon"
                        color="#fff"
                        name="table"
                        size={24}
                      />
                    </ListItemIcon>
                    <ListItemText
                      className="text-white text-center"
                      primary="TABLEAUX FINANCIERS"
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Financement;
