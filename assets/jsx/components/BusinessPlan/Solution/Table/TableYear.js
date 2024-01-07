import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconMoon from "../../../Icon/IconMoon";
import { useHistory } from "react-router-dom";
const TableYear = ({ solution }) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const handleEdit = (solutionId) => {
    localStorage.setItem("idSolution", solutionId);
    history.push("solution");
  };
  return (
    <div className="mt-5">
      <TableContainer component={Paper} className="overflow-hidden">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="table-cell-title">
                <div className="flex gap-3">
                  {solution.name}
                  <div
                    onClick={() => setIsOpen(true)}
                    className="cursor-pointer"
                  >
                    <IconMoon color="#514495" name="plus1" size={27} />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solution?.chiffreAffaireListe.map((item) => (
              <TableRow
                key={item.chiffreAffaireActiviteId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="table-cell-body"
                >
                  {item.chiffreAffaireActiviteName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {solution?.chiffreAffaireListe.length === 0 && (
        <div className="mt-3 text-red-500">
          Aucune activité n'a été ajoutée pour cette solution. Cliquez sur (+)
          pour en ajouter une.
        </div>
      )}
      <button onClick={() => handleEdit(solution.id)} style={{ width: "100%" }}>
        <div className="flex justify-end">
          <p className="text-right text-base font-medium text-[#514495] underline mt-2">
            Voir détails
          </p>
        </div>
      </button>
      <div
        className={`modal fade bd-example-modal-sm ${isOpen ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        aria-hidden={!isOpen}
        style={{ display: isOpen ? "block" : "none" }}
        centered="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="flex justify-center items-center">
                Tu seras redirigé vers la page 'Chiffre d'affaires prévisionnel'
                pour pouvoir ajouter une nouvelle activité.
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" onClick={() => setIsOpen(false)}>
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-footer">
              <button
                className="button-style-annuler"
                onClick={() => setIsOpen(false)}
              >
                Annuler
              </button>
              <button
                className="button-style"
                onClick={() => history.push("/chiffre-affaire")}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableYear;
