import React, { useState, useEffect } from "react";
import { getPartnersAction } from "../../store/actions/PartnerAction";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CreatePartnerPrompt from "../components/childComponents/CreatePartner";
import Box from "../components/Box/Box";
import IconMoon from "../components/Icon/IconMoon";
import noCoverImage from "/assets/images/nocover.jpg";

const PartnerCard = ({ partner }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="col-md-4 mb-4">
      <div className={`card ${hovered ? "border border-warning" : "border"}`}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 text-right">
              {partner.logo ? (
                <img
                  className="card-img-top img-fluid max-img-height rounded text-center"
                  src={partner.logo}
                  alt="Cover Image"
                  style={{ maxWidth: "80px", margin: "0 auto" }}
                />
              ) : (
                <div className="col-md-6 ">
                  <img
                    src={noCoverImage}
                    alt="No Cover Image"
                    style={{
                      maxWidth: "80px",
                      marginRight: "17px",
                      borderRadius: "20px",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="col-md-6 text-right">
              <Link
                to={`/partner_details/${partner.id}`}
                className="btn btn-light mt-2"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  transition:
                    "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  (e.target.style.backgroundColor = "#ffcf6d"),
                    (e.target.style.color = "#ffff");
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "black";
                  e.target.style.border = "1px solid rgba(0, 0, 0, 0.2)";
                  e.target.style.transition =
                    "background-color 0.3s ease-in-out, color 0.3s ease-in-out";
                }}
              >
                Découvrir
              </Link>
            </div>
          </div>

          <h5 className="card-title font-weight-bold mt-3 text-left">
            {partner.NomSociete}
          </h5>
          <p className="card-text text-left">{partner.description}</p>
        </div>
      </div>
    </div>
  );
};

const ListPartner = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const filteredPartners = partners.length
    ? partners?.filter((partner) =>
        partner.NomSociete.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await dispatch(getPartnersAction());
        setPartners(response);
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    function handleResize() {
      // Check screen width and apply scroll behavior if needed
      if (window.innerWidth < 1000) {
        document.body.style.overflow = "scroll";
      } else {
        document.body.style.overflow = "initial";
      }
    }

    // Call the resize handler initially and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

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

  return (
    <div>
      <Box title={"Les Partenaires"} titlePosition="right" />

      <div className="bmc-container">
        <div
          className="py-4"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to={`create-partner`} style={{ textDecoration: "none" }}>
            <button type="submit" className="create-partner-button">
              <IconMoon color="#ffffff" name="partners1" size={23} />
              &nbsp;&nbsp; Devenir partenaire
            </button>
          </Link>

          <div>
            <input
              title="activitÃ©"
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              className="search-bar"
              placeholder="Rechercher..."
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                borderRadius: "7px",
                width: "300px",
                marginRight: "50px",
              }}
            />
          </div>
        </div>
        <div className="partner-container">
          {filteredPartners.length > 0 ? (
            <div className="row">
              {filteredPartners.map((partner, index) => (
                <PartnerCard key={index} partner={partner} />
              ))}
            </div>
          ) : (
            <div>
              <CreatePartnerPrompt />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListPartner;
