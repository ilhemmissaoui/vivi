import axios from 'axios';
import BASE_URL from '../../src/apiConfig';

export const getFaq = async () => {
  const token = localStorage.getItem('userDetails');
  const config = {
    headers: {
      'X-AUTH-USER': JSON.parse(token),
    },
  };

  return await axios.get(`${BASE_URL}/api/vivitool/faq`, config);
};
