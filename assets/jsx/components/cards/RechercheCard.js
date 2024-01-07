import React, { useState } from "react";
import grayPlaceholderImage from "../../../images/logoAides.png";
import Modal from "react-bootstrap/Modal";
const RechercheCard = ({
  title,
  description,
  imagePlaceholder = grayPlaceholderImage,
  links,
}) => {
  const [showLinks, setShowLinks] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  const openLinksModal = (link) => {
    setSelectedLink(link);
    setShowLinksModal(true);
  };

  const closeLinksModal = () => {
    setSelectedLink(null);
    setShowLinksModal(false);
  };

  return (
    <div>
      <div>
        <div className="max-w-sm w-full lg:max-w-full lg:flex py-2 px-12">
          <img
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-md text-center overflow-hidden"
            src={imagePlaceholder}
            alt={title}
          />
          <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal px-2">
            <div>
              <div className="text-violet-700 font-bold text-sm mb-2 pt-2">
                {title}
              </div>
              <p
                className="text-gray-700 text-xs"
                dangerouslySetInnerHTML={{ __html: description }}
              ></p>
            </div>
          </div>
        </div>
        <div className="max-w-sm w-full lg:max-w-full lg:flex px-12">
          <div className="px-2">
            <button
              onClick={() => setShowLinks(!showLinks)} // Toggle the showLinks state on button click
              className="text-violet-500 hover:underline text-xs"
            >
              Voir plus
            </button>
            {/* open link in a pop-up */}
            {showLinks && (
              <div>
                {links.map((link, index) => (
                  <div key={index} className="mb-2">
                    <a
                      href="#"
                      onClick={() => openLinksModal(link)} // Pass the selected link to openLinksModal
                      className="text-blue-500 hover:underline text-xs"
                    >
                      {link.texte}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        show={showLinksModal}
        onHide={closeLinksModal}
        dialogClassName="modal-xl"
        centered
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="h-screen">
          {selectedLink && (
            <iframe
              title={title}
              src={selectedLink.lien}
              className="w-full h-full"
            ></iframe>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={closeLinksModal}
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

export default RechercheCard;
