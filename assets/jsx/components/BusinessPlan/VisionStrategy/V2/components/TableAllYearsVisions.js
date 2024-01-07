import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@material-ui/core";

const TableAllYearsVisions = ({ loader, visions, setLoader }) => {
  const [page, setPage] = useState(0);
  const handlePageChangeNext = () => {
    if (page === visions?.length - 1) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };
  const handlePageChangePrev = () => {
    if (page === 0) {
      setPage(visions?.length - 1);
    } else {
      setPage(page - 1);
    }
  };

  return (
    <div
      style={{
        width: "-80%",
        marginTop: "80px",
      }}
    >
      {loader ? (
        <div className="loader mb-5">
          <BouncingDotsLoader />
        </div>
      ) : (
        <>
          <Table
            style={{
              width: "80%",
              height: "100ù",
              margin: "auto",
              flexShrink: 0,
              borderRadius: "10px",
              border: "1px solid #FCE6E9",
              background: "#FFF",
            }}
          >
            <TableHead>
              <TableRow
                style={{
                  textAlign: "center",
                  color: "#595959",
                  fontFeatureSettings: "'clig' off, 'liga' off",
                  fontFamily: "Roboto",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "100%",
                  letterSpacing: "0.17px",
                  borderRadius: "10px 10px 0px 0px",
                  background: "#FFF8F8",
                  width: "100%",
                }}
              >
                <TableCell
                  className="text-center text-lg font-bold"
                  colSpan={7}
                >
                  Toutes les visions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow
                style={{
                  textAlign: "center",
                  color: "#595959",
                  fontFeatureSettings: "'clig' off, 'liga' off",
                  fontFamily: "Roboto",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "100%" /* 18.59px */,
                  letterSpacing: "0.17px",
                  borderRadius: "10px 10px 0px 0px",
                  background: "#FFF8F8",
                  width: "auto",
                }}
              >
                <TableCell>Année</TableCell>
                <TableCell>Date de Début</TableCell>
                <TableCell>Date de Fin</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Cible</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Coût</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {visions &&
                visions.map((el, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{el.annee || "X"}</TableCell>
                      <TableCell>
                        {el.VisionStrategiesListe[0].dateVisionStrategies.slice(
                          0,
                          10
                        ) || "X"}
                      </TableCell>
                      <TableCell>
                        {el.VisionStrategiesListe[0].actionVision
                          .actionDateFin || "X"}
                      </TableCell>
                      <TableCell>
                        {el.VisionStrategiesListe[0].actionVision.action || "X"}
                      </TableCell>
                      <TableCell>
                        {el.VisionStrategiesListe[0].actionVision.cible || "X"}
                      </TableCell>
                      <TableCell>
                        {el.VisionStrategiesListe[0].objectifVision
                          .description || "X"}
                      </TableCell>
                      <TableCell>
                        {`€ ${el.VisionStrategiesListe[0].coutVision.cout}` ||
                          "X"}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default TableAllYearsVisions;
