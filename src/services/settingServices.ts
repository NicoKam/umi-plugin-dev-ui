import type { ServiceFn } from '.';
import { getConfig, setConfig } from '../config/config';

const apiGetConfig: ServiceFn = async () => {
  const data = await getConfig();
  return {
    errCode: 0,
    data,
  };
};

const apiSetConfig: ServiceFn = async (request) => {
  const { body } = request;
  await setConfig(body);
  return { errCode: 0 };
};

export default {
  '/getConfig': apiGetConfig,
  '/setConfig': apiSetConfig,
};
