const moment = require('moment');
const { user, address, person, sequelize, personUser } = require('../models');

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
        if(!_person.created_by)
          _person['created_by'] = sessionUser.data.id;
        const result = await person.create(_person, { personTransaction });
        const { id, created_by } = result;
        const personUserMap = {
          person: id,
          gcc_user: created_by
        };
        await personUser.create(personUserMap, {personTransaction});
        await personTransaction.commit();
        return result;
    } catch (e) {
        if (personTransaction)
          personTransaction.rollback();
      throw e;
    }
  },
  update: async (personObj, sessionUser) => {
    let personTransaction = await sequelize.transaction();
    let _person = personObj;
    try {
        if(!_person.address && _person._address) {
        const address_result = await address.create(_person._address, {personTransaction});
        _person['_address'] = address_result;
        _person['address'] = address_result.id;
        }
        const result = await person.update(_person, {returning: true, where: {id: personObj.id} }, { personTransaction });
        await personTransaction.commit();
        return result;
    } catch (e) {
        if (personTransaction)
          personTransaction.rollback();
      throw e;
    }
  },
  getAll: async (sessionObj) => {
    try {
        let persons = [];
        persons = (sessionObj && sessionObj.data) ? await personUser.findAll({
          where: {
            gcc_user: sessionObj.data.id,
            curr_ind: true
          }
        }) : await personUser.findAll({
          where: {
            curr_ind: true
          }
        });
        const res = await person.findAll({
            where: {
              id: persons.map(p => p.person)
            },
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