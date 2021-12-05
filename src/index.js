import * as fs from 'fs';
import _ from 'lodash';
import process from 'process';
import path from 'path';

const checkFilePath = (filePath) => fs.existsSync(filePath);

const getFilePath = (filePath) => {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), filePath);
};

const getFileFormat = (filePath) => path.extname(filePath).substring(1);

const readFile = (filePath) => fs.readFileSync(filePath);

const parseFile = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    default:
      return '';
  }
};

const genDiff = (filepath1, filepath2) => {
  const path1 = getFilePath(filepath1);
  const path2 = getFilePath(filepath2);
  if (!(checkFilePath(path1) && checkFilePath(path2))) {
    return 'No such files';
  }
  const format1 = getFileFormat(path1);
  const format2 = getFileFormat(path2);
  const file1 = readFile(path1);
  const file2 = readFile(path2);
  const parsedFile1 = parseFile(file1, format1);
  const parsedFile2 = parseFile(file2, format2);
  const uniqKeys = _.sortBy(_.union(Object.keys(parsedFile1), Object.keys(parsedFile2)));

  const result = uniqKeys.reduce((acc, key) => {
    const hasKeyFile1 = _.has(parsedFile1, key);
    const hasKeyFile2 = _.has(parsedFile2, key);
    const valueFile1 = _.get(parsedFile1, key);
    const valueFile2 = _.get(parsedFile2, key);
    if (hasKeyFile1 && hasKeyFile2) {
      if (valueFile1 === valueFile2) {
        return `${acc}    ${key}: ${valueFile1}\n`;
      }
      return `${acc}  - ${key}: ${valueFile1}\n  + ${key}: ${valueFile2}\n`;
    }
    if (hasKeyFile1) {
      return `${acc}  - ${key}: ${valueFile1}\n`;
    }
    if (hasKeyFile2) {
      return `${acc}  + ${key}: ${valueFile2}\n`;
    }
    return '';
  }, '');
  return `{\n${result}}`;
};

export default genDiff;
