import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Table, TableBody, TableHead, TableRow } from "@material-ui/core";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  getAllExternalChargesSelector,
  getOneChareActionActionSelector,
} from "../../../../../store/selectors/BusinessPlanSelectors";
import {
  addMonthsValuesAction,
  getOneChareActionAction,
} from "../../../../../store/actions/BusinessPlanActions";
import Paper from "@mui/material/Paper";
import { TableContainer } from "@mui/material";
import { styled } from "@mui/material/styles";
function ChargeExterneModal({ show, onClose, cellsValue }) {
  const { idMontant } = cellsValue;
  const [ChargeExt, setChargeExt] = useState([]);
  const [monthValeurListe, setMonthValeurListe] = useState([]);

  const dispatch = useDispatch();
  const allData = useSelector(getAllExternalChargesSelector);
  const oneYear = useSelector(getOneChareActionActionSelector);

  const selectedProject = localStorage.getItem("selectedProjectId");
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  useEffect(() => {
    dispatch(getOneChareActionAction(selectedProject, idMontant));
  }, [dispatch, selectedProject, idMontant]);

  useEffect(() => {
    if (oneYear && oneYear.monthValeurListe) {
      setMonthValeurListe(oneYear.monthValeurListe);
    }
  }, [oneYear]);

  useEffect(() => {
    if (allData && allData.ChargeExt) {
      setChargeExt(allData.ChargeExt);
    }
  }, [allData]);

  // State to store the input values for each charge
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    // Initialize inputValues state with existing values from monthValeurListe
    const initialInputValues = {};
    ChargeExt.forEach((charge) => {
      const chargeValues =
        monthValeurListe.find((val) => val.chargeExtId === charge.id) || {};
      initialInputValues[charge.id] = {
        montantJan: chargeValues.Jan || 0,
        montantFrv: chargeValues.Frv || 0,
        montantMar: chargeValues.Mar || 0,
        montantAvr: chargeValues.Avr || 0,
        montantMai: chargeValues.Mai || 0,
        montantJuin: chargeValues.Juin || 0,
        montantJuil: chargeValues.Juil || 0,
        montantAou: chargeValues.Aou || 0,
        montantSept: chargeValues.Sept || 0,
        montantOct: chargeValues.Oct || 0,
        montantNov: chargeValues.Nov || 0,
        montantDece: chargeValues.Dece || 0,
      };
    });
    setInputValues(initialInputValues);
  }, [ChargeExt, monthValeurListe]);

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

  // Update inputValues when oneYear changes (i.e., after fetching data)
  useEffect(() => {
    if (oneYear && oneYear.monthValeurListe) {
      setMonthValeurListe(oneYear.monthValeurListe);
      // Reinitialize inputValues state with updated values from monthValeurListe
      const updatedInputValues = {};
      ChargeExt.forEach((charge) => {
        const chargeValues =
          oneYear.monthValeurListe.find(
            (val) => val.chargeExtId === charge.id
          ) || {};
        updatedInputValues[charge.id] = {
          montantJan: chargeValues.Jan || 0,
          montantFrv: chargeValues.Frv || 0,
          montantMar: chargeValues.Mar || 0,
          montantAvr: chargeValues.Avr || 0,
          montantMai: chargeValues.Mai || 0,
          montantJuin: chargeValues.Juin || 0,
          montantJuil: chargeValues.Juil || 0,
          montantAou: chargeValues.Aou || 0,
          montantSept: chargeValues.Sept || 0,
          montantOct: chargeValues.Oct || 0,
          montantNov: chargeValues.Nov || 0,
          montantDece: chargeValues.Dece || 0,
        };
      });
      setInputValues(updatedInputValues);
    }
  }, [ChargeExt, oneYear]);

  const handleInputChange = (chargeId, month, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [chargeId]: {
        ...prevInputValues[chargeId],
        [month]: value,
      },
    }));
  };
  /*  const calculateRowSum = (chargeId) => {
    const chargeValues = inputValues[chargeId] || {};
    return Object.values(chargeValues).reduce(
      (sum, value) => (sum += parseFloat(value) || 0),
      0
    );
  }; */

  const handleAddEdit = async () => {
    const chargeMonthsData = {};

    // Iterate over each charge and its input values
    Object.entries(inputValues).forEach(([chargeId, chargeValues]) => {
      // Create an object for each charge's data
      const chargeData = {};
      Object.entries(chargeValues).forEach(([month, value]) => {
        chargeData[month] = value;
      });

      // Add the charge data to the chargeMonthsData object
      chargeMonthsData[chargeId] = chargeData;
    });

    await dispatch(
      addMonthsValuesAction(
        selectedProject,
        cellsValue.idChargeExt,
        cellsValue.idMontant,
        chargeMonthsData
      )
    );
    dispatch(getOneChareActionAction(selectedProject, idMontant));
    // Close the modal
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered size="xl">
      <Modal.Header closeButton>
        {/* Center the text "CHARGS EXTERNES" in the Modal.Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            color: "#514495",
            fontSize: "17px",
            marginTop: "50px",
          }}
        >
          <Modal.Title colSpan={moActualNames.length + 1}>
            {" "}
            Dépenses - Année
          </Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#F2F4FC" }} className="p-4">
        <TableContainer component={Paper}>
          {/* Wrap the Table in a div and set its width and center it */}
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#ffff" }}>
                <TableCell scope="col">ANNÉE</TableCell>
                {moActualNames.map((month) => (
                  <TableCell scope="col" key={month}>
                    {month}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <tbody>
              {ChargeExt.map((charge, chargeIndex) => (
                <TableRow key={charge.id}>
                  <TableCell width="150px">{charge.name}</TableCell>

                  {monthNames.map((month) => (
                    <td key={month} style={{ padding: "0" }}>
                      <input
                        type="number"
                        className="form-control"
                        style={{
                          borderRadius: "0",
                          border: "none",
                          fontSize: "14px",
                        }}
                        value={inputValues[charge.id]?.[month]}
                        onChange={(e) =>
                          handleInputChange(charge.id, month, e.target.value)
                        }
                      />
                    </td>
                  ))}
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Modal.Body>

      <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="btn btn-primary"
          style={{ backgroundColor: "#514495" }}
          onClick={handleAddEdit}
        >
          Valider
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChargeExterneModal;
