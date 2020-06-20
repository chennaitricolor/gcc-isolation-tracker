const { mergeIgnoringUndefined } = require('../utils/helper');

const env = process.env.NODE_ENV;

module.exports = mergeIgnoringUndefined(require('./default'), env ? require(`./${env}`) : /* istanbul ignore next */ require('./local'));