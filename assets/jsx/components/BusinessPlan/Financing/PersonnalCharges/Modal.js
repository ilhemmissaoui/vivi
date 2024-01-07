import React, { useState, useEffect } from "react";
import { Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployeeAction,
  addSalarieAction,
  clearErrAction,
} from "../../../../../store/actions/BusinessPlanActions";
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
import { Spinner } from "react-bootstrap";
import {
  addSalarieMember,
  getAllSocialCharge,
  getAllSocialChargeCollaborateurs,
} from "../../../../../services/BusinessPlanService";
const AddModal = ({
  loader,
  members,
  show,
  onHide,
  anneeId,
  name,
  setIsLoading,
  setYear,
}) => {
  const dispatch = useDispatch();
  const [salaireBrut, setSalaireBrut] = useState([]);
  const [typeContrat, setTypeContrat] = useState([]);
  const [chargeSocial, setChargeSocial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [invitationMail, setInvitationMail] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employeeEmp, setEmployeeEmp] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const selectedProject = localStorage.getItem("selectedProjectId");
  var err = useSelector((state) => state.bp.err);

  useEffect(() => {
    if (!show) {
      dispatch(clearErrAction());
    }
  }, [show, dispatch]);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // useEffect(() => {}, [members]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedEmployeeIds = selectedMembers;
    const employee = {
      collaborateurs: selectedEmployeeIds,
      salarie: {
        firstename: firstName,
        lastename: lastName,
        email,
        invitation: invitationMail,
      },
    };
    setEmployees([...employees, employee]);
    setSelectedMembers([]);
    try {
      const response = await dispatch(
        addEmployeeAction(selectedProject, anneeId, employee)
      );
      setLoading(true);
      if (response.data && response.data.newCollaborateur) {
        setEmployeeEmp(response.data.newCollaborateur);
        setSalaireBrut(Array(response.data.newCollaborateur.length).fill(0));
        setTypeContrat(
          Array(response.data.newCollaborateur.length).fill("contrat-pro")
        );
        setChargeSocial(Array(response.data.newCollaborateur.length).fill(0));
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
      const response = await getAllSocialCharge(selectedProject);
      setYear(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSubmitTwo = async (e) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
    setInvitationMail("");
    const selectedEmployeeIds = employeeEmp.map((e) => e.idCollaborateur);
    const transformedData = {};
    const salaries = selectedEmployeeIds.map(
      (employeeId, index) =>
        (transformedData[employeeId] = {
          salaireBrut: salaireBrut[index],
          typeContrat: typeContrat[index],
          chargeSocial: chargeSocial[index],
        })
    );
    setEmployees(salaries);
    salaries.forEach((item, index) => {
      const key = index.toString();
    });

    //await dispatch(addSalarieAction(selectedProject, anneeId, transformedData));
    addSalarieMember(selectedProject, anneeId, transformedData).then((res) => {
      if (res.status == 200) {
        listSocialCharge();
      }
    });
    //getAllSocialChargeCollaborateurs(selectedProject, annee_id)
    // listSocialCharge();
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
                    Ajouter un collaborateur
                  </h4>
                </div>
              </div>
              <div className="modal-body">
                <i
                  className="flaticon-cancel-12 close"
                  data-dismiss="modal"
                ></i>
                <div className="form-group mb-3 w-[80%]">
                  <label className="mb-4 text-[#514495] text-lg text-center flex items-center justify-center font-semibold">
                    Liste des collaborateurs
                  </label>
                  {loader ? (
                    <div className="text-center">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <div
                      className="overflow-y-scroll"
                      style={{ maxHeight: "120px", height: "30%" }}
                    >
                      {members &&
                      Array.isArray(members) &&
                      members.length > 0 ? (
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
                  )}
                  <div>
                    <div className="form-group mb-2">
                      <label className="mt-4 text-[#514495] text-lg text-center flex items-center justify-center font-semibold">
                        Nouveau collaborateur
                      </label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                          autoComplete="off"
                          name="name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Nom du collaborateur"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-2">
                      <div className="contact-name">
                        <input
                          type="text"
                          className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                          autoComplete="off"
                          name="name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Prénom du collaborateur"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-2">
                      <div className="contact-name">
                        <input
                          type="text"
                          className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                          autoComplete="off"
                          name="name"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email du collaborateur"
                        />
                        {err && <small className="text-red-500">{err}</small>}
                      </div>
                      <div className="form-group my-3">
                        <div className="flex justify-center">
                          <input
                            className="form-check-input mx-2"
                            type="checkbox"
                            id="invitationMail"
                            name="invitationMail"
                            checked={invitationMail}
                            onChange={(e) =>
                              setInvitationMail(e.target.checked)
                            }
                          />
                          <label
                            className="text-[#AEAEAE] text-xs pl-2"
                            htmlFor="invitationMail"
                          >
                            Invitation par e-mail à s'inscrire sur la plateforme
                            pour ajouter cet utilisateur en tant que
                            collaborateur au projet.
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center justify-center mb-4">
                        <button
                          type="submit"
                          className="bg-light-purple hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center mt-4"
                        >
                          Valider
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Modal
        show={showSecondModal}
        onHide={() => setShowSecondModal(false)}
        dialogClassName="modal-lg"
        centered
      >
        <div role="document">
          <div>
            <form onSubmit={handleSubmitTwo}>
              <div className="modal-body">
                <label className="year-title py-5">Année : {name}</label>
                <TableContainer component={Paper}>
                  <Table style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell className="col-md-2">
                          COLLABORATEUR
                        </TableCell>
                        <TableCell>SALAIRE BRUT</TableCell>
                        <TableCell>TYPE DE CONTRAT</TableCell>
                        <TableCell>CHARGES SOCIALES</TableCell>
                      </TableRow>
                    </TableHead>
                    {loading ? (
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            <Spinner animation="border" variant="primary" />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ) : (
                      <TableBody>
                        {employeeEmp
                          ? employeeEmp
                              .slice(0, showMore ? employeeEmp.length : 3)
                              .map((e, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    {e.username ?? e.SalarieUserName}
                                  </TableCell>
                                  <TableCell>
                                    <input
                                      type="text"
                                      value={salaireBrut[index]}
                                      onChange={(e) => {
                                        const updatedSalaireBrut = [
                                          ...salaireBrut,
                                        ];
                                        updatedSalaireBrut[index] =
                                          e.target.value;
                                        setSalaireBrut(updatedSalaireBrut);
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <select
                                      className="custom-dropdown mb-0"
                                      value={typeContrat[index]}
                                      onChange={(e) => {
                                        const updatedTypeContrat = [
                                          ...typeContrat,
                                        ];
                                        updatedTypeContrat[index] =
                                          e.target.value;
                                        setTypeContrat(updatedTypeContrat);
                                      }}
                                    >
                                      <option value="contrat-pro">
                                        contrat pro
                                      </option>
                                      <option value="contrat-apprentissage">
                                        contrat apprentissage
                                      </option>
                                      <option value="CDD">CDD</option>
                                      <option value="CDI">CDI</option>
                                      <option value="Freelance">
                                        Freelance
                                      </option>
                                    </select>
                                  </TableCell>
                                  <TableCell>
                                    <input
                                      type="text"
                                      value={chargeSocial[index]}
                                      onChange={(e) => {
                                        const updatedChargeSocial = [
                                          ...chargeSocial,
                                        ];
                                        updatedChargeSocial[index] =
                                          e.target.value;
                                        setChargeSocial(updatedChargeSocial);
                                      }}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))
                          : null}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
                {employeeEmp && employeeEmp.length > 2 && (
                  <div>
                    <button
                      type="button"
                      onClick={toggleShowMore}
                      className="btn text-black justify-content-start mt-3"
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

export default AddModal;
