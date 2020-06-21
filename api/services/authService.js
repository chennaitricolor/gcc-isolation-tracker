const { user } = require('../models');

module.exports = {
  login: async (userName, password) => {
    try {
      const userRecord = await user.findOne({
          where: {
              login: userName,
              password: password,
              active: '1'
          }
      });
      if (userRecord) {
        return [true, false, { id: userRecord.id, username: userRecord.name, login: userRecord.login }];
      }
      return [false];
    } catch (e) {
      throw e;
    }
  }
};