import React, { useState, useRef, useEffect } from "react";
import IconMoon from "../Icon/IconMoon";
import { IconButton, CircularProgress } from "@mui/material";
import { getAllYearsList } from "../../../services/BusinessPlanService";

const YearPicker = ({ selectedYear, handleYearChange, className }) => {
  const [listOfYears, setListOfYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const selectedProject = localStorage.getItem("selectedProjectId");
  const selectRef = useRef(null);

  const fetchYears = async () => {
    try {
      const years = await getAllYearsList(selectedProject);
      setListOfYears(years);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchYears();
  }, [selectedProject]);

  return (
    <div className={`flex justify-center items-center  ${className}`}>
      {/* <label className="mb-0">
        <IconButton onClick={toggleAddYearPopup}>
          <IconMoon name="plus-basic" color="#2C2C2C" size={20} />
        </IconButton>
      </label> */}
      {isLoading ? (
        <CircularProgress color="primary" size={20} />
      ) : (
        isOpen && (
          <div className="relative">
            <select
              ref={selectRef}
              value={selectedYear}
              onChange={handleYearChange}
              className="bg-light-gray border-none open text-[#6e6e6e]"
            >
              {listOfYears.length && (
                <option value="" disabled hidden>
                  Année
                </option>
              )}
              <optgroup className="">
                {listOfYears.length === 0 ? (
                  <option>Aucune année ajoutée</option>
                ) : (
                  listOfYears.map((year) => (
                    <option
                      key={year.id}
                      value={year.Name}
                      className=" text-[12px] text-[#1A1E33]"
                    >
                      {year.Name}
                    </option>
                  ))
                )}
              </optgroup>
            </select>
          </div>
        )
      )}
    </div>
  );
};

export default YearPicker;
