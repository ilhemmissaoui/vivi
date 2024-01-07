import React, { useState } from "react";
import AvatarPlaceholderImage from "../../../images/avatar/avatarPlaceholder.png";
import grayPlaceholderImage from "../../../images/gray-placeholder.jpg";
import Modal from "react-bootstrap/Modal";
const ResourceCard = ({
  title,
  author,
  description,
  link,
  publicationDate,
  imagePlaceholder = grayPlaceholderImage,
  AvatarPlaceholder = AvatarPlaceholderImage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal1 = () => {
    setShowModal1(true);
  };
  const closeModal1 = () => {
    setShowModal1(false);
  };
  // lire html format
  const decodeHtmlEntities = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const extractDescriptionWithoutLink = (fullDescription) => {
    const linkIndex = fullDescription.indexOf("https://");
    let descriptionWithoutLink, extractedLink;
    if (linkIndex !== -1) {
      descriptionWithoutLink = fullDescription.substring(0, linkIndex);
      extractedLink = fullDescription.substring(linkIndex);
    } else {
      descriptionWithoutLink = fullDescription;
      extractedLink = "";
    }
    descriptionWithoutLink = decodeHtmlEntities(descriptionWithoutLink);
    return { descriptionWithoutLink, extractedLink };
  };

  const { descriptionWithoutLink, extractedLink } =
    extractDescriptionWithoutLink(description);

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex py-2 px-2">
      <img
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-md text-center overflow-hidden"
        src={imagePlaceholder}
        alt={title}
      />
      <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r pl-6 flex flex-col justify-between leading-normal">
        <div>
          <div className="text-violet-700 font-bold text-sm mb-2 pt-2">
            {title}
          </div>
          <p className="text-gray-700 text-xs">{descriptionWithoutLink}</p>
        </div>
        {extractedLink && (
          <div>
            <a
              href="#"
              onClick={openModal1}
              className="inline-flex items-center px-3 py-1 text-sm font-medium justify-end text-violet-700"
            >
              Lien
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        )}
        <div>
          <a
            href="#"
            onClick={openModal}
            className="inline-flex items-center px-3 py-1 text-sm font-medium justify-end text-violet-700"
          >
            Lire la suite
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
        <Modal
          show={showModal}
          onHide={closeModal}
          dialogClassName="modal-xl"
          centered
        >
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="h-screen">
            <iframe title={title} src={link} className="w-full h-full"></iframe>
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
        {extractedLink && (
          <Modal
            show={showModal1}
            onHide={closeModal1}
            dialogClassName="modal-xl"
            centered
          >
            <Modal.Header>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="h-screen">
              <iframe
                title={title}
                src={extractedLink}
                className="w-full h-full"
              ></iframe>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={closeModal1}
                type="button"
                class="text-white font-bold py-2 px-4 rounded focus:outline-none w-24 self-center bg-light-orange hover:bg-black"
              >
                Fermer
              </button>
            </Modal.Footer>
          </Modal>
        )}
        <div className="flex justify-start items-center align-baseline">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={AvatarPlaceholder}
            alt={AvatarPlaceholder}
          />
          <div className="text-sm mt-3">
            <p className="text-gray-900 font-semibold">{author}</p>
            <p className="text-gray-600">{publicationDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
