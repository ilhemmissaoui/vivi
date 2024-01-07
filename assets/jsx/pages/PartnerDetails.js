import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPartnerAction } from "../../store/actions/PartnerAction";
import { useParams } from "react-router-dom";
import noCoverImage from "/assets/images/nocover.jpg";

import {
  Spinner,
  Button,
  Collapse,
  ButtonGroup,
  Tabs,
  Tab,
} from "react-bootstrap";
import IconMoon from "../components/Icon/IconMoon";
import Box from "../components/Box/Box";
import {
  Envelope,
  GeoAlt,
  Telephone,
  ArrowRightCircle,
  ArrowDownCircle,
} from "react-bootstrap-icons";

const PartnerDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(true); // Set to true initially
  const [showSector, setShowSector] = useState(false); // Set to false initially
  const [showFullDescription, setShowFullDescription] = useState(false); // Set to false initially

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await dispatch(getPartnerAction(id));
        setPartner(response);
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [dispatch, id]);

  const renderIcon = (color, name, size) => (
    <IconMoon className="bm-plus-icon" color={color} name={name} size={20} />
  );

  if (loading) {
    return (
      <div className="loader">
        <Spinner
          animation="border"
          role="status"
          size="md"
          currentcolor="#E73248"
        />
      </div>
    );
  }

  const renderLogo = () => {
    if (partner && partner[0] && partner[0].logo) {
      return (
        <img
          src={partner[0].logo}
          alt="Logo Image"
          width="80"
          height="90"
          style={{ borderRadius: "10px", marginTop: "-5px" }}
        />
      );
    } else {
      return (
        <img
          src={noCoverImage}
          color="#808080"
          alt="no cover"
          width="95"
          height="90"
          style={{
            borderRadius: "10px",
            marginTop: "-5px",
          }}
        />
      );
    }
  };

  return (
    <div>
      <Box title={"Partenaires"} color="bg-white" />
      <div className="d-flex justify-content-center ">
        <label htmlFor="coverImage">
          {partner && partner[0] && partner[0].photoCouvert ? (
            <img
              src={partner[0].photoCouvert}
              alt="cover Image"
              width="1500"
              height="115"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                width: "4000px",
                height: "140px",
              }}
            />
          ) : (
            <img
              src={noCoverImage}
              color="#808080"
              alt="no cover"
              width="1500"
              height="170"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                width: "4000px",
                height: "170px",
              }}
            />
          )}
        </label>
      </div>

      <div className="bmc-container">
        <div className="partner-details-container d-flex">
          <div
            className="logo"
            style={{ marginLeft: "70px", marginTop: "30px" }}
          >
            {renderLogo()}{" "}
          </div>
          <div className="company-name ml-3 mt-3">
            <h1 style={{ fontSize: "bold" }}>
              {partner && partner[0] && partner[0].NomSociete}
            </h1>
            <h2 style={{ fontSize: "bold", fontSize: "22px" }}>
              {partner && partner[0] && partner[0].service}
            </h2>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center ml-5 mt-4">
          <div className="d-flex align-items-center mr-2">
            <Telephone
              className="mr-2"
              size={26}
              style={{ color: "#0047AB" }}
            />
            <p className="mb-0 font-weight-bold" style={{ fontSize: "12px" }}>
              {partner && partner[0] && partner[0].telephone}
            </p>
          </div>
          <div className="d-flex align-items-center mr-4">
            <Envelope className="mr-2" size={26} style={{ color: "#0047AB" }} />
            <p className="mb-0 font-weight-bold" style={{ fontSize: "12px" }}>
              {partner && partner[0] && partner[0].email}
            </p>
          </div>
          <div className="d-flex align-items-center mr-4">
            <GeoAlt className="mr-2" size={26} style={{ color: "#0047AB" }} />
            <p className="mb-0 font-weight-bold" style={{ fontSize: "12px" }}>
              {partner && partner[0] && partner[0].adresse}
            </p>
          </div>
        </div>
        <div className="bmc-container">
          <Tabs
            style={{ marginLeft: "70px" }}
            activeKey={showDescription ? "description" : "sector"}
            onSelect={(key) => {
              if (key === "description") {
                setShowDescription(true);
                setShowSector(false);
              } else if (key === "sector") {
                setShowDescription(false);
                setShowSector(true);
              }
            }}
          >
            <Tab
              className="bmc-containe"
              eventKey="description"
              title="Description"
            >
              {showDescription && (
                <div className="row mt-3">
                  <div className="col-md-7">
                    <div
                      className="form-group"
                      style={{ marginLeft: "50px", marginTop: "25px" }}
                    >
                      <div className="form-controls-project">
                        <div className="d-flex justify-content-between align-items-center">
                          <h4 className="mb-1 form-controls-label"></h4>
                        </div>
                        <label className="mb-1">
                          {partner &&
                            partner[0] &&
                            partner[0].description &&
                            (partner[0].description.length > 50 ? (
                              <>
                                {showFullDescription ? (
                                  partner[0].description
                                ) : (
                                  <>
                                    {partner[0].description.slice(0, 50)}{" "}
                                    <button
                                      className="btn btn-link"
                                      onClick={() =>
                                        setShowFullDescription(
                                          !showFullDescription
                                        )
                                      }
                                    >
                                      <ArrowRightCircle size={20} />{" "}
                                    </button>
                                  </>
                                )}
                              </>
                            ) : (
                              partner[0].description
                            ))}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Tab>

            <Tab eventKey="sector" title="Secteur d'activité">
              {showSector && (
                <div className="row mt-">
                  <div className="col-md-7">
                    <div
                      className="form-group"
                      style={{ marginLeft: "50px", marginTop: "25px" }}
                    >
                      <div className="form-controls-project">
                        <div className=" d-flex justify-content-between align-items-center">
                          <h4 className="mb-1 form-controls-label"></h4>
                        </div>
                        <label className="mb-1">
                          {partner && partner[0] && partner[0].secteurActivite}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
