const authService = require('./authService');
const personService = require('./personService');
const zoneService = require('./zoneService');
const quarantineTypeService = require('./quarantineTypeService');
const quarantineSubTypeService = require('./quarantineSubTypeService');
const personIsolationService = require('./personIsolationService');

module.exports = {
  authService,
  personService,
  zoneService,
  quarantineTypeService,
  quarantineSubTypeService,
  personIsolationService,
};