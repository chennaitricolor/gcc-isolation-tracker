const authService = require('./authService');
const personService = require('./personService');
const zoneService = require('./zoneService');
const quarantineTypeService = require('./quarantineTypeService');
const quarantineSubTypeService = require('./quarantineSubTypeService');
const personIsolationService = require('./personIsolationService');
const dashboardService = require('./dashboardService');
const userService = require('./userService');
const wardService = require('./wardService');

module.exports = {
  authService,
  personService,
  zoneService,
  quarantineTypeService,
  quarantineSubTypeService,
  personIsolationService,
  dashboardService,
  userService,
  wardService,
};