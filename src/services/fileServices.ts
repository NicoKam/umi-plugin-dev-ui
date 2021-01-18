import fs from 'fs';
import path from 'path';
import type { ServiceFn } from '.';
import { publicDir, rootDir } from '../config/config';

type TreeItemType = 'directory' | 'file';

interface TreeItemBase {
  name: string;
  path: string;
  type: TreeItemType;
}
interface TreeItemWithChildren<T> extends TreeItemBase {
  children?: T[];
}

type TreeItem = TreeItemBase | TreeItemWithChildren<TreeItem>;

/* 递归扫描文件 */
async function readDir(currentPath: string, rootPath?: string): Promise<TreeItem[]> {
  const root = rootPath || currentPath;
  const menu = await fs.promises.readdir(currentPath.replace(/\\/g, '/'));

  const res = await Promise.all(
    menu.map(async (currentName) => {
      const fullPath = `${currentPath}/${currentName}`;
      const info = await fs.promises.stat(fullPath);
      if (info.isDirectory()) {
        return readDir(fullPath, root).then(children => ({
          name: currentName,
          path: path.relative(root, fullPath).replace(/\\/g, '/'),
          type: 'directory' as TreeItemType,
          children,
        }));
      }
      return {
        name: currentName,
        path: path.relative(root, fullPath).replace(/\\/g, '/'),
        type: 'file' as TreeItemType,
      };
    }),
  );
  return res;
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
