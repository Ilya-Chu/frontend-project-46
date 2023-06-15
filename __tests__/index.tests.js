import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const fileExt = ['.json', '.yaml'];

const resultStylish = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/result_stylish.txt'),
  'utf-8',
);
const resultPlain = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/result_plain.txt'),
  'utf-8',
);
const resultJson = fs.readFileSync(
  path.resolve(process.cwd(), '__fixtures__/result_json.txt'),
  'utf-8',
);

test.each(fileExt)('testing different file options', (extension) => {
  const fileBefore = `__fixtures__/file1${extension}`;
  const fileAfter = `__fixtures__/file2${extension}`;
  const actual1 = genDiff(fileBefore, fileAfter, 'stylish');
  expect(actual1).toEqual(resultStylish);
  const actual2 = genDiff(fileBefore, fileAfter, 'plain');
  expect(actual2).toEqual(resultPlain);
  const actual4 = genDiff(fileBefore, fileAfter);
  expect(actual4).toEqual(resultStylish);
  const actual5 = genDiff(fileBefore, fileAfter, 'json');
  expect(actual5).toEqual(resultJson);
});
