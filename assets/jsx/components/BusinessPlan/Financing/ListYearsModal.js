import React, { useState, useEffect } from "react";
import { getAllYearsList } from "../../../../../assets/services/BusinessPlanService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@material-ui/core";

function ListYearsModal({
  selectedYears,
  setSelectedYears,
  updateListOftYears,
  year,
}) {
  const [listOftYears, setListOftYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectedProject = localStorage.getItem("selectedProjectId");

  const fetchYears = async () => {
    try {
      const years = await getAllYearsList(selectedProject);
      /*  const sortedYears = years.data.sort((a, b) =>
        a.Name.localeCompare(b.Name)
      ); */
      setListOftYears(years);
      updateListOftYears(years);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchYears();
  }, [selectedProject]);

  const handleYearCheckboxChange = (yearName) => (e) => {
    if (e.target.checked) {
      setSelectedYears((prev) => [...prev, yearName]);
    } else {
      setSelectedYears((prev) => prev.filter((y) => y !== yearName));
    }
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
          }}
        >
          <CircularProgress color="primary" size={80} />{" "}
          {/* Customize loader */}
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>{/* <TableCell>Années</TableCell> */}</TableRow>
          </TableHead>
          <TableBody>
            <div>
              <div className="form-group mb-3">
                {listOftYears.length === 0 ? (
                  <p
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "17px",
                    }}
                  >
                    Aucune année n'a été ajoutée.
                  </p>
                ) : (
                  <>
                    <ul>
                      {listOftYears.filter((el) =>
                        year?.lietsFinancementEncaisseDecaissement && el
                          ? !year?.lietsFinancementEncaisseDecaissement?.some(
                              (objet2) => el.Name === objet2.AnneeName
                            )
                          : year?.idAnne && el
                          ? !year.idAnne?.some(
                              (objet2) =>
                                el.Name ===
                                objet2.SalaireEtChargeSocialDirigentsName
                            )
                          : year?.idAnnee && el
                          ? !year.idAnnee?.some(
                              (objet2) =>
                                el.Name === objet2.SalaireEtChargeSocialAnneName
                            )
                          : year?.allCollaborateurProjet && el
                          ? !year?.allCollaborateurProjet.some(
                              (objet2) => el.Name === objet2.name
                            )
                          : el
                          ? !year?.some((objet2) => el.Name === objet2.name)
                          : el
                      ).length !== 0 ? (
                        listOftYears
                          .filter((el) =>
                            year?.lietsFinancementEncaisseDecaissement && el
                              ? !year?.lietsFinancementEncaisseDecaissement?.some(
                                  (objet2) => el.Name === objet2.AnneeName
                                )
                              : year?.idAnne && el
                              ? !year.idAnne?.some(
                                  (objet2) =>
                                    el.Name ===
                                    objet2.SalaireEtChargeSocialDirigentsName
                                )
                              : year?.idAnnee && el
                              ? !year.idAnnee?.some(
                                  (objet2) =>
                                    el.Name ===
                                    objet2.SalaireEtChargeSocialAnneName
                                )
                              : year?.allCollaborateurProjet && el
                              ? !year?.allCollaborateurProjet.some(
                                  (objet2) => el.Name === objet2.name
                                )
                              : el
                              ? !year?.some((objet2) => el.Name === objet2.name)
                              : el
                          )
                          .map((year) => (
                            <li key={year.id}>
                              <label
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span style={{ paddingRight: "10px" }}>
                                  {year.Name || year.Name}
                                </span>
                                <input
                                  type="checkbox"
                                  name={year.Name}
                                  value={` ${year + 1}`}
                                  checked={selectedYears.includes(year.Name)}
                                  onChange={handleYearCheckboxChange(year.Name)}
                                />
                              </label>
                            </li>
                          ))
                      ) : (
                        <p
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "17px",
                          }}
                        >
                          Aucune année n'a été ajoutée.
                        </p>
                      )}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default ListYearsModal;
