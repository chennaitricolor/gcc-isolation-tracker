const { user, userRole } = require('../models');

module.exports = {
  login: async (userName, password) => {
    try {
      const userRecord = await user.findOne({
          where: {
              login: userName,
              password: password,
              active: true,
          },
          include: [
            {
              model: userRole,
              as: '_roles',
              attributes: ['role']
            },
          ]
      });
      if (userRecord) {
        return [true, false, { id: userRecord.id, username: userRecord.name, login: userRecord.login, region: userRecord.region}];
      }
      return [false];
    } catch (e) {
      throw e;
    }
  }
};
