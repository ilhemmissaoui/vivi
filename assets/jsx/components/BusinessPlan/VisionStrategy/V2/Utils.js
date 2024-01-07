import { useDateFormat } from "../../../../../hooks/useDateFormat";
const formatDate = useDateFormat();

const today = new Date();

export const currentYear = new Date().getFullYear();

export const minSlider = today.getTime();

const oneYearsFromNow = new Date();

oneYearsFromNow.setFullYear(today.getFullYear() + 1);

export const maxSlider = oneYearsFromNow.getTime();

//returns the ID for a given year from an array of year objects
export const getYearId = (allYears, yearName) => {
  const year = allYears.find((yearObj) => yearObj.Name === yearName);
  return year ? year.id : null;
};

export const newMark = {
  annee: "",
  idVisionStrategies: "",
  dateVisionStrategies: "",
  actionVision: {
    actionDateFin: "",
    action: "",
    cible: "",
  },
  objectifVision: {
    description: "",
  },
  coutVision: {
    cout: "",
  },
};

export const dateFormatInput = (value) => {
  let date = value.toString();
  date = date.split("-").reverse().join("-");
  return date;
};

export const calculateMarks = (visions) => {
  return visions.reduce((acc, item) => {
    const timestamp = new Date(item.dateVisionStrategies).getTime();
    acc[timestamp] = formatDate(new Date(item.dateVisionStrategies));
    return acc;
  }, {});
};
export const calculateData = (visions) => {
  return visions.reduce((acc, item) => {
    const timestamp = new Date(item.dateVisionStrategies).getTime();
    acc[timestamp] = { ...item }; // Store the entire vision object
    return acc;
  }, {});
};
export const toDayFormattedInput = new Date().toISOString().split("T")[0];
