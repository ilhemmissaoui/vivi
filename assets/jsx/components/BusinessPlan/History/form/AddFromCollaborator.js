import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMemberFromCollaborator } from "../../../../../store/actions/BusinessPlanActions";
import { getBusinessPlanTeamMembers } from "../../../../../services/BusinessPlanService";

const AddFromCollaborator = ({ setShowModal }) => {
  const selectedProject = localStorage.getItem("selectedProjectId");

  const dispatch = useDispatch();

  const listeOfcollaborateur = useSelector(
    (state) => state.project.selectedProject.listeOfcollaborateur
  );
  const [collaborateur, setCollaborateur] = useState("");
  const [memberList, setMemberList] = useState([]);

  const handleAdd = () => {
    if (collaborateur) {
      dispatch(addMemberFromCollaborator(selectedProject, collaborateur));
      // Close the modal if needed
    }
    setShowModal(false);
  };
  useEffect(() => {
    getBusinessPlanTeamMembers(selectedProject).then((res) => {
      if (res) {
        setMemberList(res?.data);
      }
    });
  }, []);
  return (
    <form className="w-full">
      <div className="flex items-center justify-center mt-10">
        <h4 className="uppercase fs-26 text-light-orange">
          Ajouter à partir de la liste des collaborateurs
        </h4>
      </div>
      {memberList?.length > 0 ? (
        <div className="add-contact-content flex items-center justify-center mt-10">
          <div className="mb-3 w-5/6">
            <div className="contact-name">
              <select
                className="block w-full p-3 text-sm font-normal leading-5 text-gray-700 bg-white rounded-md transition duration-150 ease-in-out border-2"
                autoComplete="off"
                name="collaborateur"
                value={collaborateur}
                onChange={(e) => setCollaborateur(e.target.value)}
              >
                <option value="" disabled>
                  Choisir un collaborateur
                </option>

                {memberList?.map((collaborator) => (
                  <option
                    key={collaborator.idCollaborateur}
                    value={collaborator.idCollaborateur}
                  >
                    {collaborator.email}
                  </option>
                ))}
              </select>
              <span className="validation-text"></span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-base">
          Aucun collaborateur est associé à ce projet
        </div>
      )}
      <div className="flex items-center justify-center m-20">
        <button
          type="button"
          onClick={handleAdd}
          className="bg-light-orange hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center "
        >
          Valider
        </button>
      </div>
    </form>
  );
};

export default AddFromCollaborator;
