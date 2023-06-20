import { ILogin } from '../../../types';
import { createServiceNoToken } from './axios';

const instance = createServiceNoToken(process.env.REACT_APP_API_URL);

const apiUrl = 'auth/authenticate';

const login = async (data: ILogin) => {
  const result = await instance.post(apiUrl, data);
  return result.data;
};

export default { login };
