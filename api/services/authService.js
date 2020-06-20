const { volunteer } = require('../models');

module.exports = {
  login: async (userName, password) => {
    try {
      const volunteerRecord = await volunteer.findOne({
          where: {
              login: userName,
              password: password,
          }
      });
      console.log('Result: '+JSON.stringify(volunteerRecord));
      if (volunteerRecord) {
        // const passwordCompare = medicalOfficerRecord.first_login_indicator
        //   ? password === medicalOfficerRecord.password
        //   : await medicalOfficerRecord.validPassword(password);
        // if (passwordCompare) {
        //   return [true, medicalOfficerRecord.first_login_indicator];
        // }
        return [true, false];
      }
      return [false];
    } catch (e) {
      throw e;
    }
  }
};