import axios from "axios";
import BASE_URL from "../../src/apiConfig";
export const getTresAnnees = async (id_proj) => {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.get(
    `${BASE_URL}/api/${id_proj}/business-plan/financement-charges/get-AllAnneefinancementPartie`,
    config
  );
};
export const getDataPerYear = async (id_proj, id_Annee) => {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.get(
    `${BASE_URL}/api/${id_proj}/business-plan/financement-charges/tableaux-financiers/tresorerie/${id_Annee}`,
    config
  );
};
export const editDataPerYear = async (id_proj, id_Annee, data) => {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.post(
    `${BASE_URL}/api/${id_proj}/business-plan/financement-charges/tableaux-financiers/set-tresorerie/${id_Annee}`,
    data,
    config
  );
};

export const getBilanPerYear = async (id_proj, id_Annee) => {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.get(
    `${BASE_URL}/api/${id_proj}/business-plan/financement-charges/tableaux-financiers/get-bilan/${id_Annee}`,
    config
  );
};
export const editBilanPerYear = async (id_proj, id_Annee, data) => {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.post(
    `${BASE_URL}/api/${id_proj}/business-plan/financement-charges/tableaux-financiers/set-bilan/${id_Annee}`,
    data,
    config
  );
};
export const getCompteResultat = async (id_proj) => {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.get(
    `${BASE_URL}/api/${id_proj}/business-plan/financement-charges/tableaux-financiers/get-compte-resultat`,
    config
  );
};
export const getPLanFinancier = async (id_proj) => {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.get(
    `${BASE_URL}/api/${id_proj}/business-plan/financement-charges/tableaux-financiers/get-PlanFinancement`,
    config
  );
};

export const editPLanFinancier = async (id_proj, data) => {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.put(
    `${BASE_URL}/api/${id_proj}/business-plan/financement-charges/tableaux-financiers/set-PlanFinancement`,
    data,
    config
  );
};

export const getPdfBusinessCanvas = async (id_proj) => {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.get(
    `${BASE_URL}/api/${id_proj}/busnessModelinfo/pdf/generator`,
    config
  );
};
