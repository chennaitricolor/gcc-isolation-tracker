const auth = require('./auth');
const persons = require('./persons');
const zones = require('./zones');
const quarantineTypes = require('./quarantineTypes');
const quarantineSubTypes = require('./quarantineSubTypes');

exports.bind = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/persons', persons);
  app.use('/api/zones', zones);
  app.use('/api/quarantineTypes', quarantineTypes);
  app.use('/api/quarantineSubTypes', quarantineSubTypes);
};
