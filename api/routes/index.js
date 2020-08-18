const auth = require('./auth');
const persons = require('./persons');
const zones = require('./zones');
const quarantineTypes = require('./quarantineTypes');
const quarantineSubTypes = require('./quarantineSubTypes');
const dashboard = require('./dashboard');
const users = require('./users');
const wards = require('./wards');
const admin = require('./admin');
const health = require('./health');
const { isAdmin,isAuthorized } = require('../helpers/authHelper');

exports.bind = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/persons',isAuthorized, persons);
  app.use('/api/zones',isAuthorized, zones);
  app.use('/api/quarantineTypes',isAuthorized, quarantineTypes);
  app.use('/api/quarantineSubTypes',isAuthorized, quarantineSubTypes);
  app.use('/api/dashboard', dashboard);
  app.use('/api/users', users);
  app.use('/api/wards', wards);
  app.use('/api/admin', isAdmin, admin);
  app.use('/health', health);
};
