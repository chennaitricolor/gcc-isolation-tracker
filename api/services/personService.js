const moment = require('moment');
const { user, address, person, sequelize, personUser, personIsolation } = require('../models');
const personIsolationService = require('./personIsolationService');

module.exports = {
  save: async (personObj, sessionUser) => {
    let personTransaction = await sequelize.transaction();
    let _person = personObj;
    try {
      if (!_person.address && _person._address) {
        const address_result = await address.create(_person._address, { personTransaction });
        _person['_address'] = address_result;
        _person['address'] = address_result.id;
      }
      if (!_person.created_by) _person['created_by'] = sessionUser.data.id;
      const result = await person.create(_person, { personTransaction });
      const { id, created_by } = result;
      const personUserMap = {
        person: id,
        gcc_user: created_by,
      };
      await personUser.create(personUserMap, { personTransaction });
      const today = moment().startOf('day');
      let isol_start_day = moment(result.isolation_start_date);
      if (isol_start_day < today) {
        let status_entries = [];
        let enquiry = {
          person: id,
          is_present_at_home: false,
          is_family_members_at_home: false,
          basic_necessities: 'NA',
          is_self_or_family_with_symptoms: false,
          additional_comments: 'NA',
          status_check_date: null,
          created_by: created_by,
          updated_by: created_by,
          disabled: true,
          is_offline_enquiry: true,
          day: -1,
        };
        let count = 1;
        while (isol_start_day < today) {
          var clone = Object.assign({}, enquiry);
          clone['status_check_date'] = isol_start_day.clone();
          clone['day'] = count++;
          status_entries.push(clone);
          isol_start_day = isol_start_day.add(1, 'day');
        }
        await personIsolationService.insertMany(status_entries);
      }
      await personTransaction.commit();
      return result;
    } catch (e) {
      if (personTransaction) personTransaction.rollback();
      throw e;
    }
  },
  update: async (personObj, sessionUser) => {
    let personTransaction = await sequelize.transaction();
    let _person = personObj;
    try {
      if (!_person.address && _person._address) {
        const address_result = await address.create(_person._address, { personTransaction });
        _person['_address'] = address_result;
        _person['address'] = address_result.id;
      }
      const result = await person.update(_person, { returning: true, where: { id: personObj.id } }, { personTransaction });
      await personTransaction.commit();
      return result;
    } catch (e) {
      if (personTransaction) personTransaction.rollback();
      throw e;
    }
  },
  getAll: async (sessionObj) => {
    try {
      let persons = [];
      persons =
        sessionObj && sessionObj.data
          ? await personUser.findAll({
              where: {
                gcc_user: sessionObj.data.id,
                curr_ind: true,
              },
            })
          : await personUser.findAll({
              where: {
                curr_ind: true,
              },
            });
      const res = await person.findAll({
        where: {
          id: persons.map((p) => p.person),
        },
        include: [
          {
            model: address,
            as: '_address',
          },
          {
            model: user,
            as: '_created_by',
            attributes: ['id', 'name'],
          },
          {
            model: personIsolation,
            as: '_isolation_enquiries',
          },
        ],
      });
      if (res) return res;
      return null;
    } catch (e) {
      throw e;
    }
  },
  getByPhoneNumber: async (phone_number) => {
    try {
      const res = await person.findOne({
        where: {
          phone_number: phone_number,
        },
        include: [
          {
            model: address,
            as: '_address',
          },
          {
            model: personIsolation,
            as: '_isolation_enquiries',
          },
        ],
      });
      if (res) return res;
      return null;
    } catch (e) {
      throw e;
    }
  },
  getById: async (id) => {
    try {
      const res = await person.findByPk(id, {
        include: [
          {
            model: address,
            as: '_address',
          },
          {
            model: user,
            as: '_created_by',
            attributes: ['id', 'name'],
          },
          {
            model: personIsolation,
            as: '_isolation_enquiries',
          },
        ],
      });
      if (res) return res;
      return null;
    } catch (e) {
      throw e;
    }
  },
  saveIsolationDetail: async (personIsolationObj, sessionUser) => {
    let personIsolationTransaction = await sequelize.transaction();
    let _personIsolation = personIsolationObj;
    try {
      const day = moment(_personIsolation.status_check_date).startOf('day');
      const today = moment().startOf('day');
      if(!day.isSame(today))
        throw new Error('Isolation status check date should be today');
      if (!_personIsolation.created_by) _personIsolation['created_by'] = sessionUser.data.id;
      if (!_personIsolation.updated_by) _personIsolation['updated_by'] = sessionUser.data.id;
      _personIsolation['is_offline_enquiry'] = false;
      _personIsolation['disabled'] = true;
      const last_check_day_of_the_person = await personIsolationService.getLatestEnquiryForPerson(_personIsolation.person);
      _personIsolation['day'] = (last_check_day_of_the_person.dataValues && last_check_day_of_the_person.dataValues['last_enquiry_day_num'])  ? parseInt(last_check_day_of_the_person.dataValues['last_enquiry_day_num'])+1 : 1;
      const result = await personIsolationService.insertOne(_personIsolation);
      await personIsolationTransaction.commit();
      return result;
    } catch (e) {
      if (personIsolationTransaction) personIsolationTransaction.rollback();
      throw e;
    }
  },
};
