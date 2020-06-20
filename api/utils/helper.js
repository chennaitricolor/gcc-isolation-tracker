const _ = require('lodash');

module.exports.mergeIgnoringUndefined = (A, B) => _.mergeWith({}, A, B, (a, b) => (b === undefined ? a : undefined));