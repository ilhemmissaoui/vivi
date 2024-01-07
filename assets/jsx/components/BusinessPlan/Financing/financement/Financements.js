import React, { useState, useEffect } from "react";
import Box from "../../../Box/BoxFinancement";
import classNames from "classnames";
import IconMoon from "../../../Icon/IconMoon";
import { Modal } from "react-bootstrap";
import {
  addFinancementAnnee,
  getAllAnnesFinancement,
} from "../../../../../services/BusinessPlanService";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import ListYearsModal from "../ListYearsModal";

const Financements = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalAnneeLoading, setIsModalAnneeLoading] = useState(false);
  const [selectedYears, setSelectedYears] = useState([]);
  const [showListeAnne, setShowListeAnne] = useState(false);
  const [showinput, setShowinput] = useState(false);
  const [listInvest, setListInvest] = useState([]);
  const [addAnneInvest, setAddAnneeInvest] = useState("");
  const [showAddAnneeModal, setShowAddAnneeModal] = useState(false);

  const handleCloseListeAnne = () => {
    setShowListeAnne(false);
  };

  const handleOpenListeAnne = () => {
    setShowListeAnne(true);
  };

  const handleCloseAddAnneeModal = () => {
    setShowAddAnneeModal(false);
  };
  const handleOpenAddAnneeModal = () => {
    setShowAddAnneeModal(true);
  };
  const selectedProject = localStorage.getItem("selectedProjectId");

  const handleAddAnneeInvest = async () => {
    setIsModalAnneeLoading(true);
    const response = await addFinancementAnnee(selectedProject, {
      anneeProjet: addAnneInvest,
    });
    setIsModalAnneeLoading(false);
    setShowAddAnneeModal(false);
    await listAnnesInvestQuery();
    handleCloseListeAnne();
  };

  const listAnnesInvestQuery = async () => {
    try {
      setIsLoading(true);
      const response = await getAllAnnesFinancement(selectedProject);
      if (response.status == 200) {
        setListInvest(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getTotalMontant = (annee) => {
    const totalEnc = getTotalMontantEnc(annee);
    const totalDec = getTotalMontantDec(annee);

    return totalEnc - totalDec;
  };

  useEffect(() => {
    listAnnesInvestQuery();
  }, [selectedProject]);
  const getTotalMontantEnc = (annee) => {
    let sum = 0;

    if (annee && annee.listeEncaisseDecaissement) {
      annee.listeEncaisseDecaissement.forEach((el) => {
        if (el.type === "encaissement") {
          sum += el.sumEncaisseDecaissement;
        }
      });
    }

    return sum;
  };
  const getTotalMontantDec = (annee) => {
    let sum = 0;

    if (annee && annee.listeEncaisseDecaissement) {
      annee.listeEncaisseDecaissement.forEach((el) => {
        if (el.type === "decaissement") {
          sum += el.sumEncaisseDecaissement;
        }
      });
    }

    return sum;
  };

  function checkYearInMontantAnneeListeDepenses(year) {
    return listInvest.lietsFinancementEncaisseDecaissement?.some(
      (item) =>
        item.AnneeName.trim().toLowerCase() ===
        year.AnneeName.trim().toLowerCase()
    );
  }
  return (
    <>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container pb-32">
        <div className="mx-5 mb-3 flex items-center ">
          <div className="flex-grow">
            <Box
              title={"FINANCEMENT & CHARGES"}
              color={"bg-light-purple"}
              iconNameOne={"grid"}
              iconNameTwo={"charge"}
              iconColor={"#fff"}
              titleColor={"text-white"}
            ></Box>
          </div>
          <div className="flex items-center mx-1">
            <div className="p-2 bg-light-purple  rounded-full">
              <IconMoon color={"#fff"} name={"i"} size={25} />
            </div>
          </div>
        </div>
        <div className="w-full text-center -mt-5 ">
          <span className="font-bold text-lg">FINANCEMENTS</span>
        </div>
        {isLoading ? (
          <div className="loader m-5">
            <Spinner
              animation="border"
              role="status"
              size="md"
              currentcolor="#E73248"
            />
          </div>
        ) : (
          <>
            <div
              className="h-700 mt-10 mx-auto border-2 rounded p-8"
              style={{ width: "80%" }}
            >
              <div
                className="overflow-y-scroll"
                style={{ maxHeight: "600px", height: "93%" }}
              >
                {listInvest.lietsFinancementEncaisseDecaissement?.length ==
                0 ? (
                  <div className="text-center font-bold">
                    Financements introuvables
                  </div>
                ) : (
                  <>
                    {listInvest.lietsFinancementEncaisseDecaissement?.map(
                      (annes, index) => (
                        <div className="py-2 px-5">
                          <div className="flex">
                            <div
                              className=""
                              style={{
                                marginRight: "16px",
                                paddingTop: "11px",
                              }}
                            >
                              <h4 className="font-bold">{annes.AnneeName}</h4>
                            </div>
                            {/* <button
                              className="mr-2"
                              onClick={() =>
                                handleOpenEditModal(
                                  annes.idAnnee,
                                  annes.AnneeName
                                )
                              }
                            >
                              <IconMoon
                                color="#707070"
                                name="edit-input1"
                                size={22}
                              />
                            </button> */}
                          </div>
                          <div>
                            <table className="w-full border-collapse  border-gray-300 rounded-lg">
                              <thead>
                                <tr>
                                  <th className="px-6 py-3 text-center text-sm leading-4 font-bold border uppercase">
                                    TYPE
                                  </th>
                                  <th className="px-6 py-3 text-center text-sm leading-4 font-bold border uppercase">
                                    REVENU
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="flex justify-between px-6 py-2 text-sm text-center leading-5 border text-gray-500   ">
                                    <div className="justify-content-start ">
                                      {" "}
                                      Encaissements
                                    </div>

                                    <Link
                                      to={{
                                        pathname: `/financements/encaissement/${annes.idAnnee}`,
                                        state: {
                                          annesAnneeName: annes.AnneeName,
                                          anneeId: annes.idAnnee,
                                        },
                                      }}
                                    >
                                      <IconMoon
                                        color="#707070"
                                        name="edit-input1"
                                        size={20}
                                      />
                                    </Link>
                                  </td>
                                  <td className="px-6 py-2 text-sm text-center leading-5 border text-gray-500 ">
                                    <div className="text-center w-full">
                                      {getTotalMontantEnc(annes)}€
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td className="flex justify-between px-6 py-2 text-sm text-center leading-5 border text-gray-500   ">
                                    <div className="justify-content-start ">
                                      Décaissements
                                    </div>
                                    <Link
                                      to={{
                                        pathname: `/financements/decaissement/${annes.idAnnee}`,
                                        state: {
                                          annesAnneeName: annes.AnneeName,
                                          anneeId: annes.idAnnee,
                                        },
                                      }}
                                    >
                                      <IconMoon
                                        color="#707070"
                                        name="edit-input1"
                                        size={20}
                                      />
                                    </Link>
                                  </td>
                                  <td className="px-6 py-2 text-sm text-center leading-5 border text-gray-500 ">
                                    <div className="text-center w-full">
                                      {getTotalMontantDec(annes)}€
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td></td>
                                  <td className="px-0 py-1 text-sm leading-5 font-medium text-gray-500">
                                    <div className="w-full p-2 rounded-md flex justify-between bg-gray-300 text-black font-bold">
                                      <div className="px-3">TOTAL</div>
                                      <div className="px-3">
                                        {getTotalMontant(annes)} €
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
        <div className="flex justify-center" style={{ padding: "15px" }}>
          <button
            className="ml-6 bg-light-purple hover:bg-light-purple text-white font-bold py-2 px-4 rounded"
            disabled={isLoading}
            onClick={handleOpenListeAnne}
          >
            Ajouter une année
          </button>
        </div>
      </div>

      <Modal
        size="sm"
        show={showListeAnne}
        onHide={handleCloseListeAnne}
        dialogClassName="modal-sm"
        centered
      >
        <div className="modal-content">
          <form>
            <Modal.Header closeButton>
              <div className="text-center w-full">
                <h4 style={{ color: "#514495" }}>Liste des années</h4>
              </div>
            </Modal.Header>
            <div className="flex flex-col items-center justify-center p-2">
              <ListYearsModal
                year={listInvest}
                selectedYears={selectedYears}
                setSelectedYears={setSelectedYears}
                checkYearInMontantAnneeListeDepenses={
                  checkYearInMontantAnneeListeDepenses
                }
              />
              <div className="form-group">
                <button
                  className="p-2 bg-color: #959494 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowinput(!showinput);
                  }}
                >
                  <IconMoon color="#514495" name="plus1" size={30} />
                </button>
              </div>
              {showinput && (
                <div className="mx-6 py-4">
                  <label className="text-black font-w500">
                    Entrer la nouvelle année
                  </label>
                  <div className="contact-name">
                    <input
                      onChange={(e) => setAddAnneeInvest(e.target.value)}
                      id="name"
                      type="number"
                      className="form-group w-full rounded-xl p-2"
                      value={addAnneInvest}
                      min={new Date().getFullYear()}
                      max={2100}
                      step={1}
                      placeholder="2023"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <div className="text-center w-100">
                <button
                  type="button"
                  className="bg-light-purple text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center"
                  onClick={async () => {
                    if (selectedYears.length > 0) {
                      // Handle "Valider selected" functionality
                      for (const year of selectedYears) {
                        const response = await addFinancementAnnee(
                          selectedProject,
                          {
                            anneeProjet: year,
                          }
                        );
                      }
                    } else {
                      // Handle "Valider" functionality
                      handleAddAnneeInvest();
                    }

                    await listAnnesInvestQuery();
                    handleCloseListeAnne();
                    setShowinput(false);
                    setAddAnneeInvest("");
                  }}
                  disabled={selectedYears.length === 0 && !addAnneInvest}
                >
                  Valider
                </button>

                <div style={{ padding: "8px" }}></div>
                {/*  <button
                  onClick={() => {
                    handleOpenAddAnneeModal();
                    handleCloseListeAnne();
                  }}
                  type="button"
                  className="bg-[#514495] text-white font-bold py-2 px-4 rounded"
                  style={{ width: "100%", maxWidth: "200px" }}
                >
                  Ajouter une Année
                </button> */}
              </div>
            </div>
          </form>
        </div>
      </Modal>

      {/* <Modal
        show={showAddAnneeModal}
        onHide={() => {
          handleCloseAddAnneeModal();
        }}
        dialogClassName="modal-md"
        centered
      >
        <div className="modal-content">
          <form>
            <div className="py-5 text-center">
              <h4 className="font-bold" style={{ color: "#514495" }}>
                AJOUTER UNE ANNEE
              </h4>
            </div>

            <div className="modal-body -mt-10">
              <div className="form-group mb-3">
                <label
                  for="duree"
                  className="text-black font-bold text-center flex items-center justify-center"
                >
                  Année
                </label>
                <input
                  onChange={(e) => setAddAnneeInvest(e.target.value)}
                  id="name"
                  type="text"
                  class="bg-gray-50 text-gray-900 text-sm rounded-md focus:ring-[#514495] focus:border-[#514495] block w-full py-2.5 px-4 pr-8"
                  style={{ border: "1px solid #c7c7c7" }}
                />
              </div>
            </div>
            {isModalAnneeLoading ? (
              <div className="loader m-2">
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  currentcolor="#E73248"
                />
              </div>
            ) : null}

            <div className="modal-footer">
              <div className="text-center w-100">
                <button
                  type="button"
                  onClick={handleAddAnneeInvest}
                  className="bg-light-purple text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center"
                >
                  Valider
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal> */}
    </>
  );
};

export default Financements;
