import React, { useState, useEffect } from "react";
import IconMoon from "../../Icon/IconMoon";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMembers,
  getBusinessPlanTeamMembersAction,
} from "../../../../store/actions/BusinessPlanActions";
import {
  getBPTeamLoaderSelector,
  getTeamMembers,
} from "../../../../store/selectors/BusinessPlanSelectors";
import ItemCard from "./Cards/itemCard";
import { Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Box from "../../Box/Box";
import Header from "./Header/Header";
import ProgressLinear from "../../ProgressLinear/ProgressLinear";
import userImg from "../../../../images/temp-user.jpeg";
import { useUploadImage } from "../../../../hooks/useUploadImage";
import AddFromCollaborator from "./form/AddFromCollaborator";
import AddNewMember from "./form/AddNewMember";
import HistoryTabs from "./HistoryTabs/HistoryTabs";
import TabPanel from "./TabPanel";
import { fetchAllMembers } from "../../../../services/BusinessPlanService";

const MembersHistory = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [avancement, setAvancement] = useState(0);

  const allMembers = useSelector(getTeamMembers);

  const selectedProject = localStorage.getItem("selectedProjectId");
  const selectedProjecttt = useSelector(
    (state) => state.project.selectedProject
  );

  const isLoading = useSelector(getBPTeamLoaderSelector);

  // fix duplication call

  useEffect(() => {
    dispatch(getBusinessPlanTeamMembersAction(selectedProject));
  }, [selectedProjecttt]);
  useEffect(() => {}, [memberList]);
  useEffect(() => {
    fetchAllMembers(selectedProject).then((res) => {
      if (res) {
        setAvancement(res?.data?.avancement);
        setMemberList(res?.data?.equipeMumber);
      }
    });
  }, [isLoading]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const [modalTab, setModalTab] = useState(0); // Initial tab index
  const handleModalTabChange = (event, newValue) => {
    setModalTab(newValue);
  };
  return (
    <div>
      <Box title={"BUSINESS PLAN"} color="bg-white" />
      <div className="bp-container pb-32">
        <Header />

        {isLoading ? (
          <div className="loader mb-5">
            <Spinner
              animation="border"
              role="status"
              size="md"
              currentcolor="#E73248"
            />
          </div>
        ) : allMembers ? (
          <>
            <div className="mb-5">
              <ProgressLinear progress={avancement} color="#EF9118" />
            </div>

            {memberList?.length > 0 ? (
              <div className="members-grid-container">
                {memberList?.map((member) => (
                  <div key={member?.idCollaborateur} className="member-card">
                    <ItemCard
                      setMemberList={setMemberList}
                      id={member.idCollaborateur}
                      firstName={
                        member.firstname
                          ? member.firstname
                          : member.SalarieFirsteName
                      }
                      lastName={
                        member.lastname
                          ? member.lastname
                          : member.SalarieLasteName
                      }
                      email={
                        member?.email ? member?.email : member?.SalarieEmail
                      }
                      role={member?.role}
                      description={member?.caracteristique}
                      degree={member?.diplome}
                      date={member?.dateCreation}
                      image={member?.photoProfil}
                      dirigeant={member?.Dirigeant}
                      memberId={member?.idCollaborateur}
                      loader={loader}
                      setLoader={setLoader}
                    />
                  </div>
                ))}
                <div className="member-card"></div>
              </div>
            ) : (
              <div className="flex justify-center items-center text-center">
                <span>
                  Aucun collaborateur n'est actuellement associé à votre projet,
                  ce qui empêche l'affichage.<br></br>
                  Veuillez ajouter des membres collaborateurs afin de pouvoir
                  accéder à cette section en cliquant sur l'icône d'ajout de
                  collaborateur située plus haut.
                </span>
              </div>
            )}
          </>
        ) : null}

        <Modal
          show={showModal}
          onHide={handleModalClose}
          dialogClassName="modal-lg"
        >
          <div role="document">
            <div
              className="w-full"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div>
                <HistoryTabs
                  tab={modalTab}
                  handleTabsChange={handleModalTabChange}
                />
              </div>
            </div>
            <div className="w-full">
              <TabPanel value={modalTab} index={0}>
                {/* Form for Tab 1 */}
                <AddFromCollaborator setShowModal={setShowModal} />
              </TabPanel>
              <TabPanel value={modalTab} index={1}>
                {/* Form for Tab 2 */}
                <AddNewMember
                  setShowModal={setShowModal}
                  setMemberList={setMemberList}
                />
              </TabPanel>
            </div>
          </div>
        </Modal>
        <div className="flex justify-start items-center ml-3 gap-3 absolute bottom-8">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#EF9118"
              className="bi bi-person-plus"
              viewBox="0 0 16 16"
              style={{
                height: "30px",
              }}
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              <path
                fillRule="evenodd"
                d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
              />
            </svg>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex justify-center items-center rounded-lg bg-[#EF9118] text-white px-4 py-2"
          >
            Ajouter un membre
          </button>
        </div>
        <div className="bmc-step-page">
          <button
            className="bmc-page-count"
            // onClick={handleNextStep}
          >
            <Link to="/history">
              <IconMoon color="#EF9118" name="arrow-left" size={24} />
            </Link>
          </button>
          <span>
            {2}/{3}
          </span>

          <Link className="bmc-page-count" to="history-all">
            <IconMoon color="#EF9118" name="arrow-right" size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MembersHistory;
