export const apiUrls = {
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  getZones: '/api/zones',
  getQuarantineTypes: '/api/quarantineTypes',
  resetPassword: '/api/auth/password',
  getPersonsByWard: '/api/dashboard/wards/',
  getPersonsDetails: '/api/persons',
  addContractedPersons: '/api/persons',
  updateContractedPersons: 'api/persons/:id',
  locationsByType: '/api/form/locations/street_name',
  searchHospitalName: '/api/form/hospitals',
  addContractedPersonEnquiry: '/api/persons/:id/isolation_enquiries',
  getDashboardEmbedUrl: '/api/dashboard/reports/gcc-dashboard',
  getPatientsLocation: '/api/dashboard/reports/map',
};

export const symptoms = ['None', 'Fever', 'Cough', 'Cold'];

export const necessities = ['None', 'Food', 'Medicine', 'Grocery'];
