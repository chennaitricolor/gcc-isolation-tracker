const { user, userRole, sequelize } = require('../models');

module.exports = {
  getAll: async (id) => {
    try {
        const res = await user.findAll({
          include: [
            {
              model: userRole,
              as: '_roles',
              attributes: ['role']
            },
          ],
        });
        if(res)
            return res;
        return null;    
    } catch (e) {
      throw e;
    }
  },
  getById: async (id) => {
    try {
        const res = await user.findByPk(id);
        if(res)
            return res;
        return null;    
    } catch (e) {
      throw e;
    }
  },
  getByName: async (name) => {
    try {
        const res = await user.findOne({
          where: {
            name: name
          }
        });
        if(res)
            return res;
        return null;    
    } catch (e) {
      throw e;
    }
  }
};