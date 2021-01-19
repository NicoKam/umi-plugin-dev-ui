import fs from 'fs';
import path from 'path';
import type { ServiceFn } from '.';
import { publicDir, rootDir } from '../config/config';

/* 递归扫描文件 */
function readDir(currentPath: string, rootPath?: string) {
  const root = rootPath || currentPath;
  return new Promise((resolve) => {
    fs.readdir(currentPath.replace(/\\/g, '/'), (err, menu) => {
      const allPromise: Promise<unknown>[] = [];
      if (err) {
        resolve({});
        return;
      }
      menu.forEach((currentName) => {
        const fullPath = `${currentPath}/${currentName}`;
        const info = fs.statSync(fullPath);
        if (info.isDirectory()) {
          allPromise.push(
            readDir(fullPath, root).then(children => ({
              name: currentName,
              path: path.relative(root, fullPath).replace(/\\/g, '/'),
              type: 'directory',
              children,
            })),
          );
        } else {
          allPromise.push(
            Promise.resolve({
              name: currentName,
              path: path.relative(root, fullPath).replace(/\\/g, '/'),
              type: 'file',
            }),
          );
        }
      });
      Promise.all(allPromise).then(resolve);
    });
  });
}

const getFileTree: ServiceFn = async (request, opts) => {
  const { srcRoot } = opts;
  const data = await readDir(srcRoot);
  return {
    errCode: 0,
    data,
  };
};

const image: ServiceFn = async (request, opts) => (req, res) => {
  const { query } = req;
  if (query.type === 'initial') {
    res.sendFile(path.resolve(rootDir, 'template', String(query.code), String(query.image)));
  } else if (query.type === 'user') {
    res.sendFile(path.resolve(publicDir, 'template', String(query.code), String(query.image)));
  } else {
    res.sendStatus(404);
  }
};

export default {
  '/getFileTree': getFileTree,
  '/image': image,
};
