import axios from "axios";
import BASE_URL from "../../src/apiConfig";

export function createPartner(postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.post(`${BASE_URL}/api/partenaire/add`, postData, config);
}

export function getAllPartners() {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.get(`${BASE_URL}/api/all-partenaire/`, config);
}

export function getPartner(id) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.get(`${BASE_URL}/api/one-partenaire/${id}`, config);
}
