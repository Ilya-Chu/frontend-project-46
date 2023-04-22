import json from './json.js';
import stylish from './stylish.js';

const format = (data, formatName) => {
    switch (formatName) {
      case 'stylish': {
        return stylish(data);
      }
      case 'plain': {
        return plain(data);
      }
      case 'json': {
        return json(data);
      }
      default:
        throw new Error('Invalid format');
    }
  }
  
  export default format;