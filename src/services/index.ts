import bodyParser from 'body-parser';
import type { NextFunction, Request, Response } from 'umi';
import fileServices from './fileServices';
import templateServices from './templateServices';
import settingServices from './settingServices';
import type { PluginConfig } from '..';

const services = {
  ...fileServices,
  ...templateServices,
  ...settingServices,
};

// console.log("已注册插件web-api:");
// Object.keys(services).forEach(k => console.log(k));

export type CallbackFn = (req: Request, res: Response, next: NextFunction) => void;

export type ServiceFn = (req: Request, opts: PluginConfig) => Promise<CallbackFn | Record<string, unknown>>;

export default (req: Request, res: Response, next: NextFunction, opts: PluginConfig) => {
  bodyParser.json()(req, res, async () => {
    const requestPath = req.path.replace('/__cbdui/api', '');
    const serviceFn = services[requestPath] as ServiceFn | undefined;

    if (typeof serviceFn === 'function') {
      try {
        const result = await serviceFn(req, opts);
        if (typeof result === 'function') {
          result(req, res, next);
        } else {
          res.json(result);
        }
      } catch (error) {
        console.error(error);
        res.json({
          errCode: 1,
          error,
          errMsg: error.message,
        });
      }
    } else {
      next();
    }
  });
};
