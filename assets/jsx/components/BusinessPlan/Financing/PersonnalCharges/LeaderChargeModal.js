import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import { Spinner } from "react-bootstrap";
import {
  addDirigeantMember,
  addSalarieMemberDirigeants,
  getAllSocialChargeDirigeant,
  getAllSocialChargeDirigent,
} from "../../../../../services/BusinessPlanService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import {
  addDirigeantAction,
  clearErrAction,
} from "../../../../../store/actions/BusinessPlanActions";
import { useDispatch, useSelector } from "react-redux";
const LeaderChargeModal = ({
  members,
  show,
  onHide,
  anneeId,
  name,
  setIsLoading,
  setYear,
}) => {
  const dispatch = useDispatch();

  const [pourcentageParticipationCapital, setpourcentageParticipationCapital] =
    useState([]);
  const [reparationRenumeratinAnnee, setreparationRenumeratinAnnee] = useState(
    []
  );
  const [beneficier, setbeneficier] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [invitationMail, setInvitationMail] = useState(false);
  const [dirigeants, setDirigeants] = useState([]);
  const [test, setTest] = useState();

  const [employeeEmp, setEmployeeEmp] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const [showSecondModal, setShowSecondModal] = useState(false);
  var err = useSelector((state) => state.bp.err);
  useEffect(() => {
    if (!show) {
      dispatch(clearErrAction());
    }
  }, [show, dispatch]);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const selectedProject = localStorage.getItem("selectedProjectId");
  // useEffect(() => {}, [members]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDirigeantId = selectedMembers;
    const dirigeantPostData = {
      dirigeant: selectedDirigeantId,

      newDirigeant: {
        firstename: firstName,
        lastename: lastName,
        email,
        invitation: invitationMail,
      },
    };
    setDirigeants([...dirigeants, dirigeantPostData]);
    setSelectedMembers([]);
    try {
      const response = await dispatch(
        addDirigeantAction(selectedProject, anneeId, dirigeantPostData)
      );

      setLoading(true);
      if (response.data && response.data.newDirigeant) {
        setEmployeeEmp(response.data.newDirigeant);
        setpourcentageParticipationCapital(
          Array(response.data.newDirigeant.length).fill(0)
        );
        setreparationRenumeratinAnnee(
          Array(response.data.newDirigeant.length).fill(0)
        );
        setbeneficier(Array(response.data.newDirigeant.length).fill(0));
      }
      setLoading(false);
      setShowSecondModal(true);
      onHide();
    } catch (error) {
      setShowSecondModal(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      console.error("Error:", error);
    }
  };
  const listSocialCharge = async () => {
    try {
      setIsLoading(true);
      const response = await getAllSocialChargeDirigeant(selectedProject);

      if (response.status == 200) {
        setYear(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleSubmitTwo = async (e) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
    setInvitationMail("");
    const selectedDirigeantId = employeeEmp.map((e) => e.IdDirigeant);
    const transformedData = {};
    const salaries = selectedDirigeantId.map(
      (employeeId, index) =>
        (transformedData[employeeId] = {
          pourcentageParticipationCapital:
            pourcentageParticipationCapital[index],
          reparationRenumeratinAnnee: reparationRenumeratinAnnee[index],
          beneficier: beneficier[index],
        })
    );

    setDirigeants(salaries);

    salaries.forEach((item, index) => {
      const key = index.toString();
    });

    await addSalarieMemberDirigeants(selectedProject, anneeId, transformedData);
    await listSocialCharge();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        anneeId={anneeId}
        dialogClassName="modal-lg"
        centered
      >
        <div className="" role="document">
          <div className="relative flex flex-col w-full pointer-events-auto  border border-gray-300 rounded-lg outline-none">
            <Modal.Header closeButton />
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <div className="text-center w-100">
                  <h4
                    className="uppercase fs-26 font-bold"
                    style={{ color: "#514495" }}
                  >
                    Ajouter un dirigeant
                  </h4>
                </div>
              </div>
              <div className="modal-body">
                <i
                  className="flaticon-cancel-12 close"
                  data-dismiss="modal"
                ></i>
                <div className="form-group mb-2 w-[80%]">
                  <label className="mb-4 text-[#514495] text-lg text-center flex items-center justify-center font-semibold">
                    Liste des dirigeants
                  </label>
                  <div
                    className="overflow-y-scroll"
                    style={{ maxHeight: "100px", height: "30%" }}
                  >
                    {members && Array.isArray(members) && members.length > 0 ? (
                      members.map((user, index) => (
                        <div key={index}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedMembers.includes(
                              user.idCollaborateur
                            )}
                            onChange={() =>
                              setSelectedMembers((prevSelectedMembers) =>
                                prevSelectedMembers.includes(
                                  user.idCollaborateur
                                )
                                  ? prevSelectedMembers.filter(
                                      (id) => id !== user.idCollaborateur
                                    )
                                  : [
                                      ...prevSelectedMembers,
                                      user.idCollaborateur,
                                    ]
                              )
                            }
                          />
                          <label className="form-check-label">
                            {user.username ?? user.SalarieUserName}
                          </label>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-base">
                        La liste des collaborateurs/dirigeants est vide. Vous
                        pouvez en créer un nouveau en utilisant le formulaire
                        ci-dessous.
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group mb-2 w-[80%]">
                  <label className="text-[#514495] text-lg text-center flex items-center justify-center font-semibold">
                    Nouveau dirigeant
                  </label>
                  <div className="contact-name">
                    <input
                      type="text"
                      className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                      autoComplete="off"
                      name="name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder=" Nom du Dirigeant"
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
                <div className="form-group mb-2 w-[80%]">
                  <div className="contact-name">
                    <input
                      type="text"
                      className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                      autoComplete="off"
                      name="name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Prénom du Dirigeant"
                    />
                    <span className="validation-text"></span>
                  </div>
                </div>
                <div className="form-group mb-2 w-[80%]">
                  <div className="contact-name">
                    <input
                      type="text"
                      className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                      autoComplete="off"
                      name="name"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Dirigeant"
                    />
                    {err && <small className="text-red-500">{err}</small>}{" "}
                  </div>
                </div>

                <div className="form-group mb-3 w-[80%] ">
                  <div className="flex justify-center">
                    <input
                      className="form-check-input mx-2"
                      type="checkbox"
                      id="invitationMail"
                      name="invitationMail"
                      checked={invitationMail}
                      onChange={(e) => setInvitationMail(e.target.checked)}
                    />
                    <label
                      className="text-[#AEAEAE] text-xs pl-2"
                      htmlFor="invitationMail"
                    >
                      Invitation par e-mail à s'inscrire sur la plateforme pour
                      ajouter cet utilisateur en tant que collaborateur au
                      projet.
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mb-4">
                <button
                  type="submit"
                  className="bg-light-purple hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center "
                >
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Modal
        show={showSecondModal}
        anneeId={anneeId}
        name={name}
        onHide={() => setShowSecondModal(false)}
        dialogClassName="modal-lg"
        centered
      >
        <div className="" role="document">
          <div className="">
            <form onSubmit={handleSubmitTwo}>
              <div className="modal-body">
                <label className="year-title py-5">Année : {name}</label>
                <TableContainer component={Paper}>
                  <Table style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell className="col-md-2">DIRIGEANTS</TableCell>
                        <TableCell>
                          Pourcentage de participation au capital (en %)
                        </TableCell>
                        <TableCell>
                          Répartition de la rémunération sur l'année
                        </TableCell>
                        <TableCell>
                          {" "}
                          Le dirigeant bénéficie-t-il de l'ACRE ?
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {loading ? (
                      <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                      </div>
                    ) : (
                      <TableBody>
                        {employeeEmp
                          ? employeeEmp
                              .slice(0, showMore ? employeeEmp.length : 3)
                              .map((e, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    {e.UserName ?? e.DirigentUserName}
                                  </TableCell>
                                  <TableCell>
                                    <input
                                      type="number"
                                      value={
                                        pourcentageParticipationCapital[index]
                                      }
                                      onChange={(e) => {
                                        const newValue = isNaN(e.target.value)
                                          ? ""
                                          : Math.min(100, e.target.value);
                                        const updatedSalaireBrut = [
                                          ...pourcentageParticipationCapital,
                                        ];
                                        updatedSalaireBrut[index] = newValue;
                                        setpourcentageParticipationCapital(
                                          updatedSalaireBrut
                                        );
                                      }}
                                      max="100"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <input
                                      type="number"
                                      value={reparationRenumeratinAnnee[index]}
                                      onChange={(e) => {
                                        const updatedReparation = [
                                          ...reparationRenumeratinAnnee,
                                        ];
                                        updatedReparation[index] =
                                          e.target.value;
                                        setreparationRenumeratinAnnee(
                                          updatedReparation
                                        );
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <input
                                      type="number"
                                      value={beneficier[index]}
                                      onChange={(e) => {
                                        const updatedChargeSocial = [
                                          ...beneficier,
                                        ];
                                        updatedChargeSocial[index] =
                                          e.target.value;
                                        setbeneficier(updatedChargeSocial);
                                      }}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))
                          : []}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
                {employeeEmp && employeeEmp.length > 2 && (
                  <div>
                    <button
                      type="button"
                      onClick={toggleShowMore}
                      className=" btn text-black justify-content-start mt-3"
                    >
                      {showMore ? "Fermer" : "Voir plus"}
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center mb-4">
                <button
                  type="submit"
                  onClick={() => setShowSecondModal(false)}
                  className="bg-light-purple hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center"
                >
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LeaderChargeModal;
