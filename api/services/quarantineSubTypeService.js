const { quarantineSubType, sequelize } = require('../models');

module.exports = {
  getAll: async () => {
    try {
        const res = await quarantineSubType.findAll();
        if(res)
            return res;
        return null;    
    } catch (e) {
      throw e;
    }
  },
  getById: async (id) => {
    try {
        const res = await quarantineSubType.findByPk(id);
        if(res)
            return res;
        return null;    
    } catch (e) {
      throw e;
    }
  },
  getByQuarantineTypeId: async (id) => {
    try {
        const res = await quarantineSubType.findAll({
          where: {
            quarantine_type: id
          }
        });
        if(res)
            return res;
        return null;    
    } catch (e) {
      throw e;
    }
  },
  getByName: async (name) => {
    try {
        const res = await quarantineSubType.findOne({
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