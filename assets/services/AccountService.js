import axios from "axios";
import BASE_URL from "../../src/apiConfig";

export async function getAccountInformation() {
  const token = localStorage.getItem("userDetails");

  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return await axios.get(`${BASE_URL}/api/user/edit-profil`, config);
}

export function updateAccountInformation(updateData) {
  const token = localStorage.getItem("userDetails");

  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.put(`${BASE_URL}/api/user/edit-profil`, updateData, config);
}
