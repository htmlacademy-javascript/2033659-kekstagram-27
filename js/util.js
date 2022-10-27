const getRndInteger = function (min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    return NaN;
  }

  if (min < 0 || max < 0) {
    return NaN;
  }

  if (max <= min) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

const checkStringLength = function (string, maxLength) {
  return string.length > maxLength;
};

export { getRndInteger, checkStringLength };
