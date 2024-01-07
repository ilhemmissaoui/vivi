import React, { useEffect, useState } from "react";
import IconMoon from "../Icon/IconMoon";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessModelInfoLoader } from "../../../store/selectors/BusinessModelSelectors";
import { getBusinessModelInfoAction } from "../../../store/actions/BusinessModelActions";
import BoxTwo from "../Box/BoxTwo";
import { Link } from "react-router-dom";

const bmcParams = [
  {
    id: 1,
    param: "segmentClient",
  },
  {
    id: 2,
    param: "propositionValeur",
  },
  {
    id: 3,
    param: "canauxDistribution",
  },
  {
    id: 4,
    param: "relationClient",
  },
  {
    id: 5,
    param: "fluxRevenus",
  },
  {
    id: 6,
    param: "resourceCles",
  },
  {
    id: 7,
    param: "activiteCles",
  },
  {
    id: 8,
    param: "partenaireStratedique",
  },
  {
    id: 9,
    param: "structureCouts",
  },
];
const BusinessModelResult = () => {
  const selectedProject = localStorage.getItem("selectedProjectId");
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  const bmcInfo = useSelector((state) => state.bmc.bmcInfo.busnessModelinfo);
  const businessModelInfoLoader = useSelector(getBusinessModelInfoLoader);

  const selectedprojecttt = useSelector(
    (state) => state.project.selectedProject
  );

  useEffect(() => {
    dispatch(getBusinessModelInfoAction(selectedProject));
  }, [selectedprojecttt]);

  return (
    <>
      <BoxTwo
        handlePrevStep={handlePrevStep}
        step={step}
        title={"Business Model Canvas"}
      />
      {businessModelInfoLoader ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        <div>
          <div className="bmc-grid-wrapper">
            <Container className="bmc-grid-container">
              <Row
                style={{
                  minHeight: "calc(67% - 5px)",
                  height: "auto",
                }}
              >
                <Col id="8" className="bmc-grid">
                  <Link to={"/business-model"}>
                    <div className="bmc-result-title-header">
                      <span className="bmc-grid-title">
                        Partenaires stratégiques
                      </span>
                      <IconMoon
                        className="bmc-grid-title-icon"
                        color="#352853"
                        name="people-link"
                        size={24}
                      />
                    </div>
                    <br />

                    <span className="">
                      {bmcInfo && bmcInfo.partenaireStratedique}
                    </span>
                  </Link>
                </Col>

                <Col
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    backgroundColor: "#fff7d8",
                    paddingBottom: "10px",
                  }}
                >
                  <Row
                    id="7"
                    style={{
                      height: "calc(50% - 20px)",
                      backgroundColor: "#fff7d8",
                    }}
                  >
                    <Link to={"/business-model"}>
                      <div className="bmc-result-title-header">
                        <span className="bmc-grid-title">Activités clés</span>
                        <IconMoon
                          className="bmc-grid-title-icon"
                          color="#352853"
                          name="key"
                          size={24}
                        />
                      </div>
                      <br />

                      <span className="">
                        {bmcInfo && bmcInfo.activiteCles}
                      </span>
                    </Link>
                  </Row>
                  <Row
                    id="6"
                    style={{
                      height: "calc(50% - 20px)",
                      backgroundColor: "#fff7d8",
                    }}
                  >
                    <Link to={"/business-model"}>
                      <div className="bmc-result-title-header">
                        <span className="bmc-grid-title">Ressources clés</span>
                        <IconMoon
                          className="bmc-grid-title-icon"
                          color="#352853"
                          name="settings"
                          size={24}
                        />
                      </div>
                      <br />
                      <span className="">
                        {bmcInfo && bmcInfo.resourceCles}
                      </span>
                    </Link>
                  </Row>
                </Col>
                <Col
                  id="2"
                  style={{ marginRight: "10px", backgroundColor: "#fff7d8" }}
                >
                  <Link to={"/business-model"}>
                    <div className="bmc-result-title-header">
                      <span className="bmc-grid-title">
                        Propositions de valeur
                      </span>
                      <IconMoon
                        className="bmc-grid-title-icon"
                        color="#352853"
                        name="hand-diamond"
                        size={24}
                      />
                    </div>
                    <br />
                    <span className="">
                      {bmcInfo && bmcInfo.propositionValeur}
                    </span>
                  </Link>
                </Col>
                <Col style={{ marginLeft: "10px", backgroundColor: "#fff7d8" }}>
                  <Row
                    id="4"
                    style={{
                      height: "calc(50% - 5px)",
                      backgroundColor: "#fff7d8",
                    }}
                  >
                    <Link to={"/business-model"}>
                      <div className="bmc-result-title-header">
                        <span className="bmc-grid-title">
                          Relations clients
                        </span>
                        <IconMoon
                          className="bmc-grid-title-icon"
                          color="#352853"
                          name="shake-hand"
                          size={24}
                        />
                      </div>
                      <br />
                      <span className="">
                        {bmcInfo && bmcInfo.relationClient}
                      </span>
                    </Link>
                  </Row>
                  <Row
                    id="3"
                    style={{
                      height: "calc(50% - 5px)",
                      backgroundColor: "#fff7d8",
                      marginBottom: "10px",
                    }}
                  >
                    <Link to={"/business-model"}>
                      <div className="bmc-result-title-header">
                        <span className="bmc-grid-title">
                          Canaux de distribution
                        </span>
                        <IconMoon
                          className="bmc-grid-title-icon"
                          color="#352853"
                          name="canaux"
                          size={24}
                        />
                      </div>
                      <br />
                      <span className="">
                        {bmcInfo && bmcInfo.canauxDistribution}
                      </span>
                    </Link>
                  </Row>
                </Col>
                <Col
                  id="1"
                  style={{ marginLeft: "10px", backgroundColor: "#fff7d8" }}
                >
                  <Link to={"/business-model"}>
                    <div className="bmc-result-title-header">
                      <span className="bmc-grid-title">Segments clients</span>
                      <IconMoon
                        className="bmc-grid-title-icon"
                        color="#352853"
                        name="people"
                        size={24}
                      />
                    </div>
                    <br />
                    <span className="">{bmcInfo && bmcInfo.segmentClient}</span>
                  </Link>
                </Col>
              </Row>
              <Row
                style={{
                  minHeight: "calc(33% - 5px)",
                  marginTop: "10px",
                  height: "auto",
                }}
              >
                <Col
                  id="9"
                  style={{ marginRight: "10px", backgroundColor: "#fff7d8" }}
                >
                  <Link to={"/business-model"}>
                    <div className="bmc-result-title-header">
                      <span className="bmc-grid-title">Structure de couts</span>
                      <IconMoon
                        className="bmc-grid-title-icon"
                        color="#352853"
                        name="structure"
                        size={24}
                      />
                    </div>
                    <br />
                    <span className="">
                      {bmcInfo && bmcInfo.structureCouts}
                    </span>
                  </Link>
                </Col>
                <Col
                  id="5"
                  style={{ marginLeft: "10px", backgroundColor: "#fff7d8" }}
                >
                  <Link to={"/business-model"}>
                    <div className="bmc-result-title-header">
                      <span className="bmc-grid-title">Flux de revenus</span>
                      <IconMoon
                        className="bmc-grid-title-icon"
                        color="#352853"
                        name="money"
                        size={24}
                      />
                    </div>
                    <br />
                    <span className="">{bmcInfo && bmcInfo.fluxRevenus}</span>
                  </Link>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessModelResult;
