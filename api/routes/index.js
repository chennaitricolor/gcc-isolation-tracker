const auth = require('./auth');
const persons = require('./persons');
const zones = require('./zones');

exports.bind = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/persons', persons);
  app.use('/api/zones', zones);
};
