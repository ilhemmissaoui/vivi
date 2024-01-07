import React from "react";

export default function ResultatCompte({ ResultatData, TresAnnees }) {
  const annéeLabels = TresAnnees.map((année) => année.Name);

  return (
    <table style={{ marginTop: "24px" }}>
      <thead>
        <tr>
          <th align="center"></th>
          {annéeLabels.map((annéeLabel, index) => (
            <th key={index} style={{ textAlign: "center" }}>
              {annéeLabel}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(ResultatData).map((name, rowIndex) => (
          <tr
            className={`${
              [
                "Total des produits d'exploitation",
                "Total des charges d'exploitation",
                "Résultat d'exploitation",
                "Résultat courant avant impôts",
                "Résultat de l'exercice",
              ].includes(name)
                ? "bg-[#DAD7E9] font-extrabold"
                : ""
            }`}
            key={name}
            style={{ height: "36px", borderTop: "solid 1px" }}
          >
            <th scope="row" className="pl-6">
              {name}
            </th>
            {ResultatData[name].map((annéeValue, colIndex) => (
              <td key={colIndex} align="center">
                {annéeValue}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
