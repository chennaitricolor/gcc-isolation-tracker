const { quarantineType, quarantineSubType, sequelize } = require('../models');

module.exports = {
  getAll: async () => {
    try {
        const res = await quarantineType.findAll({
          include: [
              {
                model: quarantineSubType,
              }
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
        const res = await quarantineType.findByPk(id,{
          include: [
              {
                model: quarantineSubType,
              }
            ],
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
        const res = await quarantineType.findOne({
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