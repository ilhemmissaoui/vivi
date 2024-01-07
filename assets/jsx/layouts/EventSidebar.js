import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { Button, Modal, Form } from "react-bootstrap";
// import { apiCalendar } from "../../../src/googleCalendarConfig";
// import { useSelector } from "react-redux";
// import { sendEventUrl } from "../../services/BusinessPlanService";
import { InlineWidget } from "react-calendly";

// Tuto videos
import Tutorial from "../components/Dashboard/Tutorial/Tutorial";
import API_KEY from "../../../src/apiYoutube";
const EventSidebar = () => {
  // const [eventDetails, setEventDetails] = useState({
  //   title: "",
  //   description: "",
  //   startDate: "",
  //   startTime: "08:00",
  //   endDate: "",
  //   endTime: "18:00",
  //   attendees: [], // Attendees' emails as an array
  // });

  // const collaborator = useSelector((state) => state.bp.members);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const [selectedDates, setSelectedDates] = useState("");
  // const [error, setError] = useState("");
  // const [email, setEmail] = useState([]);
  //Tutos videos
  const CHANNEL_ID = "UC6At57DnjCq_ZzXw3WB7-9A";
  const MAX_RESULTS = 10;
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function fetchVideos() {
      try {
        const cachedData = localStorage.getItem("youtubeVideos");

        if (cachedData) {
          // Use cached data if available
          setVideos(JSON.parse(cachedData));
        } else {
          // Fetch data from the API
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
          );

          const data = await response.json();
          setVideos(data.items);

          // Cache the API response
          localStorage.setItem("youtubeVideos", JSON.stringify(data.items));
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }

    fetchVideos();
  }, []);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setEventDetails({
  //     ...eventDetails,
  //     [name]: value,
  //   });
  // };

  // const handleDateChange = (dates) => {
  //   const [startDate, endDate] = dates;

  //   if (startDate) {
  //     setEventDetails((prevDetails) => ({
  //       ...prevDetails,
  //       startDate: formatDate(startDate),
  //     }));
  //   }

  //   if (endDate) {
  //     setEventDetails((prevDetails) => ({
  //       ...prevDetails,
  //       endDate: formatDate(endDate),
  //     }));
  //     setIsModalOpen(true);
  //   }
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  //   setSelectedDates([]);
  //   setEventDetails({
  //     title: "",
  //     description: "",
  //     startDate: "",
  //     startTime: "",
  //     endDate: "",
  //     endTime: "",
  //   });
  //   setError("");
  // };

  // const handleCreateEvent = async () => {
  //   if (
  //     !eventDetails.title ||
  //     !eventDetails.startDate ||
  //     !eventDetails.startTime ||
  //     !eventDetails.endDate ||
  //     !eventDetails.endTime ||
  //     !email
  //   ) {
  //     setError("All date and time fields and email are required.");
  //     return;
  //   }

  //   const event = {
  //     title: eventDetails.title,
  //     summary: eventDetails.title,
  //     description: eventDetails.description,
  //     start: {
  //       dateTime: `${eventDetails.startDate}T${eventDetails.startTime}:00`,
  //       timeZone: "Europe/Paris",
  //     },
  //     end: {
  //       dateTime: `${eventDetails.endDate}T${eventDetails.endTime}:00`,
  //       timeZone: "Europe/Paris",
  //     },
  //     attendees: email.map((email) => ({ email })),
  //   };
  //   //!!!!!!!!!!!!!!!!!!!!!!!!!
  //   try {
  //     const res = await apiCalendar.handleAuthClick();
  //     if (res) {
  //       apiCalendar
  //         .createEvent(event)
  //         .then((result) => {
  //           if (result) {
  //             //!!!!!!!!!!!!!!!!!!!!!!!!!
  //             sendEventUrl({
  //               emails: email,
  //               meetUrl: result.result.htmlLink,
  //             })
  //               .then((res) => sendEmail(event))
  //               .catch((err) => console.log("err", err));
  //             //!!!!!!!!!!!!!!!!!!!!!!!!!
  //           }
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     }
  //   } catch (error) {}

  //   //!!!!!!!!!!!!!!!!!!!!!!!!!
  //   sendEmail(event);
  //   //!!!!!!!!!!!!!!!!!!!!!!!!!
  //   setIsModalOpen(false);
  // };

  // const sendEmail = (event) => {
  //   alert("Email sent with event details:", event);
  // };

  // const formatDate = (date) => {
  //   const year = date.getFullYear();
  //   let month = String(date.getMonth() + 1).padStart(2, "0");
  //   let day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  // const handleEmailSelectChange = (e) => {
  //   setEmail((prev) => {
  //     if (!prev.includes(e.target.value)) {
  //       return [...prev, e.target.value];
  //     } else {
  //       return prev;
  //     }
  //   });
  // };

  return (
    <div className="card shadow-none rounded-0 bg-transparent h-auto mb-0">
      <div className="card-body event-calendar pb-2">
        <div className="text-left">
          <span className="calendar-title ">Prendre un rendez-vous</span>
        </div>
        <InlineWidget url="https://calendly.com/vivitool/creation-nouveau-projet?hide_event_type_details=1&hide_gdpr_banner=1" />
        {/* <Calendarcreation-nouveau-projet
          onChange={handleDateChange}
          value={selectedDates}
          selectRange
          minDate={new Date()} // Set minimum selectable date to today
          className="mb-4"
        /> */}
        <div>
          <hr />
        </div>
        {/* <div className="text-center pt-2 pb-2">
          <Button className="calendar-btn " onClick={openModal}>
            Créer un évènement
          </Button>
        </div> */}
      </div>
      {/* <Modal show={isModalOpen} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Créer un évènement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="w-full">
            <Form.Group controlId="title" className="my-2">
              <Form.Label>titre de l'évènement</Form.Label>
              <Form.Control
                name="title"
                type="text"
                value={eventDetails.title}
                placeholder="title "
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="eventDescription" className="my-2">
              <Form.Label>Description de l'évènement</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="description "
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="eventDate" className="my-2">
              <Form.Label>Date de l'évènement</Form.Label>
              <div className="flex justify-around items-center">
                <div>
                  <Form.Control
                    name="startDate"
                    type="date"
                    placeholder="Enter start Date"
                    value={eventDetails.startDate}
                    onChange={handleInputChange}
                    min={formatDate(new Date())} // Set minimum date to today
                    required
                  />
                </div>
                <p>Jusqu'à</p>
                <div>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={eventDetails.endDate}
                    onChange={handleInputChange}
                    min={eventDetails.startDate} // Set minimum date to start date
                    required
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group controlId="eventTime" className="my-2">
              <Form.Label>Horaire de l'évènement</Form.Label>
              <div className="flex justify-around items-center">
                <div>
                  <Form.Control
                    type="time"
                    name="startTime"
                    value={eventDetails.startTime}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <p>Jusqu'à</p>
                <div>
                  <Form.Control
                    type="time"
                    name="endTime"
                    value={eventDetails.endTime}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
            </Form.Group>
          </Form>
          <div className="w-[80%] mx-auto mt-8 p-4 border rounded-lg">
            <h2 className="text-base font-bold mb-4">
              Choisir plusieurs emails
            </h2>
            <select
              className="w-full p-2 border rounded-md"
              multiple
              name="attendees"
              value={email}
              onChange={handleEmailSelectChange}
            >
              {collaborator?.map((membre, index) => (
                <option key={membre.idCollaborateur} value={membre.email}>
                  {membre.email}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-4">
              <h3 className="text-base font-bold mb-2">
                Emails sélectionnés :
              </h3>
              <ul>
                {email?.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Annuler
          </Button>
          <Button
            variant="primary" // Use "primary" instead of "btn-primary"
            onClick={handleCreateEvent}
          >
            Enregistrer l'événement
          </Button>
        </Modal.Footer>
      </Modal> */}
      <div>
        <div className="card-body event-calendar pb-2">
          <div className="text-left">
            <span className="tutorial-title">Tutoriel</span>
          </div>
          <div>
            {videos?.slice(0, 3).map((video) => (
              <Tutorial key={video.id.videoId} video={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSidebar;
