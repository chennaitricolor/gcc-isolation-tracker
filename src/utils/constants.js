export const apiUrls = {
  login: '/medicaltracker/auth/login',
  getZones: '/medicaltracker/dashboard/zones',
  resetPassword: '/medicaltracker/auth/password',
  getPersonsByWard: '/medicaltracker/dashboard/wards/',
  getPersonsDetails: '/medicaltracker/form/persons/:id',
  addContractedPersons: '/medicaltracker/form/persons',
  locationsByType: '/medicaltracker/form/locations/street_name',
  searchHospitalName: '/medicaltracker/form/hospitals',
  updateContractedPersons: '/medicaltracker/form/persons/:id',
  getDashboardEmbedUrl: '/medicaltracker/dashboard/reports/gcc-dashboard',
  getPatientsLocation: '/medicaltracker/dashboard/reports/map',
};
