const moment = require('moment');
const { user, address, person, sequelize, personUser, personIsolation, quarantineType } = require('../models');
const personIsolationService = require('./personIsolationService');
const quarantineTypeService = require('./quarantineTypeService');
const quarantineSubTypeService = require('./quarantineSubTypeService');

module.exports = {
  save: async (personObj, sessionUser) => {
    let personTransaction = await sequelize.transaction();
    let _person = personObj;
    const isolation_start_date = moment(_person.isolation_start_date).startOf('day');
    if(!isolation_start_date || !isolation_start_date.isValid())
      throw new Error('Isolation start date is invalid'); 
    try {
      if (!_person.address && _person._address) {
        const address_result = await address.create(_person._address, { personTransaction });
        _person['_address'] = address_result;
        _person['address'] = address_result.id;
      }
      if (!_person.created_by) _person['created_by'] = sessionUser.data.id;
//      _person['isolation_end_date'] = moment(_person['isolation_start_date']).add(13, 'days');
      _person['isolation_end_date'] = await getIsolationEndDateByQuarantineTypeAndSubType(_person.isolation_start_date, _person.quarantine_type, _person.quarantine_sub_type);
      const result = await person.create(_person, { personTransaction });
      const { id, created_by } = result;
      const personUserMap = {
        person: id,
        gcc_user: created_by,
      };
      await personUser.create(personUserMap, { personTransaction });
      const today = moment().startOf('day');
      let isol_start_day = moment(result.isolation_start_date).startOf('day');
      if (isol_start_day < today) {
        let status_entries = [];
        let enquiry = {
          person: id,
          is_present_at_home: null,
          is_family_members_at_home: null,
          basic_necessities_delivered: [],
          self_or_family_with_symptoms: [],
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
          quarantine_status: 'open'
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
          {
            model: quarantineType,
            as: '_quarantine_type',
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
  getByNameAndPhoneNumber: async (name, phone_number) => {
    try {
      const res = await person.findOne({
        where: {
          phone_number: phone_number,
          name: name
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
  getByIdWithoutAssociations: async (id) => {
    try {
      const res = await person.findByPk(id);
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
      const lastEnquirySeqForDayOfPerson = await personIsolationService.getEnquirySeqOfDayForPerson(_personIsolation.status_check_date, _personIsolation.person);
      if(lastEnquirySeqForDayOfPerson && lastEnquirySeqForDayOfPerson.length > 2)
        throw new Error('Only 2 enquiries can be recorded per day');
      if(lastEnquirySeqForDayOfPerson && lastEnquirySeqForDayOfPerson.length === 1)  
        _personIsolation.enquiry_seq = 2;
      if(!lastEnquirySeqForDayOfPerson || lastEnquirySeqForDayOfPerson.length === 0)  
        _personIsolation.enquiry_seq = 1;  
      const result = await personIsolationService.insertOne(_personIsolation);
      await personIsolationTransaction.commit();
      return result;
    } catch (e) {
      if (personIsolationTransaction) personIsolationTransaction.rollback();
      throw e;
    }
  }
};


const getIsolationEndDateByQuarantineTypeAndSubType = async (isolationStartDate, quarantineTypeId, quarantineSubTypeId) => {
  let isloationEndDate = moment(isolationStartDate).startOf('day').add(13, 'days');
  const type = quarantineTypeId && await quarantineTypeService.getById(quarantineTypeId);
  const subType = quarantineSubTypeId && await quarantineSubTypeService.getById(quarantineSubTypeId);
  if(type && type.name === 'Tested and Waiting for Results')
    isloationEndDate = moment(isolationStartDate).startOf('day').add(2, 'days');
  if(type && type.name === 'Travel Quarantine' && (subType && subType.name === 'International Flight'))
    isloationEndDate = moment(isolationStartDate).startOf('day').add(6, 'days');
  return isloationEndDate;
}