export const apiUrls = {
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  getZones: '/api/zones',
  getQuarantineTypes: '/api/quarantineTypes',
  resetPassword: '/api/auth/password',
  getPersonsByWard: '/api/dashboard/wards/',
  getPersonsDetails: '/api/persons',
  addContractedPersons: '/api/persons',
  locationsByType: '/api/form/locations/street_name',
  searchHospitalName: '/api/form/hospitals',
  updateContractedPersons: '/api/persons/:id/isolation_enquiries',
  getDashboardEmbedUrl: '/api/dashboard/reports/gcc-dashboard',
  getPatientsLocation: '/api/dashboard/reports/map',
};

export const symptoms = ['Fever', 'Cough', 'Cold'];

export const necessities = ['Food', 'Medicine', 'Grocery', 'Others'];
