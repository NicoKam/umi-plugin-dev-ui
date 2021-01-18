/* eslint-disable @typescript-eslint/no-dynamic-delete */
import * as changeCase from 'change-case';
import fs from 'fs';
import path from 'path';
import { publicDir, rootDir } from '../config/config';

// 分析并获取模板对象
const getTemplateInfo = async (templateRoot: string) => {
  const configFileName = path.resolve(templateRoot, 'config.js');
  delete require.cache[configFileName];
  const { files = [], ...configFile } = require(configFileName);
  // 取所有模板的内容
  const filesWithTemplateContent = await Promise.all(
    files.map((file: unknown) =>
      fs.promises
        .readFile(path.resolve(templateRoot, file.template))
        .then(buffer => ({
          ...file,
          templateContent: buffer.toString(),
        }))
        .catch(() => file),
    ),
  );

  return {
    ...configFile,
    files: filesWithTemplateContent,
  };
};

// 从某个目录查询模板列表
const getTemplatesInDir = async (root: string, place: string) => {
  await fs.promises.mkdir(path.resolve(root, 'template'), { recursive: true });
  // 查看template目录
  let result = await fs.promises.readdir(path.resolve(root, 'template'));
  // 查看是否存在config.js
  result = await Promise.all(
    result.map(name =>
      fs.promises
        .access(path.resolve(root, 'template', name, 'config.js'))
        .then(() => name)
        .catch(() => undefined),
    ),
  );
  // 对每个config.js的目录进一步分析
  return Promise.all(
    result
      .filter(v => !!v)
      .map(name =>
        getTemplateInfo(path.resolve(root, 'template', name)).then(result => ({
          ...result,
          code: name,
          place,
        })),
      ),
  );
};

// 查询所有模板信息
export const getTemplates = async () => {
  // 查询预设模板
  const rootTemplates = await getTemplatesInDir(rootDir, 'initial');
  // 查询用户目录的模板
  const userTemplates = await getTemplatesInDir(publicDir, 'user');
  const cache = {};
  userTemplates.forEach(({ name }) => {
    cache[name] = 1;
  });
  const result = [...userTemplates];
  rootTemplates.forEach((template) => {
    if (!cache[template.name]) {
      result.push(template);
    }
  });
  return result;
};

export const getRealFilename = ({ filename, template }, opts = {}) =>
  typeof filename === 'function' ? filename(opts, { changeCase }) : filename;

export const previewTemplateFilename = (template, opts) => {
  const { files = [] } = template;
  return files.map(file => getRealFilename(file, opts));
};

export const executeTemplate = (template, opts = {}) => {
  const { files = [] } = template;
  return files.map((file) => {
    const realFilename = getRealFilename(file, opts);
    const functionString = `
      var option = arguments[0]; 
      var changeCase = arguments[1];
      var {camelCase, paramCase, capitalCase, pascalCase, snakeCase, dotCase, headerCase, pathCase, constantCase, noCase, sentenceCase} = changeCase;
      return \`${file.templateContent.replace(/`/g, '\\`')}\``;
    const templateExecutor = new Function(functionString);
    return {
      ...file,
      realFilename,
      content: templateExecutor(opts, changeCase),
    };
  });
};

// 根据模板类型检查给出的名字和位置是否合适
export const checkTemplatePath = (template, targetPath, opts = {}) => {
  const { type } = template;
  const { name = '' } = opts;

  if (name) {
    if (/.*[\u4e00-\u9fa5]+.*$/.test(name)) {
      return '不支持中文名称';
    }

    if (!/^[a-z0-9A-Z.\s_-]*$/.test(name)) {
      return '文件名不合法';
    }
  }

  if (type === 'model') {
    // model文件，必须防在models目录下
    if (!targetPath.endsWith('/models')) {
      return 'model文件必须直接放在/models目录下';
    }
    if (targetPath.includes('/components/') || targetPath.endsWith('/components')) {
      return 'model文件是为页面服务的，不应该放在components目录下';
    }
  } else if (type === 'component') {
    // component文件必须放在components目录下
    if (!targetPath.includes('/components/') && !targetPath.endsWith('/components')) {
      return '请将组件文件存放在components目录下';
    }
  } else if (type === 'page') {
    // page文件必须放在pages目录下，且不能放在components/models下
    if (!targetPath.includes('/pages/') && !targetPath.endsWith('/pages')) {
      return '请将页面文件存放在/pages目录下';
    }
    if (targetPath.includes('/components/') || targetPath.endsWith('/components')) {
      return '页面文件不应该放在components目录下';
    }
    if (targetPath.includes('/models/') || targetPath.endsWith('/models')) {
      return '页面文件不应该放在models目录下';
    }
  }
};

export async function mkdir(dirname) {
  let stat;
  try {
    stat = await fs.promises.stat(dirname);
  } catch (e) {
    // donothing
  }
  if (stat) {
    if (stat.isDirectory()) {
      throw new Error('目录已存在');
    } else {
      throw new Error('无法创建目录');
    }
  }

  return fs.promises.mkdir(dirname, { recursive: true });
}

async function createFile(filePath, content) {
  let stat;
  try {
    stat = await fs.promises.stat(filePath);
  } catch (e) {
    // donothing
  }
  if (stat) {
    if (!stat.isDirectory()) {
      throw new Error('无法创建文件，已存在');
    } else {
      throw new Error('无法创建文件');
    }
  }
  const dirname = path.dirname(filePath);
  await fs.promises.mkdir(dirname, { recursive: true });
  // console.log(filePath);
  await fs.promises.writeFile(filePath, content);
}

export const create = async (template, targetPath, opts = {}, srcRoot) => {
  const error = checkTemplatePath(template, targetPath, opts);
  if (error) {
    throw new Error(error);
  }

  // 开始创建
  const templateContents = executeTemplate(template, opts);
  return Promise.all(
    templateContents.map((file) => {
      const { realFilename, content } = file;
      return createFile(path.join(srcRoot, targetPath, realFilename), content).then(() => file);
    }),
  );
};
