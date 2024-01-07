import axios from "axios";
import BASE_URL from "../../src/apiConfig";

export async function updateBusinessModelParam(projectId, data) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.put(
    `${BASE_URL}/api/${projectId}/busness-model/information/`,
    data,
    config
  );
}

export async function getBusinessModelInfo(projectId) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };
  return axios.get(
    `${BASE_URL}/api/${projectId}/busness-model/all/information/`,
    config
  );
}
