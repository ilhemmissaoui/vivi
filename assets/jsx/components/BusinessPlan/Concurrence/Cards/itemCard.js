import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import member from "../../../../../images/user.jpg";
import IconMoon from "../../../Icon/IconMoon";
import Profile from "../../../../../images/temp-user.jpeg";
import {
  DeleteSociety,
  getAllSocieties,
} from "../../../../../services/BusinessPlanService";
const ItemCard = (props) => {
  const {
    setSocieties,
    idSociety,
    name,
    pointFort,
    pointFaible,
    directIndirect,
    taille,
    effectif,
    ca,
    logo,
  } = props;
  const [showPopup, setShowPopup] = useState(false);

  const selectedProject = localStorage.getItem("selectedProjectId");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    getAllSocieties(selectedProject).then((res) => {
      if (res) {
        setSocieties(res?.data[0]);
      }
    });
  }, []);
  const handleDelete = async (society_id) => {
    await DeleteSociety(selectedProject, society_id);
    const response = await getAllSocieties(selectedProject);
    setSocieties(response?.data[0]);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`col-md-4 mb-4  `}>
        <div
          className={`item-card1 rounded-[10px] bg-white border-0.3  border-light-purple `}
        >
          <div className="flex w-full justify-between">
            <div
              className="flex flex-row w-full mx-2 bg-light-purple bg-opacity-25 mb-2 rounded-[10px] mt-1 relative"
              style={{ width: "330px", height: "50px" }}
            >
              <div className="flex flex-row">
                <div className="rounded-full w-[35px] h-[35px] mx-2.5 m-2">
                  <img
                    className="w-full h-full rounded-full"
                    src={logo}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="self-center">
                  <span className="text-black self-start">{name}</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center absolute right-2">
                <div className="flex items-center justify-center">
                  <Link
                    to={{
                      pathname: `/market-competition/societies/update-society/${idSociety}`,
                      state: {
                        name,
                        pointFort,
                        pointFaible,
                        directIndirect,
                        taille,
                        effectif,
                        ca,
                        logo,
                      },
                    }}
                    className="item-link"
                  >
                    <div className="cursor-pointer w-small">
                      <button>
                        <IconMoon color="#1A1E33" name="edit-input" />
                      </button>
                    </div>
                  </Link>
                  <button
                    className="p-2 bg-color: #2C2C2C text-white font-bold opacity-50"
                    onClick={() => handleOpenModal()}
                  >
                    <IconMoon
                      color="rgba(112, 112, 112, 0.1)"
                      name="trash"
                      size={20}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" cursor-pointer  w-small "></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-auto w-64 ">
            <div className="flex flex-row">
              <div>
                <div className="cursor-pointer w-small right-0 mr-1 ">
                  <IconMoon color="#2C2C2C" name="plus_2" />
                </div>
              </div>
              <div className="mb-2 mx-2">
                <span className={`text-black-1 self-start `}>{pointFort}</span>
              </div>
            </div>
            <div className="flex flex-row">
              <div>
                <div className="cursor-pointer w-small right-0 mr-1 ">
                  <IconMoon color="#2C2C2C" name="icon-moins" />
                </div>
              </div>
              <div className="mb-2 mx-2">
                <span className={`text-black-1 self-start `}>
                  {pointFaible}
                </span>
              </div>
            </div>
            <div className="flex flex-row">
              <div>
                <div className="cursor-pointer w-small right-0 mr-1 ">
                  <IconMoon color="#2C2C2C" name="foor" />
                </div>
              </div>
              <div className="mb-2 mx-2">
                <span className={`text-black-1 self-start `}>
                  {directIndirect}
                </span>
              </div>
            </div>

            <div className="flex flex-row">
              <div>
                <div className="cursor-pointer w-small right-0 mr-1 ">
                  <IconMoon color="#2C2C2C" name="three" />
                </div>
              </div>

              <div className="mb-2 mx-2">
                <span className={`text-black-1 self-start `}>{taille}</span>
              </div>
            </div>

            <div className="flex flex-row">
              <div>
                <div className="cursor-pointer w-small right-0 mr-1 ">
                  <IconMoon color="#2C2C2C" name="two" />
                </div>
              </div>
              <div className="mb-2 mx-2">
                <span className={`text-black-1 self-start `}>{ca}</span>
              </div>
            </div>
            <div className="flex flex-row">
              <div>
                <div className="cursor-pointer w-small right-0 mr-1 ">
                  <IconMoon color="#2C2C2C" name="people1" />
                </div>
              </div>

              <div className="mb-2 mx-2">
                <span className={`text-black-1 self-start `}>{effectif}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade bd-example-modal-sm ${
          isModalOpen ? "show" : ""
        }`}
        tabIndex="-1"
        role="dialog"
        aria-hidden={!isModalOpen}
        style={{ display: isModalOpen ? "block" : "none" }}
        centered="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="flex justify-center items-center">
                Es-tu sûr(e) de vouloir supprimer ce membre ?
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" onClick={() => setIsModalOpen(false)}>
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-footer">
              <button
                className="delete-button-style-society"
                onClick={() => handleDelete(idSociety)}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemCard;
