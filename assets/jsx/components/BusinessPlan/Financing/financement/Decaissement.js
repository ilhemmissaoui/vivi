import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExternalChargeMontantAction } from "../../../../../store/actions/BusinessPlanActions";
import { useParams, useLocation } from "react-router-dom";

import { getAllExternalChargesSelector } from "../../../../../store/selectors/BusinessPlanSelectors";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
} from "@material-ui/core";
import { Modal } from "react-bootstrap";

import Box from "../../../Box/BoxFinancement";
import IconMoon from "../../../Icon/IconMoon";
import ProgressLinear from "../../../ProgressLinear/ProgressLinear";
import {
  addDcaissementQuery,
  deleteEncaissement,
  getDecaissement,
} from "../../../../../services/BusinessPlanService";
import FinancementModalDecaissement from "./FinancementModalDecaissement";

const Decaissement = () => {
  const { idAnnee } = useParams();
  const location = useLocation();
  const { annesAnneeName, anneeId } = location.state;
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [names, setNames] = useState("");
  const [showChargeExterneModal, setShowChargeExterneModal] = useState(false);
  const [cellsValue, setCellsValue] = useState({
    idEncaissement: "",
    idMontant: "",
  });

  const [activityValidationMessage, setActivityValidationMessage] =
    useState("");

  const dispatch = useDispatch();
  const allData = useSelector(getAllExternalChargesSelector);

  const [listEncaissement, setListEncaissement] = useState([]);
  const selectedProject = localStorage.getItem("selectedProjectId");
  const listEncaissements = async () => {
    try {
      const response = await getDecaissement(selectedProject, anneeId);
      if (response.status == 200) {
        setListEncaissement(response.data.listeEncaisseDecaissement);
      }
    } catch (error) {}
  };
  useEffect(() => {
    listEncaissements();
  }, []);
  const valuerList = listEncaissement?.map((e) => e?.MonthListeValue);
  const handleCloseAddActivityModal = () => {
    setShowAddActivityModal(false);
  };
  const handleOpenAddActivityModal = () => {
    setShowAddActivityModal(true);
  };

  const handleAddActivityClick = async () => {
    const newEncaissement = {
      name: names,
    };

    const response = await addDcaissementQuery(
      selectedProject,
      anneeId,
      newEncaissement
    );
    setNames("");
    setShowAddActivityModal(false);
    setActivityValidationMessage("");
    setListEncaissement([...listEncaissement, newEncaissement]);

    await listEncaissements();
  };

  const handleOpenChargeExterneModal = (idMontant) => {
    setCellsValue({ idMontant });

    setShowChargeExterneModal(true);
  };

  const handleCloseChargeExterneModal = () => {
    setShowChargeExterneModal(false);
  };

  const handleDeleteOneCharge = async (idEncaissement) => {
    const charge = listEncaissement.find(
      (encaiss) => encaiss.EncaisseDecaissementId === idEncaissement
    );
    if (charge) {
      await deleteEncaissement(selectedProject, idEncaissement);
    }
    await listEncaissements();
  };

  const renderValeur = (idEncaissement) => {
    let test = valuerList?.find((x) => x.idMontheListe == idEncaissement);
    if (test) {
      return test.AllMonthValue;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container h-auto pb-5">
        <div className="mx-5 mb-15 flex items-center">
          <div className="flex-grow">
            <Box
              title={"FINANCEMENT & CHARGES"}
              color="bg-light-purple"
              iconNameOne={"grid"}
              iconNameTwo={"charge"}
              iconColor={"#FDD691"}
              titleColor={"text-white"}
            />
          </div>
          <div className="flex items-center mx-1">
            <div className="p-2 bg-light-purple bg-opacity-50 rounded-full">
              <IconMoon color={"white"} name={"i"} size={25} />
            </div>
          </div>
        </div>
        <ProgressLinear progress={20} color="#514495" />
        <div className="mx-5">
          <div className="flex justify-center items-center">
            <span className="my-4 font-medium text-[21px]">FINANCEMENTS</span>
          </div>
          <div className="mb-[18px]">
            <div style={{ display: "flex" }}>
              <TableContainer component={Paper}>
                <Table style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          textAlign: "left",
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "17px",
                          fontWeight: "bold",
                          paddingLeft: "45px",
                        }}
                      >
                        DECAISSEMENT
                      </TableCell>

                      <TableCell
                        key={idAnnee}
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          textAlign: "center",
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <div style={{ width: "55%" }}>{annesAnneeName}</div>
                          <button
                            onClick={() => handleOpenChargeExterneModal()}
                          >
                            <IconMoon
                              color="rgba(112, 112, 112, 0.5)"
                              name="edit-input1"
                              size={22}
                            />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {listEncaissement?.map((encaiss) => (
                      <TableRow key={encaiss.EncaisseDecaissementId}>
                        <TableCell>
                          <div style={{ display: "flex" }}>
                            <div
                              style={{
                                width: "25%",
                                fontFamily: "Roboto",
                                fontSize: "17px",
                                opacity: 0.4,
                                paddingLeft: "27px",
                              }}
                            >
                              {encaiss.EncaisseDecaissementName}
                            </div>
                            <div style={{ flex: "1" }}></div>

                            <div
                              style={{
                                width: "7%",
                                marginBottom: "-6px",
                                marginTop: "-5px",
                              }}
                            >
                              <button
                                className="p-2 bg-color: #959494 text-white font-bold opacity-50"
                                onClick={() =>
                                  handleDeleteOneCharge(
                                    encaiss.EncaisseDecaissementId
                                  )
                                }
                              >
                                <IconMoon
                                  color="rgba(112, 112, 112, 0.1)"
                                  name="trash"
                                  size={20}
                                />
                              </button>
                            </div>
                          </div>
                        </TableCell>
                        {/* Updated mapping over allMontantAnnee */}

                        <TableCell
                          style={{
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "17px",
                            fontWeight: "bold",
                          }}
                        >
                          <div>{encaiss.sumEncaisseDecaissement || 0}</div>
                          {/* ...cell content for each column */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableFooter>
                    <TableRow>
                      <TableCell
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          backgroundColor: "#edf1f9",
                          textAlign: "left",
                          fontSize: "17px",
                          fontFamily: "Roboto",
                          paddingLeft: "40px",
                        }}
                      >
                        TOTAL
                      </TableCell>
                      <TableCell
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          backgroundColor: "#edf1f9",
                          textAlign: "center",
                          fontFamily: "Roboto",
                          fontSize: "17px",
                          paddingLeft: "10px",
                        }}
                      >
                        {/* {listEncaissement?.listeEncaisseDecaissement?.reduce(
                          (sum, charge) =>
                            sum + renderValeur(encaiss.EncaisseDecaissementId, charge.id),
                          0
                        )} */}
                        €
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
        <div className="flex items-start mt-3 ml-7">
          <button
            type="button"
            className="ml-6 bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 rounded focus:outline-none"
            style={{ backgroundColor: "#514495" }}
            onClick={handleOpenAddActivityModal}
          >
            Ajouter un décaissement
          </button>
        </div>
      </div>

      <FinancementModalDecaissement
        show={showChargeExterneModal}
        onClose={handleCloseChargeExterneModal}
        handleOpenConfirmationModal={() => setShowChargeExterneModal(true)}
        cellsValue={cellsValue}
        anneeId={anneeId}
        listEncaissement={listEncaissement}
        listData={listEncaissements}
        valuerList={valuerList}
      />

      <Modal
        show={showAddActivityModal}
        onHide={() => {
          handleCloseAddActivityModal();
          setActivityValidationMessage("");
        }}
        dialogClassName="modal-lg"
        centered
      >
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <div className="text-center w-100">
                <h4
                  className="uppercase fs-26 font-bold"
                  style={{ color: "#514495" }}
                >
                  Ajouter un décaissement
                </h4>
              </div>
            </div>

            <div className="modal-body">
              <div className="form-group mb-3 w-[80%]">
                <label className="text-black text-base text-center flex items-center justify-center font-semibold">
                  Nom de décaissement
                </label>
                <div className="contact-name">
                  <input
                    type="text"
                    className="mt-4 block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                    autoComplete="off"
                    name="name"
                    required="required"
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                    placeholder="décaissement"
                  />
                  {activityValidationMessage && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#ff5555",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontSize: "14px",
                      }}
                    >
                      {activityValidationMessage}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <div className="text-center w-100">
                <button
                  type="button"
                  onClick={handleAddActivityClick}
                  className="bg-[#514495] text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center"
                >
                  Valider
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
export default Decaissement;
