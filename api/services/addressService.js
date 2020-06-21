const { address, sequelize } = require('../models');

module.exports = {
  save: async (addressObj) => {
    let addressTransaction = await sequelize.transaction();
    try {
        const result = await address.create(addressObj, { addressTransaction });
        await addressTransaction.commit();
        return result;
    } catch (e) {
        if (addressTransaction)
        addressTransaction.rollback();
      throw e;
    }
  },
  getById: async (id) => {
    try {
        const res = await address.findByPk(id);
        if(res)
            return res;
        return null;    
    } catch (e) {
      throw e;
    }
  }
};