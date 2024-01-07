import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const TutoCard = ({ video, channelLogoUrl }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => {
    setShowModal(true);
    e.stopPropagation();
  };

  const closeModal = (e) => {
    setShowModal(false);
    e.stopPropagation();
  };

  const videoThumbnailUrl = video?.snippet?.thumbnails?.medium?.url || "";
  const videoTitle = video?.snippet?.title || "";

  return (
    <div onClick={openModal} style={{ cursor: "pointer" }}>
      <div className="max-w-sm w-full lg:max-w-full lg:flex py-4 px-4">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-md text-center overflow-hidden"
          style={{ backgroundImage: `url(${videoThumbnailUrl})` }}
          title={videoTitle}
        ></div>
        <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r pl-6 flex flex-col justify-between leading-normal">
          <div className="mb-4">
            <div className="text-violet-700 font-bold text-sm mb-2">
              {videoTitle}
            </div>
          </div>
          <div className="flex items-center">
            <img
              className="w-12 h-12 rounded-full mr-4"
              src={channelLogoUrl}
              alt="Logo chanel"
            />
            <div className="text-sm ">
              <p className="text-gray-900 leading-none">
                {video.snippet.channelTitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} size="lg" centered onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>{videoTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            title={videoTitle}
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${video?.id?.videoId || ""}`}
            allowFullScreen
          ></iframe>
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
    </div>
  );
};

export default TutoCard;
