const hash = require('object-hash');
const config = require('./config.json');

const {
  INPUT,
  SUFFIX,
  CHARS,
} = config;

const computeSHA1 = (input) => {
  return hash.sha1(input);
};

const addSuffixInput = (input, suffix) => {
  return input.concat(suffix);
}

const checkIfAllZ = (suffix) => {
  
  let allZ = true;
  for (let index = 0; index < suffix.length; index++) {
    if (suffix[index] !== 'Z') {
      allZ = false;
      break;
    }
  }

  return allZ;
}

const zerofy = (suffix) => {
  
  let result = '';  // +1 because we add another 0 in front
  for (let index = 0; index < suffix.length + 1; index++) {
    result += '0';
  }

  return result;
}

const incrementSuffix = (suffix) => {
  // const length = CHARS.length;

  if (suffix[suffix.length-1] !== 'Z') {
    return suffix.substr(0, suffix.length-1) + CHARS[CHARS.indexOf(suffix[suffix.length-1]) + 1];
  }

  if (checkIfAllZ(suffix)) {
    return zerofy(suffix);
  }

  let carry = 0;
  let incremented = suffix;
  for (let index = suffix.length - 1; incremented[index] !== 'Z'; index--) {
    incremented = incremented.substring(0, incremented.length - index) + '0' + incremented.substr(index + 1, incremented.length-(incremented.lngth - index - 1));

  }

}

const main = () => {

  let iteration = 1;
  let result = '';
  let suffix = '0';

  // while (result.substr(result.length - SUFFIX.length, SUFFIX.length) !== SUFFIX) {
  while (iteration !== 200) {

    if (iteration % 100 === 0) {
      console.log(iteration, ' iterations, still not found the desired nonce.');
    }

    suffix = incrementSuffix(suffix); 
    console.log(suffix);
    // result = computeSHA1(addSuffixInput(INPUT, returnSuffix(iteration)));
    iteration++;
  }

  // console.log('At iteration ---> ', iteration, 'I\'ve found the nonce: ', result);
};

main();
