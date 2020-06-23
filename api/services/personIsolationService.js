const { personIsolation, sequelize } = require('../models');

module.exports = {
  insertOne: async (personIsolationObj) => {
    try {
        const res = await personIsolation.create(personIsolationObj);
        if(res)
            return res;
        return null;    
    } catch (e) {
      throw e;
    }
  },
  insertMany: async (personIsolationList) => {
    try {
        const res = await personIsolation.bulkCreate(personIsolationList);
        if(res)
            return res;
        return null;    
    } catch (e) {
      throw e;
    }
  },
  getAll: async () => {
    try {
        const res = await personIsolation.findAll();
        if(res)
            return res;
        return null;    
    } catch (e) {
      throw e;
    }
  },
  getById: async (id) => {
    try {
        const res = await personIsolation.findByPk(id);
        if(res)
            return res;
        return null;    
    } catch (e) {
      throw e;
    }
  },
  getLatestEnquiryForPerson: async(person) => {
    try {
      const res = await personIsolation.findOne({
        where: {
          person: person
        },
        attributes: [[sequelize.fn('max', sequelize.col('day')), 'last_enquiry_day_num']]
      });
      if(res)
          return res;
  } catch (e) {
    throw e;
  }
  }
};