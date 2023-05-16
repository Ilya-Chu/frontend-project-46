
import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
      return '[complex value]';
  } 
  return typeof value === 'string' ? `'${value}'` : value;
};

const getPlainFormat = (value, parent = '') => {
  switch(value.type) {
    case 'added':
      return `Property '${parent}${value.key}' was added with value: ${stringify(value.value)}`;
    case 'deleted':
      return `Property '${parent}${value.key}' was removed`;
    case 'unchanged':
      return null;
    case 'changed':
      return `Property '${parent}${value.key}' was updated. From ${stringify(value.valueBefore)} to ${stringify(value.valueAfter)}`;
    case 'nested':
      return value.children.map((val) => getPlainFormat(val, `${parent + value.key}.`))
      .filter((item) => item !== null).join('\n');
    default:
      throw new Error(`Unknown type: ${value.type}`);
  }
  
}

export default (plain) => `${plain.map((element) => getPlainFormat(element)).join('\n')}`;