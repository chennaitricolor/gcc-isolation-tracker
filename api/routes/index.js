const auth = require('./auth');
const persons = require('./persons');
const zones = require('./zones');
const quarantineTypes = require('./quarantineTypes');
const quarantineSubTypes = require('./quarantineSubTypes');
const dashboard = require('./dashboard');
const users = require('./users');

exports.bind = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/persons', persons);
  app.use('/api/zones', zones);
  app.use('/api/quarantineTypes', quarantineTypes);
  app.use('/api/quarantineSubTypes', quarantineSubTypes);
  app.use('/api/dashboard', dashboard);
  app.use('/api/users', users);
};
