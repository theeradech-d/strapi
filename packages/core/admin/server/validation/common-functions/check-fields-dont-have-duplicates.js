'use strict';

const isNil = require('lodash/isNil');
const uniq = require('lodash/uniq');

const checkFieldsDontHaveDuplicates = fields => {
  if (isNil(fields)) {
    // Only check if the fields exist
    return true;
  } else if (!Array.isArray(fields)) {
    return false;
  }

  return uniq(fields).length === fields.length;
};

module.exports = checkFieldsDontHaveDuplicates;
