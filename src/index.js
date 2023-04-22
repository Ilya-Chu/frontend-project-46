import path from 'path'
import fs from 'fs';
import compareData from './compareData.js';
import format from './formatters/index.js';
import parse from './parsers.js';

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf-8');
const getFormat = (filename) => filename.split('.')[1];

const genDiff = (file1, file2, formatName = 'stylish') => {
    const data1 = readFile(file1);
    const data2 = readFile(file2);
    const parsed1 = parse(data1, getFormat(file1));
    const parsed2 = parse(data2, getFormat(file2));
    const data = compareData(parsed1, parsed2);
  
    return format(data, formatName);
  };
  
  export default genDiff;