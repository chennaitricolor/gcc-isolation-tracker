const moment = require('moment');
const { user, address, person, sequelize } = require('../models');

module.exports = {
  save: async (personObj, sessionUser) => {
    let personTransaction = await sequelize.transaction();
    let _person = personObj;
    try {
        if(!_person.address && _person._address) {
        const address_result = await address.create(_person._address, {personTransaction});
        _person['_address'] = address_result;
        _person['address'] = address_result.id;
        }
        _person['created_at'] = moment().utc();
        const result = await person.create(_person, { personTransaction });
        await personTransaction.commit();
        return result;
    } catch (e) {
        if (personTransaction)
          personTransaction.rollback();
      throw e;
    }
  },
  getAll: async () => {
    try {
        const res = await person.findAll({
            include: [
                {
                  model: address,
                  as: '_address',
                },
                {
                  model: user,
                  as: '_created_by'
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
  getByPhoneNumber: async (phone_number) => {
    try {
        const res = await person.findOne({
            where: {
                phone_number: phone_number
            },
            include: [
                {
                  model: address,
                  as: '_address',
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
        const res = await person.findByPk(id);
        if(res)
            return res;
        return null;    
    } catch (e) {
      throw e;
    }
  }
};