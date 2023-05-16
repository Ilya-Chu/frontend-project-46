import path from 'path';
import fs from 'fs';
import compareData from './compareData.js';
import format from './formatters/index.js';
import parse from './parsers.js';

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf-8');
const getFormat = (filename) => filename.split('.')[1];

const genDiff = (file1, file2, formatName = 'stylish') => {
  const content1 = readFile(file1);
  const content2 = readFile(file2);
  const data1 = parse(content1, getFormat(file1));
  const data2 = parse(content2, getFormat(file2));
  const tree = compareData(data1, data2);

  return format(tree, formatName);
};

export default genDiff;
