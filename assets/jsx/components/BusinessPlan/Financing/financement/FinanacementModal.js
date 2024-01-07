import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  addMonthEncaissDecaiss,
  getEcaissement,
} from "../../../../../services/BusinessPlanService";

function FinancementModal({
  show,
  onClose,
  listEncaissement,
  listData,
  anneeId,
}) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const selectedProject = localStorage.getItem("selectedProjectId");

  const values = (x, y) => {
    switch (x) {
      case 0:
        return listEncaissement[y]?.MonthListeValue?.[0]?.Jan;
      case 1:
        return listEncaissement[y]?.MonthListeValue?.[0]?.Frv;
      case 2:
        return listEncaissement[y]?.MonthListeValue?.[0]?.Mar;
      case 3:
        return listEncaissement[y]?.MonthListeValue?.[0]?.Avr;
      case 4:
        return listEncaissement[y]?.MonthListeValue?.[0]?.Mai;
      case 5:
        return listEncaissement[y]?.MonthListeValue?.[0]?.Juin;
      case 6:
        return listEncaissement[y]?.MonthListeValue?.[0]?.Juil;
      case 7:
        return listEncaissement[y]?.MonthListeValue?.[0]?.Aou;
      case 8:
        return listEncaissement[y]?.MonthListeValue?.[0]?.Sept;
      case 9:
        return listEncaissement[y]?.MonthListeValue?.[0]?.Oct;
      case 10:
        return listEncaissement[y]?.MonthListeValue?.[0]?.Nov;
      case 11:
        return listEncaissement[y]?.MonthListeValue?.[0]?.Dece;
      default:
        return null;
    }
  };

  const monthNames = [
    "montantJan",
    "montantFrv",
    "montantMar",
    "montantAvr",
    "montantMai",
    "montantJuin",
    "montantJuil",
    "montantAou",
    "montantSept",
    "montantOct",
    "montantNov",
    "montantDece",
  ];

  const moActualNames = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Jui",
    "Aou",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [inputValues, setInputValues] = useState();

  const changeValues = () => {
    let updatedInputValues = [];
    listEncaissement?.forEach((charge, index) => {
      const chargeValues = {};

      monthNames.forEach((month, ex) => {
        chargeValues[month] = values(ex, index) || 0;
      });
      updatedInputValues.push(chargeValues);
    });

    setInputValues(updatedInputValues);
    return updatedInputValues;
  };

  useEffect(async () => {
    await changeValues();
  }, [listEncaissement]);

  useEffect(() => {}, [inputValues]);

  const handleInputChange = (chargeId, month, value) => {
    setInputValues((prevInputValues) => {
      const updatedChargeValues = {
        ...prevInputValues[chargeId],
        [month]: Number(value),
      };

      return {
        ...prevInputValues,
        [chargeId]: updatedChargeValues,
      };
    });
  };

  const handleAddEdit = async () => {
    const chargeMonthsData = {};

    let newObj = {};
    listEncaissement.map((el, index) => {
      newObj = { ...newObj, [el.EncaisseDecaissementId]: inputValues[index] };
    });
    await addMonthEncaissDecaiss(selectedProject, anneeId, newObj);

    await listData();
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title colSpan={moActualNames.length + 1}>
          {" "}
          Financement - Année
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#F2F4FC" }} className="p-4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#ffff" }}>
                <TableCell scope="col">ENCAISSEMENTS</TableCell>
                {moActualNames.map((month) => (
                  <TableCell scope="col" key={month}>
                    {month}
                  </TableCell>
                ))}
                <TableCell
                  style={{
                    padding: "12px 15px",
                    fontSize: "14px",
                  }}
                >
                  Total{" "}
                </TableCell>
              </TableRow>
            </TableHead>

            <tbody>
              {listEncaissement?.map((charge, chargeIndex) => (
                <TableRow key={charge.EncaisseDecaissementId}>
                  <TableCell width="150px">
                    {charge.EncaisseDecaissementName}
                  </TableCell>

                  {monthNames.map((month, indexMonth) => (
                    <td key={month} style={{ padding: "0" }}>
                      <input
                        type="number"
                        className="form-control"
                        style={{
                          borderRadius: "0",
                          border: "none",
                          fontSize: "14px",
                        }}
                        value={
                          inputValues[chargeIndex] &&
                          inputValues[chargeIndex][month]
                        }
                        onChange={(e) =>
                          handleInputChange(chargeIndex, month, e.target.value)
                        }
                      />
                    </td>
                  ))}
                  <td style={{ padding: "0" }}>
                    <div>
                      {(charge.MonthListeValue &&
                        charge.MonthListeValue[0]?.AllMonthValue) ||
                        0}
                    </div>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Modal.Body>

      <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="px-4 py-2 bg-[#514495] rounded-lg text-white"
          onClick={handleAddEdit}
        >
          Valider
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default FinancementModal;
