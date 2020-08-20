const { city, zone, sequelize } = require('../models');

module.exports = {
  save: async (zoneObj) => {
    let zoneTransaction = await sequelize.transaction();
    try {
        const result = await zone.create(zoneObj, { zoneTransaction });
        await zoneTransaction.commit();
        return result;
    } catch (e) {
        if (zoneTransaction)
        zoneTransaction.rollback();
      throw e;
    }
  },
  getAll: async (region,type, typeCheck) => {
      let query = {region, type};
      if (!typeCheck) {
          query= {region}
      }
    try {
        const res = await zone.findAll({
            where: query,
          include: [
            {
              model: city,
              as: '_city',
              attributes: [
                'id','name',
              ]
            }],
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
        const res = await zone.findByPk(id);
        if(res)
            return res;
        return null;
    } catch (e) {
      throw e;
    }
  },
  getByName: async (name) => {
    try {
        const res = await zone.findOne({
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
