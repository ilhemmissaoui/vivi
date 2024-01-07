import React, { useState, useEffect } from "react";
import Box from "../components/Box/Box";
import { useSelector } from "react-redux";
import RechercheCard from "../components/cards/RechercheCard";
import { getAides } from "../../services/AideService";
const Aides = () => {
  const [effectif, setEffectif] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listAide, setListAide] = useState([]);
  const [allowFetch, setAllowFetch] = useState(true);
  //les aides
  const { aideDataByEffectif } = useSelector((state) => state.aide);
  const handleCheckboxChange = (filter, value = "0") => {
    if (filter === "effectif") {
      if (value === "" || value === "0") {
        // Remove "Effectif" from selectedFilters if the value is empty or 0
        setSelectedFilters(
          selectedFilters.filter((item) => item !== "effectif")
        );
        setEffectif("");
      } else {
        setEffectif(value);
        if (!selectedFilters.includes("effectif")) {
          setSelectedFilters([...selectedFilters, "effectif"]);
        }
      }
    } else {
      if (selectedFilters.includes(filter)) {
        setSelectedFilters(selectedFilters.filter((item) => item !== filter));
      } else {
        setSelectedFilters([...selectedFilters, filter]);
      }
    }
  };

  const isFilterSelected = (filter) => {
    return selectedFilters.includes(filter);
  };
  // Filter the aideData based on selected filters
  const filteredAideData =
    selectedFilters.length === 0
      ? listAide
      : listAide.filter((aide) => {
          const descriptionContainsFilter = selectedFilters.some((filter) =>
            aide.aid_objet.toLowerCase().includes(filter.toLowerCase())
          );

          const operationsElContainsFilter = selectedFilters.some((filter) =>
            aide.aid_operations_el.toLowerCase().includes(filter.toLowerCase())
          );

          const montantContainsFilter = selectedFilters.some((filter) =>
            aide.aid_montant.toLowerCase().includes(filter.toLowerCase())
          );

          const benefContainsFilter = selectedFilters.some((filter) =>
            aide.aid_benef.toLowerCase().includes(filter.toLowerCase())
          );

          const conditionsContainsFilter = selectedFilters.some((filter) =>
            aide.aid_conditions.toLowerCase().includes(filter.toLowerCase())
          );

          return (
            descriptionContainsFilter ||
            operationsElContainsFilter ||
            montantContainsFilter ||
            benefContainsFilter ||
            conditionsContainsFilter
          );
        });

  // If "effectif" is selected, include aideDataByEffectif in filteredAideData
  if (selectedFilters.includes("effectif")) {
    filteredAideData.push(...aideDataByEffectif);
  }
  //fetch data for the first time
  useEffect(() => {
    if (allowFetch) {
      // Fetch data only once when the component mounts
      fetchAides();
      const newOffset = 20;
      setOffset(newOffset);
      // Set allowFetch to false to prevent further fetches
      setAllowFetch(false);
    }
  }, []);
  const fetchAides = async () => {
    try {
      const aides = await getAides(offset);
      if (aides.data.length !== 0) {
        setListAide([...listAide, ...aides.data]);
      } else {
        setAllowFetch(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleScroll = () => {
    if (
      !loading &&
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
    ) {
      setAllowFetch(true);
      setLoading(true);

      if (allowFetch) {
        fetchAides();
        const newOffset = offset + 20;
        setOffset(newOffset);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset, loading]);

  return (
    <div className="justify-items-end">
      <div>
        <Box title={"Les aides"} />
      </div>
      <div className="bmc-container flex flex-col px-8 py-2">
        <h2 className="text-black-700 text-lg py-2 px-10 text-center font-bold">
          Affiner votre recherche
        </h2>
        <div className="grid grid-cols-7 divide-x pace-x-5 overflow-auto mt-4">
          <div className="flex space-x-5 col-span-5 pl-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded-full appearance-none w-4 h-4 border-2 border-gray-600 checked:bg-blue-500 checked:border-transparent"
                onChange={() => handleCheckboxChange("emploi")}
                checked={isFilterSelected("emploi")}
              />
              <span className="font-medium text-base">Demandeur d'emploi</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded-full appearance-none w-4 h-4 border-2 border-gray-600 checked:bg-blue-500 checked:border-transparent"
                onChange={() => handleCheckboxChange("Femme")}
                checked={isFilterSelected("Femme")}
              />
              <span className="font-medium text-base">Femme</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded-full appearance-none w-4 h-4 border-2 border-gray-600 checked:bg-blue-500 checked:border-transparent"
                onChange={() => handleCheckboxChange("Senior")}
                checked={isFilterSelected("Senior")}
              />
              <span className="font-medium text-base">Senior</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded-full appearance-none w-4 h-4 border-2 border-gray-600 checked:bg-blue-500 checked:border-transparent"
                onChange={() => handleCheckboxChange("Handicap")}
                checked={isFilterSelected("Handicap")}
              />
              <span className="font-medium text-base">Handicapé</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded-full appearance-none w-4 h-4 border-2 border-gray-600 checked:bg-blue-500 checked:border-transparent"
                onChange={() => handleCheckboxChange("Jeune")}
                checked={isFilterSelected("Jeune")}
              />
              <span className="font-medium text-base">Jeune</span>
            </label>
          </div>
          <div className="col-span-2 pl-8 flex space-x-2 text-center items-center">
            <p className="font-semibold text-base mb-2">
              Effectif de l'entreprise ?
            </p>
            <input
              className="rounded-lg bg-slate-200 px-4 font-semibold text-base w-70 h-10"
              type="number"
              onChange={(e) => {
                setEffectif(e.target.value);
                handleCheckboxChange("effectif", e.target.value);
              }}
              value={effectif}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4 pl-4 mt-4">
          <h2 className="text-black-700 text-lg py-2 px-2 text-left font-bold">
            Mes filtres
          </h2>
          <div className="flex space-x-2">
            {selectedFilters.map((filter, index) => (
              <div
                key={filter}
                className="border bg-blue-100 flex items-center space-x-1 rounded-md"
              >
                <span className="font-base text-sm pl-4 py-2 text-black">
                  {filter === "effectif" ? `Effectif: ${effectif}` : filter}
                </span>
                <button
                  onClick={() => handleCheckboxChange(filter)}
                  className="text-black-500 hover:text-black-700 font-semibold pb-4 px-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bmc-container flex flex-col px-8 py-2 divide-y">
        <div className="flex justify-between items-center py-2 px-4">
          <h2 className="text-black-700 text-lg font-bold text-left">
            Votre recherche
          </h2>
          <p className="text-black-700 text-base text-left">
            {filteredAideData.length} Aides correspondent à votre recherche
          </p>
        </div>
        <div>
          {filteredAideData.map((aide, index) => (
            <div key={aide} className="m-4">
              <RechercheCard
                title={aide.aid_nom}
                description={aide.aid_objet}
                links={aide.complements.source}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aides;
