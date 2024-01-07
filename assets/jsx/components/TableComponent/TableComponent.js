import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TableComponent = ({ data, total, onAddCharge, header }) => {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: "#2C2C2C",
      fontWeight: "bold",
      fontSize: 15,
      textTransform: "uppercase",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      fontWeight: "bold",
      "&:first-of-type": {
        fontWeight: "normal",
        textAlign: "left",
      },
    },

    [`&.${tableCellClasses.footer}`]: {
      backgroundColor: "rgba(196,209,236,0.3)",
      color: "#2C2C2C",
      fontWeight: "bold",
      fontSize: 17,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({}));
  const StyledTable = styled(Table)(({ theme }) => ({
    borderColor: "#707070",
    borderWidth: 0.2,
    borderCollapse: "collapse",

    "& th, & td": {
      borderColor: "#707070",
      borderWidth: 0.2,
    },
  }));
  const rows = data.slice(0, -1);
  const footerData = data[data.length - 1];
  return (
    <TableContainer className="rounded-[5px]">
      <StyledTable sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {header.map((headerProp) => (
              <StyledTableCell align="center" key={headerProp}>
                {headerProp}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              {Object.entries(row).map(([key, cellValue], cellIndex) => (
                <StyledTableCell
                  key={cellIndex}
                >
                  {cellValue}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
          <StyledTableRow>
            {Object.entries(footerData).map(([key, cellValue], cellIndex) => (
              <StyledTableCell
                key={cellIndex}
                align={cellIndex === 0 ? "left" : "center"}
                className={cellIndex === 0 ? "first-column" : ""}
                component={cellIndex === 0 ? "th" : "td"}
                variant="footer"
                scope={cellIndex === 0 ? "row" : null}
              >
                {cellValue}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};
export default TableComponent;
