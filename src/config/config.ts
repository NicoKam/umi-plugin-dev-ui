import path from 'path';
import { homedir, platform } from 'os';
import fs from 'fs-extra';
import ini from 'ini';
import pkg from '../../package.json';

const fsPromise = fs.promises;

// 配置文件名称
const configFilename = '.devuirc';

const userConfigPath = path.resolve(homedir(), configFilename);
const defaultConfig = ini.parse(fs.readFileSync(path.resolve(__dirname, '../..', configFilename)).toString());

// 配置目录名称
const configDirName = '.umi-plugin-dev-ui';
const templateCacheDir = path.resolve(homedir(), configDirName, '.cache.json');

export const publicDir = path.resolve(homedir(), configDirName);
export const rootDir = path.resolve(__dirname, '../..');

export type Config = {
  syncServer: string;
  version: string;
  platform: 'win' | 'mac';
  triggerKeys: {
    key?: string;
    altKey?: boolean;
    metaKey?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
  };
  [key: string]: unknown;
};

/**
 * 获取配置
 */
export const getConfig = async (): Promise<Config> => {
  let userConfig = {};
  try {
    const buffer = await fsPromise.readFile(userConfigPath);
    userConfig = ini.parse(buffer.toString()) || {};
  } catch (error) {
    // console.error(`Read user config error:${userConfigPath}`);
  }
  return ({
    ...defaultConfig,
    ...userConfig,
    platform: platform() === 'darwin' ? 'mac' : 'win',
    version: pkg.version,
  } as unknown) as Config;
};

/**
 * 独去配置（同步）
 */
export const getConfigSync = (): Config => {
  let userConfig = {};
  try {
    const buffer = fs.readFileSync(userConfigPath);
    userConfig = ini.parse(buffer.toString()) || {};
  } catch (error) {
    // console.error(`Read user config error:${userConfigPath}`);
  }
  return ({
    ...defaultConfig,
    ...userConfig,
    platform: platform() === 'darwin' ? 'mac' : 'win',
    version: pkg.version,
  } as unknown) as Config;
};

/**
 * 设置选项
 */
export const setConfig = async ({ platform, version, ...config }: Partial<Config> = {}) => {
  let userConfig = {};
  try {
    const buffer = await fsPromise.readFile(userConfigPath);
    userConfig = ini.parse(buffer.toString()) || {};
  } catch (error) {
    // console.error(`Read user config error:${userConfigPath}`, error);
  }
  userConfig = { ...userConfig, ...config };
  try {
    await fsPromise.writeFile(userConfigPath, ini.stringify(userConfig));
  } catch (error) {
    console.error(`Write user config error:${userConfigPath}`, error);
  }
};

/**
 * 获取同步服务地址
 */
export const getSyncServer = async () => {
  const { syncServer: serverHost } = await getConfig();
  return serverHost.replace(/\/$/, '');
};

/**
 * 获取模板缓存信息
 */
export const getTemplateCache = async () => new Promise((resolve) => {
  fs.readJson(templateCacheDir, (err, obj) => {
    if (err) {
      resolve([]);
    }
    resolve(obj);
  });
});

/**
 * 设置模板缓存信息
 */
export const setTemplateCache = async (jsonCache: object): Promise<void> => new Promise((resolve, reject) => {
  fs.writeJson(templateCacheDir, jsonCache, (err) => {
    if (err) {
      reject(err);
    }
    resolve();
  });
});
