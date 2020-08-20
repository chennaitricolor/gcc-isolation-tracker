export const apiUrls = {
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  getAllZones: '/api/zones',
  getZonesByType: '/api/zones/:type',
  getWardsMapping: '/api/wards/:zoneId',
  getQuarantineTypes: '/api/quarantineTypes',
  resetPassword: '/api/auth/password',
  getPersonsDetails: '/api/persons',
  addContractedPersons: '/api/persons',
  updateContractedPersons: 'api/persons/:id',
  addContractedPersonEnquiry: '/api/persons/:id/isolation_enquiries',
  getDashboardEmbedUrl: '/api/dashboard/reports/gcc-dashboard',
  getPatientsLocation: '/api/dashboard/reports/map',
};

export const symptoms = ['None', 'Fever', 'Cough', 'Cold'];

export const necessities = ['None', 'Food', 'Medicine', 'Grocery'];

export const closeReasons = ['Person Died', 'Turned Positive', 'Person/Address not found', 'Others'];
