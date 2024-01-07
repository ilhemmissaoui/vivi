import axios from "axios";
import BASE_URL from "../../src/apiConfig";
export const getAides = async (offset) => {
  const limit = 20;
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.get(
    `${BASE_URL}/api/vivitool/aides/${limit}/${offset}`,
    config
  );
};
export const getAidesByEffectif = async (effectif) => {
  const data = { effectif };
  const limit = 20;
  const offset = 0;
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: {
      "X-AUTH-USER": JSON.parse(token),
    },
  };

  return await axios.post(
    `${BASE_URL}/api/vivitool/aides/${limit}/${offset}`,
    data,
    config
  );
};
