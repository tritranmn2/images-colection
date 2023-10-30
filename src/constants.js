import axios from 'axios';
import { useQuery } from 'react-query';
// export const ACCESS_KEY = '9D2_TChol4Aw1Gg1UoE2B8jrPcMuPEG0vP-4afZQfkw';
export const ACCESS_KEY = 'IYIPDT8ocDfTW9XIqr04PlDq0Ob8_v2HZecs75NlMqs';
export const axiosInstance = axios.create({
  baseURL: 'https://api.unsplash.com',
});

axiosInstance.interceptors.request.use((config) => {
  // Kiểm tra nếu yêu cầu không chứa client_id, thì thêm nó vào
  if (!config.params || !config.params.client_id) {
    const clientId = ACCESS_KEY;
    if (!config.params) {
      config.params = { client_id: clientId };
    } else {
      config.params.client_id = clientId;
    }
  }
  return config;
});
