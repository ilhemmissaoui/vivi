import React, { useState, useEffect, useCallback } from "react";

import Modal from "react-bootstrap/Modal";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useDispatch, useSelector } from "react-redux";

import {
  addValueToMonthAction,
  editMonthsValueAction,
} from "../../../../../store/actions/BusinessPlanActions";

import { getAllActivitySelector } from "../../../../../store/selectors/BusinessPlanSelectors";

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

const ConfirmationModal = ({
  show,

  onClose,

  setValeurProp,

  setSelectedItemId,

  setSelectedColumnIndex,

  cellsValue,
}) => {
  const [montantName, setMontantName] = useState("");

  const [prixHTValues, setPrixHTValues] = useState(Array(12).fill(0));

  const [volumeDeVenteValues, setVolumeDeVenteValues] = useState(
    Array(12).fill(0)
  );

  const [valeur, setValeur] = useState();

  const dispatch = useDispatch();

  const allData = useSelector(getAllActivitySelector);

  const valueListeId = allData.valueListeId;

  const [monthId, setMonthId] = useState(0);

  const selectedProject = localStorage.getItem("selectedProjectId");

  const monthValue = localStorage.getItem("monthValue");
  const test1 = localStorage.getItem("idChiffreAffaire");
  const test2 = localStorage.getItem("montant");

  const handlePrixHTChange = (index, value) => {
    setPrixHTValues((prevValues) => {
      const updatedValues = [...prevValues];

      updatedValues[index] = value;

      return updatedValues;
    });
  };

  const handleVolumeDeVenteChange = (index, value) => {
    setVolumeDeVenteValues((prevValues) => {
      const updatedValues = [...prevValues];

      updatedValues[index] = value;

      return updatedValues;
    });
  };

  const handleEditMonthValue = () => {
    const montant = {
      JanPrixHt: prixHTValues[0],

      JanVolumeVente: volumeDeVenteValues[0],

      FevPrixHt: prixHTValues[1],

      FrvVolumeVente: volumeDeVenteValues[1],

      MarPrixHt: prixHTValues[2],

      MarVolumeVente: volumeDeVenteValues[2],

      AvrPrixHt: prixHTValues[3],

      AvrVolumeVente: volumeDeVenteValues[3],

      MaiPrixHt: prixHTValues[4],

      MaiVolumeVente: volumeDeVenteValues[4],

      JuinPrixHt: prixHTValues[5],

      JuinVolumeVente: volumeDeVenteValues[5],

      JuilPrixHt: prixHTValues[6],

      JuilVolumeVente: volumeDeVenteValues[6],

      AouPrixHt: prixHTValues[7],

      AouVolumeVente: volumeDeVenteValues[7],

      SeptPrixHt: prixHTValues[8],

      SeptVolumeVente: volumeDeVenteValues[8],

      OctPrixHt: prixHTValues[9],

      OctVolumeVente: volumeDeVenteValues[9],

      NovPrixHt: prixHTValues[10],

      NovVolumeVonte: volumeDeVenteValues[10],

      DecPrixHt: prixHTValues[11],

      DecVolumeVonte: volumeDeVenteValues[11],

      valeur: valeur,
    };
    onClose(); // Close the modal

    dispatch(
      editMonthsValueAction(selectedProject, test1, test2, monthId, montant)
    );
  };

  const handleMontatClick = () => {
    const total = prixHTValues.reduce((sum, prixHT, index) => {
      const volumeVente = volumeDeVenteValues[index];

      if (prixHT && volumeVente) {
        const produit = parseFloat(prixHT) * parseFloat(volumeVente);

        return sum + produit;
      }

      return sum;
    }, 0);

    setValeurProp(total.toString());

    setSelectedItemId(test1); // Set the itemId

    setSelectedColumnIndex(test2); // Set the columnIndex

    onClose(); // Close the modal

    const montant = {
      montantName: montantName,

      JanPrixHt: prixHTValues[0],

      JanVolumeVente: volumeDeVenteValues[0],

      FevPrixHt: prixHTValues[1],

      FrvVolumeVente: volumeDeVenteValues[1],

      MarPrixHt: prixHTValues[2],

      MarVolumeVente: volumeDeVenteValues[2],

      AvrPrixHt: prixHTValues[3],

      AvrVolumeVente: volumeDeVenteValues[3],

      MaiPrixHt: prixHTValues[4],

      MaiVolumeVente: volumeDeVenteValues[4],

      JuinPrixHt: prixHTValues[5],

      JuinVolumeVente: volumeDeVenteValues[5],

      JuilPrixHt: prixHTValues[6],

      JuilVolumeVente: volumeDeVenteValues[6],

      AouPrixHt: prixHTValues[7],

      AouVolumeVente: volumeDeVenteValues[7],

      SeptPrixHt: prixHTValues[8],

      SeptVolumeVente: volumeDeVenteValues[8],

      OctPrixHt: prixHTValues[9],

      OctVolumeVente: volumeDeVenteValues[9],

      NovPrixHt: prixHTValues[10],

      NovVolumeVonte: volumeDeVenteValues[10],

      DecPrixHt: prixHTValues[11],

      DecVolumeVonte: volumeDeVenteValues[11],

      valeur: valeur,
    };

    // let monthValue = localStorage.getItem("monthValue");

    dispatch(addValueToMonthAction(selectedProject, test1, test2, montant));
  };

  const handleNameChange = (event) => {
    setMontantName(event.target.value);

    setValeur(event.target.value); // Update the valeur using the input value
  };

  const [arrayValueId, setArrayValueId] = useState([
    {
      JanPrixHt: 0,
      JanVolumeVente: 0,
    },
    {
      FevPrixHt: 0,
      FrvVolumeVente: 0,
    },
    {
      MarPrixHt: 0,
      MarVolumeVente: 0,
    },
    {
      AvrPrixHt: 0,
      AvrVolumeVente: 0,
    },
    {
      MaiPrixHt: 0,
      MaiVolumeVente: 0,
    },
    {
      JuinPrixHt: 0,
      JuinVolumeVente: 0,
    },
    {
      JuilPrixHt: 0,
      JuilVolumeVente: 0,
    },
    {
      AouPrixHt: 0,
      AouVolumeVente: 0,
    },
    {
      SeptPrixHt: 0,
      SeptVolumeVente: 0,
    },
    {
      OctPrixHt: 0,
      OctVolumeVente: 0,
    },
    {
      NovPrixHt: 0,
      NovVolumeVonte: 0,
    },
    {
      DecPrixHt: 0,
      DecVolumeVonte: 0,
    },
  ]);

  // const [num, setNum] = useState(0);

  const renderValeur = useCallback(() => {
    let test = valueListeId?.find(
      (x) =>
        x.chiffreAffaireActiviteId === cellsValue.idChiffreAffaire &&
        x.montantAnneeId === cellsValue.idMontant
    );
    if (test) {
      if (test.id !== undefined) {
        // Check if test.id is defined
        setMonthId(test.id);
        setArrayValueId([
          {
            JanPrixHt: test.JanPrixHt,
            JanVolumeVente: test.JanVolumeVente,
          },
          {
            FevPrixHt: test.FevPrixHt,
            FrvVolumeVente: test.FrvVolumeVente,
          },
          {
            MarPrixHt: test.MarPrixHt,
            MarVolumeVente: test.MarVolumeVente,
          },
          {
            AvrPrixHt: test.AvrPrixHt,
            AvrVolumeVente: test.AvrVolumeVente,
          },
          {
            MaiPrixHt: test.MaiPrixHt,
            MaiVolumeVente: test.MaiVolumeVente,
          },
          {
            JuinPrixHt: test.JuinPrixHt,
            JuinVolumeVente: test.JuinVolumeVente,
          },
          {
            JuilPrixHt: test.JuilPrixHt,
            JuilVolumeVente: test.JuilVolumeVente,
          },
          {
            AouPrixHt: test.AouPrixHt,
            AouVolumeVente: test.AouVolumeVente,
          },
          {
            SeptPrixHt: test.SeptPrixHt,
            SeptVolumeVente: test.SeptVolumeVente,
          },
          {
            OctPrixHt: test.OctPrixHt,
            OctVolumeVente: test.OctVolumeVente,
          },
          {
            NovPrixHt: test.NovPrixHt,
            NovVolumeVonte: test.NovVolumeVonte,
          },
          {
            DecPrixHt: test.DecPrixHt,
            DecVolumeVonte: test.DecVolumeVonte,
          },
        ]);
      } else {
        setMonthId(0); // Set monthId to 0 or desired default value
        setArrayValueId([
          {
            JanPrixHt: 0,
            JanVolumeVente: 0,
          },
          {
            FevPrixHt: 0,
            FrvVolumeVente: 0,
          },
          {
            MarPrixHt: 0,
            MarVolumeVente: 0,
          },
          {
            AvrPrixHt: 0,
            AvrVolumeVente: 0,
          },
          {
            MaiPrixHt: 0,
            MaiVolumeVente: 0,
          },
          {
            JuinPrixHt: 0,
            JuinVolumeVente: 0,
          },
          {
            JuilPrixHt: 0,
            JuilVolumeVente: 0,
          },
          {
            AouPrixHt: 0,
            AouVolumeVente: 0,
          },
          {
            SeptPrixHt: 0,
            SeptVolumeVente: 0,
          },
          {
            OctPrixHt: 0,
            OctVolumeVente: 0,
          },
          {
            NovPrixHt: 0,
            NovVolumeVonte: 0,
          },
          {
            DecPrixHt: 0,
            DecVolumeVonte: 0,
          },
        ]);
      }
    } else {
      setMonthId(0); // Set monthId to 0 or desired default value
      setArrayValueId([
        {
          JanPrixHt: 0,
          JanVolumeVente: 0,
        },
        {
          FevPrixHt: 0,
          FrvVolumeVente: 0,
        },
        {
          MarPrixHt: 0,
          MarVolumeVente: 0,
        },
        {
          AvrPrixHt: 0,
          AvrVolumeVente: 0,
        },
        {
          MaiPrixHt: 0,
          MaiVolumeVente: 0,
        },
        {
          JuinPrixHt: 0,
          JuinVolumeVente: 0,
        },
        {
          JuilPrixHt: 0,
          JuilVolumeVente: 0,
        },
        {
          AouPrixHt: 0,
          AouVolumeVente: 0,
        },
        {
          SeptPrixHt: 0,
          SeptVolumeVente: 0,
        },
        {
          OctPrixHt: 0,
          OctVolumeVente: 0,
        },
        {
          NovPrixHt: 0,
          NovVolumeVonte: 0,
        },
        {
          DecPrixHt: 0,
          DecVolumeVonte: 0,
        },
      ]);
    }
  }, [cellsValue.idChiffreAffaire, cellsValue.idMontant, valueListeId]);

  useEffect(() => {
    const total = prixHTValues.reduce((sum, prixHT, index) => {
      const volumeVente = volumeDeVenteValues[index];

      if (prixHT && volumeVente) {
        const produit = parseFloat(prixHT) * parseFloat(volumeVente);

        return sum + produit;
      }

      return sum;
    }, 0);

    setValeur(total.toString());
  }, [prixHTValues, volumeDeVenteValues, valeur]);

  useEffect(() => {
    renderValeur();
  }, [renderValeur]);

  useEffect(() => {
    if (valueListeId === undefined) {
      // Value is still undefined, wait for it to be available
      return "im not getting upadated yet !";
    }

    const data = arrayValueId.map((item) => {
      const values = Object.values(item);
      const firstAttributeValue = values[0];
      return firstAttributeValue;
    });

    const datatow = arrayValueId.map((item) => {
      const values = Object.values(item);
      const firstAttributeValue = values[1];
      return firstAttributeValue;
    });

    setPrixHTValues(data);
    setVolumeDeVenteValues(datatow);
  }, [valueListeId, arrayValueId]);

  return (
    <div className="container" style={{ borderRadius: "0" }}>
      <Modal show={show} onHide={onClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Montant Année </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#F2F4FC" }} className="p-4">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell scope="col"></TableCell>

                  <TableCell scope="col">Jan</TableCell>

                  <TableCell scope="col">Feb</TableCell>

                  <TableCell scope="col">Mar</TableCell>

                  <TableCell scope="col">Apr</TableCell>

                  <TableCell scope="col">May</TableCell>

                  <TableCell scope="col">Jun</TableCell>

                  <TableCell scope="col">Jul</TableCell>

                  <TableCell scope="col">Aug</TableCell>

                  <TableCell scope="col">Sep</TableCell>

                  <TableCell scope="col">Oct</TableCell>

                  <TableCell scope="col">Nov</TableCell>

                  <TableCell scope="col">Dec</TableCell>
                </TableRow>
              </TableHead>

              <tbody>
                <TableRow>
                  <TableCell width="150px"> Prix HT </TableCell>

                  {prixHTValues.map((value, index) => (
                    <td key={index} style={{ padding: "0" }}>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) =>
                          handlePrixHTChange(index, e.target.value)
                        }
                        className="form-control"
                        style={{ borderRadius: "0", border: "none" }}
                      />
                    </td>
                  ))}
                </TableRow>

                <TableRow>
                  <StyledTableCell width="150px">
                    Volume de vente
                  </StyledTableCell>

                  {volumeDeVenteValues.map((value, index) => (
                    <td key={index} style={{ padding: "0" }}>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) =>
                          handleVolumeDeVenteChange(index, e.target.value)
                        }
                        className="form-control"
                        style={{ borderRadius: "0", border: "none" }}
                      />
                    </td>
                  ))}
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        </Modal.Body>

        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="btn btn-primary"
            onClick={monthId ? handleEditMonthValue : handleMontatClick}
            style={{ backgroundColor: "#514495" }}
          >
            Valider
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
