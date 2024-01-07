import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  editedPlanFinancier,
  fetchPlanFinancier,
} from "../../../../../store/actions/TableauxFinancierActions";

export default function PlanFinancier({
  ResultatData,
  TresAnnees,
  selectProject,
}) {
  const annéeLabels = TresAnnees.map((année) => année.Name);

  // Create a state variable to store edited values as an object
  const [editedValues, setEditedValues] = useState({});
  const dispatch = useDispatch();

  // Function to handle value changes
  const handleValueChange = (categoryName, newValue) => {
    const editedCategory = ResultatData[categoryName];
    if (editedCategory && editedCategory[0]) {
      const editedItem = {
        id: editedCategory[0].id,
        valeur: newValue,
      };
      setEditedValues((prevValues) => ({
        ...prevValues,
        [editedItem.id]: editedItem.valeur,
      }));
    }
  };

  // Function to handle saving changes
  const handleSaveChanges = async () => {
    try {
      // Convert the editedValues object to an array
      const editedValuesArray = Object.entries(editedValues).map(
        ([id, valeur]) => ({
          id,
          valeur,
        })
      );
      // Dispatch the action with the edited values array
      await dispatch(editedPlanFinancier(selectProject, editedValuesArray));
      // After the action is dispatched successfully, you can dispatch the fetch action if needed
      dispatch(fetchPlanFinancier(selectProject));
    } catch (error) {
      // Handle any errors that occur during the dispatch
      console.error("Error dispatching editedPlanFinancier:", error);
    }
  };

  return (
    <div>
      <table style={{ marginTop: "24px", width: "100%" }}>
        <thead>
          <tr>
            <th align="center"></th>
            <th align="center">Initial</th>
            {annéeLabels.map((annéeLabel, index) => (
              <th key={index} style={{ textAlign: "center" }}>
                {annéeLabel}
              </th>
            ))}
          </tr>
          <tr
            style={{
              height: "36px",
              borderTop: "solid 1px",
              borderBottom: "solid 1px",
            }}
          >
            <th className="pl-6 text-[#514495] font-extrabold">BESOIN</th>
            <th align="center"></th>
            {annéeLabels.map((annéeLabel, index) => (
              <th key={index} style={{ textAlign: "center" }}>
                {""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(ResultatData)
            .filter((name) => name !== "BESOIN")
            .map((name, rowIndex) => (
              <tr
                className={`${
                  [
                    "Variation du besoin en fonds de roulement",
                    "Total des besoins",
                    "Total des ressources",
                    "Variation des trésorerie",
                    "Solde de trésorerie",
                  ].includes(name)
                    ? "bg-[#DAD7E9] font-extrabold"
                    : ""
                }`}
                key={name}
                style={{
                  height: "36px",
                  borderTop: "solid 1px",
                  borderBottom: "solid 1px",
                }}
              >
                <td
                  className={`pl-6 ${
                    name === "RESSOURCES" ? "text-[#514495] font-extrabold" : ""
                  } ${
                    [
                      "Total des besoins",
                      "Total des ressources",
                      "Variation des trésorerie",
                      "Solde de trésorerie",
                    ].includes(name)
                      ? "font-extrabold"
                      : ""
                  }`}
                >
                  {name}
                </td>
                <td>
                  <input
                    className={`bg-transparent ${
                      name === "RESSOURCES" ? "text-transparent" : ""
                    } `}
                    type="number"
                    value={
                      editedValues[ResultatData[name][0]?.id] !== undefined
                        ? editedValues[ResultatData[name][0]?.id]
                        : ResultatData[name][0]?.valeur !== undefined
                        ? ResultatData[name][0]?.valeur
                        : ""
                    }
                    onChange={(e) => handleValueChange(name, e.target.value)}
                  />
                </td>
                {(ResultatData[name]?.slice(1) || []).map(
                  (annéeValue, colIndex) => (
                    <td
                      key={colIndex}
                      align="center"
                      className={`${
                        name === "RESSOURCES" ? "text-transparent" : ""
                      } `}
                    >
                      {typeof annéeValue === "object" ? "" : annéeValue}
                    </td>
                  )
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-end items-end my-4 mx-8 px-4">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 rounded focus:outline-none"
          style={{ backgroundColor: "#514495" }}
          onClick={handleSaveChanges}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
