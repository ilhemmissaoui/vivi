import React, { useState, useEffect, useRef } from "react";
import {
  editedDataPerYear,
  fetchDataPerYear,
} from "../../../../../store/actions/TableauxFinancierActions";
import { useDispatch } from "react-redux";
export default function TresorerieTable({
  TresData,
  selectProject,
  selectedAnneeId,
}) {
  const printableRef = useRef(null);
  // Check if TresData exists and has data
  if (!TresData) {
    return null; // Return null or a loading indicator if data is not available yet
  }
  // Get the categories (e.g., "ChiffreAffaire," "apports," "c_c_associe," etc.)
  const categories = Object.keys(TresData);

  // Define a function to filter out properties with "id" and "Total"
  const filterProperties = (obj) => {
    return Object.keys(obj)
      .filter((key) => key !== "id" && key !== "Total")
      .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {});
  };

  // Create a state variable to store edited values
  const [editedValues, setEditedValues] = useState({});

  // Initialize editableTresData with a copy of TresData
  const [editableTresData, setEditableTresData] = useState({ ...TresData });

  // Function to handle value changes
  const handleValueChange = (category, month, newValue) => {
    setEditedValues({
      ...editedValues,
      [category]: {
        ...(editedValues[category] || {}),
        [month]: newValue,
      },
    });
  };

  // Reset editedValues when TresData changes
  useEffect(() => {
    setEditedValues({});
  }, [TresData]);

  const dispatch = useDispatch();

  // Function to handle saving changes
  const handleSaveChanges = async () => {
    try {
      const newEditableTresData = { ...editableTresData };

      for (const categoryName in editedValues) {
        const categoryID = TresData[categoryName].id;

        if (categoryID) {
          if (!(categoryID in newEditableTresData)) {
            newEditableTresData[categoryID] = {};
          }
          for (const month in editedValues[categoryName]) {
            newEditableTresData[categoryID][month] =
              editedValues[categoryName][month];
          }
        }
      }

      setEditableTresData(newEditableTresData);

      // Dispatch the first action
      await dispatch(
        editedDataPerYear(selectProject, selectedAnneeId, newEditableTresData)
      );

      // After the first action is dispatched successfully, dispatch the second action
      dispatch(fetchDataPerYear(selectProject, selectedAnneeId));
    } catch (error) {
      // Handle any errors that occur during the dispatch of the first action
      console.error("Error dispatching editedDataPerYear:", error);
    }
  };
  const handleSavePdf = async () => {
    try {
      const newEditableTresData = { ...editableTresData };

      for (const categoryName in editedValues) {
        const categoryID = TresData[categoryName].id;

        if (categoryID) {
          if (!(categoryID in newEditableTresData)) {
            newEditableTresData[categoryID] = {};
          }
          for (const month in editedValues[categoryName]) {
            newEditableTresData[categoryID][month] =
              editedValues[categoryName][month];
          }
        }
      }

      setEditableTresData(newEditableTresData);
      // Dispatch the first action
      await dispatch(
        editedDataPerYear(selectProject, selectedAnneeId, newEditableTresData)
      );

      // After the first action is dispatched successfully, dispatch the second action
      dispatch(fetchDataPerYear(selectProject, selectedAnneeId));
    } catch (error) {
      // Handle any errors that occur during the dispatch of the first action
      console.error("Error dispatching editedDataPerYear:", error);
    }
    // After saving changes, you can trigger the print
    printContent();
  };
  // Function to print the content
  const printContent = () => {
    const content = printableRef.current;

    // Create a new window or iframe
    const printWindow = window.open("", "_blank");
    printWindow.document.open();

    // Add the table content to the new window or iframe
    printWindow.document.write(
      "<html><head><title>Table Content</title></head><body>"
    );
    printWindow.document.write(
      '<table class="table" aria-label="simple table">'
    );
    printWindow.document.write("<thead>");
    printWindow.document.write("<tr>");
    printWindow.document.write('<th align="center"></th>');
    printWindow.document.write("<th>Jan</th>");
    // ... Include the rest of the table headers here
    printWindow.document.write("</tr>");
    printWindow.document.write("</thead>");
    printWindow.document.write("<tbody>");

    // Loop through categories and add table rows
    categories.forEach((categoryName) => {
      const category = TresData[categoryName];
      const dataWithoutIdAndTotal = filterProperties(category);

      printWindow.document.write("<tr>");
      printWindow.document.write(`<th scope="row">${categoryName}</th>`);

      // Loop through table data for this category
      Object.entries(dataWithoutIdAndTotal).forEach(([month, value]) => {
        printWindow.document.write(
          `<td>${editedValues[categoryName]?.[month] || value}</td>`
        );
      });

      printWindow.document.write("</tr>");
    });

    printWindow.document.write("</tbody>");
    printWindow.document.write("</table>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();

    // Print the newly created window or iframe
    printWindow.print();
    printWindow.onafterprint = () => {
      printWindow.close(); // Close the window or iframe after printing
    };
  };

  return (
    <div ref={printableRef}>
      <table className="table" aria-label="simple table">
        <thead>
          <tr>
            <th align="center"></th>
            <th>Jan</th>
            <th>Frv</th>
            <th>Mar</th>
            <th>Avr</th>
            <th>Mai</th>
            <th>Juin</th>
            <th>Juil</th>
            <th>Aou</th>
            <th>Sept</th>
            <th>Oct</th>
            <th>Nov</th>
            <th>Dece</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((categoryName) => {
            const category = TresData[categoryName];
            const dataWithoutIdAndTotal = filterProperties(category);

            return (
              <tr
                key={categoryName}
                className={`border-b-2 border-gray-200 ${
                  category.id ? "text-black font-bold" : ""
                } ${
                  [
                    "Encaissements",
                    "Décaissements",
                    "Variation",
                    "Solde",
                  ].includes(categoryName)
                    ? "bg-[#DAD7E9] font-extrabold"
                    : ""
                }`}
              >
                <th scope="row">{categoryName}</th>
                {Object.entries(dataWithoutIdAndTotal).map(
                  ([month, value], index) => (
                    <td key={index}>
                      {category.id ? (
                        <input
                          className={`styled-input bg-transparent${
                            category.id
                              ? " text-gray-600 font-bold text-center"
                              : ""
                          }`}
                          type="number"
                          value={
                            editedValues[categoryName]?.[month] !== undefined
                              ? editedValues[categoryName]?.[month]
                              : value !== undefined
                              ? value
                              : ""
                          }
                          onChange={(e) =>
                            handleValueChange(
                              categoryName,
                              month,
                              e.target.value
                            )
                          }
                          style={{
                            width: "3rem",
                            height: "3rem",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        />
                      ) : (
                        value
                      )}
                    </td>
                  )
                )}
              </tr>
            );
          })}
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
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 rounded focus:outline-none"
          style={{ backgroundColor: "#514495", marginInline: "0.5rem" }}
          onClick={handleSavePdf}
          id="print-button" // Add an ID to the print button
        >
          pdf
        </button>
      </div>
    </div>
  );
}
