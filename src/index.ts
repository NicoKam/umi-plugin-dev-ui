import type { IApi } from 'umi';
import { resolve } from 'path';
import serveStatic from 'serve-static';
import finalhandler from 'finalhandler';
import callServices from './services';
import { getConfigSync } from './config/config';

export type PluginConfig = {
  srcRoot: string;
  frameStyle: {
    maxWidth: string;
    minWidth: string;
  };
  triggerKeys: {
    key?: string;
    altKey?: boolean;
    metaKey?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
  };
  platform: 'mac' | 'win';
  version: string;
  [key: string]: unknown;
};

export default (api: IApi) => {
  api.describe({
    key: 'devUI',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });

  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  function getRealOptions(): PluginConfig {
    const { triggerKeys, version, platform } = getConfigSync();

    // 拼合选项
    return {
      // 根目录
      srcRoot: resolve(process.cwd(), 'src'),
      // 弹框的样式
      frameStyle: {
        maxWidth: '900px',
        minWidth: '500px',
      },
      ...api.config,
      triggerKeys,
      platform,
      version,
    };
  }

  // 拦截API服务
  api.addBeforeMiddlewares(() => {
    // 启动静态资源服务
    const webRoot = resolve(__dirname, '../web');
    const webServer = serveStatic(webRoot, { index: 'index.html' });

    const realOptions = getRealOptions();

    return (req, res, next) => {
      if (req.path.startsWith('/__cbdui')) {
        const done = finalhandler(req, res);
        // console.log(req.path);
        if (req.path.startsWith('/__cbdui/api')) {
          callServices(req, res, done, realOptions);
        } else {
          webServer(req, res, () => {
            res.sendFile(resolve(webRoot, '__cbdui/index.html'));
          });
        }
      } else {
        next();
      }
    };
  });

  // 添加额外的HTML入口
  api.addHTMLScripts(() => {
    const realOptions = getRealOptions();
    return [
      { src: '/__cbdui_plugin/iframeMessageHelper.js' },
      { src: '/__cbdui_plugin/index.js' },
      { content: `typeof __cbduiInit ==="function" && __cbduiInit(${JSON.stringify(realOptions)});` },
    ];
  });
};
