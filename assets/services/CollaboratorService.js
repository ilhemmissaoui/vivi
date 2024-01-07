import axios from "axios";
import BASE_URL from "../../src/apiConfig";

export function createCollaborator(postData) {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return axios.post(`${BASE_URL}/api/collaborateur-user/add`, postData, config);
}
