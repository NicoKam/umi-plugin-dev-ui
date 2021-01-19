import crypto from 'crypto';
import fs from 'fs';
import fetch from 'isomorphic-fetch';
import path from 'path';
import streamBuffers from 'stream-buffers';
import tar from 'tar';
import type { ServiceFn } from '.';
import { getSyncServer, getTemplateCache, publicDir, setTemplateCache } from '../config/config';
import * as templateUtil from '../utils/templateUtil';

let templates: unknown[] | null = null;

/**
 * 查询模板列表
 */
const getTemplates = async () => {
  if (!templates) {
    const temps = await templateUtil.getTemplates();
    templates = temps;
  }

  return {
    errCode: 0,
    data: templates,
  };
};

const getTemplateConfigByCode = async (templateName: string) => {
  if (!templates) {
    await getTemplates();
  }

  if (templates) {
    const templateConfig = templates.find(({ code }) => code === templateName);
    return templateConfig;
  }
  return null;
};

/**
 * 预览文件名
 */
const previewTemplateFilename: ServiceFn = async (request, opts) => {
  const { query } = request;
  const { template: templateName = '', path: targetPath, ...otherQuery } = query;

  const templateConfig = await getTemplateConfigByCode(templateName);
  if (templateConfig) {
    return {
      errCode: 0,
      data: templateUtil
        .previewTemplateFilename(templateConfig, otherQuery)
        .map(name => path.join(name).replace(/\\/g, '/')),
    };
  }
  return {
    errCode: 1,
    errMsg: '您选择的模板有误',
  };
};

const downloadTemplate = async (name: string) => {
  const syncServer = await getSyncServer();
  const res = await fetch(`${syncServer}/api/cbdui/tarball?name=${name}`);
  return res.buffer().then((buffer) => {
    const fsHash = crypto.createHash('sha256');
    fsHash.update(buffer);
    return {
      buffer,
      hash: fsHash.digest('hex'),
    };
  });
};

let lastSyncTime = 0;

/**
 * 同步模板
 */
const syncTemplates: ServiceFn = async () => {
  const now = new Date().getTime();
  if (now - lastSyncTime < 5000) {
    return {
      errCode: 1,
      errMsg: '操作过于频繁，请稍后',
    };
  }
  lastSyncTime = now;
  const syncServer = await getSyncServer();
  const res = await fetch(`${syncServer}/api/cbdui/template`).then(res => res.json());
  const templateInfo = res.data;
  const templateInfoLocal = await getTemplateCache();
  const templateInfoCache = templateInfoLocal.reduce(
    (res, { name, hash }) => ({
      ...res,
      [name]: hash,
    }),
    {},
  );
  const data = await Promise.all(
    templateInfo.map(async ({ name, hash, ...other }) => {
      if (templateInfoCache[name] === hash) {
        // hash值一样，无需下载
        return {
          ...other,
          name,
          hash,
          localHash: templateInfoCache[name],
          status: 'same',
        };
      }

      /* 把文件取回来 */
      const { buffer, hash: calcHash } = await downloadTemplate(name);
      if (calcHash !== hash) {
        // hash检查不一致，文件下载失败
        return {
          ...other,
          name,
          hash,
          localHash: calcHash,
          status: 'downloadFailed',
        };
      }
      const outputDir = path.resolve(publicDir, 'template', name);
      await fs.promises.mkdir(outputDir, { recursive: true });
      return new Promise((resolve) => {
        /* 文件保存 */
        const readable = new streamBuffers.ReadableStreamBuffer({
          frequency: 10, // in milliseconds.
          chunkSize: 2048, // in bytes.
        });
        readable.put(buffer);
        readable.stop();
        readable.pipe(
          tar.x({
            gzip: true,
            C: outputDir, // alias for cwd:'some-dir', also ok
          }),
        );
        readable.on('end', () => {
          resolve({
            ...other,
            name,
            hash,
            localHash: calcHash,
            status: 'success',
          });
        });
      });
    }),
  ).then((result) => {
    setTemplateCache(result);
    return result;
  });
  templates = null;
  return {
    errCode: 0,
    data,
  };
};

const createFromTemplate: ServiceFn = async (request, config) => {
  const { body } = request;
  const {
    // 模板名称
    template: templateName = '',
    // 所在路径
    path: targetPath = '',
    // 组件名称
    name,
    ...otherQuery
  } = body;

  if (!name && !name.trim()) {
    throw new Error('请传入名称');
  }

  const templateConfig = await getTemplateConfigByCode(templateName);

  try {
    const data = await templateUtil.create(templateConfig, targetPath, body, config.srcRoot);

    return {
      errCode: 0,
      data,
    };
  } catch (e) {
    console.log(e);
    return {
      errCode: 1,
      errMsg: e.message,
    };
  }
};

const mkdir: ServiceFn = async (request, config) => {
  const { body } = request;
  const { path: targetPath = '' } = body;
  return {
    errCode: 0,
    data: await templateUtil.mkdir(path.join(config.srcRoot, targetPath)),
  };
};

/**
 * 检查所选路径和模板是否符合规则
 */
const checkPath: ServiceFn = async (request) => {
  const { query } = request;
  const {
    /* 模板名称 */
    template: templateName = '',

    /* 所在路径 */
    path: targetPath = '',

    /* 组件名称 */
    name,
    ...otherQuery
  } = query;

  const templateConfig = await getTemplateConfigByCode(templateName);

  const error = templateUtil.checkTemplatePath(templateConfig, targetPath, query);
  return {
    errCode: 0,
    data: error,
  };
};

export default {
  '/syncTemplates': syncTemplates,
  '/getTemplates': getTemplates,
  '/previewTemplateFiles': previewTemplateFilename,
  '/checkPath': checkPath,
  '/mkdir': mkdir,
  '/create': createFromTemplate,
};
