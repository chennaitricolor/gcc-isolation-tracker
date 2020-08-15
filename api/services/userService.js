const { user, userRole, zone, ward, personUser, person, address, quarantineType, sequelize, Sequelize } = require('../models');

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
              {
                  model: zone,
                  as: '_zone',
                  attributes: ['name']
              },
              {
                  model: ward,
                  as: '_ward',
                  attributes: ['id']
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
  },
    getByLogin: async (number) => {
        try {
            const res = await user.findOne({
                where: {
                    login: number
                },
                include: [
                    {
                        model: userRole,
                        as: '_roles',
                        attributes: ['role']
                    },
                    {
                        model: zone,
                        as: '_zone',
                        attributes: ['name']
                    },
                    {
                        model: ward,
                        as: '_ward',
                        attributes: ['id']
                    }
                ]
            });
            if(res)
                return res;
            return null;
        } catch (e) {
            throw e;
        }
    },
    getPersonsByUser: async (id) => {
        try {
            const res = await personUser.findAll({
                where: {
                    gcc_user: id,
                    curr_ind: true
                },
                include: [
                    {
                        model: person,
                        as: '_person',
                        where: {
                            quarantine_status: 'open',
                            active: true,
                          },
                        include: [
                            {
                                model: address,
                                as: '_address',
                            },
                            {
                                model: quarantineType,
                                as: '_quarantine_type',
                            }
                        ]
                    }
                ]
            });
            if (res)
                return res;
            return null;
        } catch (e) {
            throw e;
        }
    },
    save: async (payload) => {
        let userTransaction = await sequelize.transaction();
        try {
            const res = await user.create(payload, { transaction: userTransaction });
            await userTransaction.commit();
            if (res)
                return res;
            return null;
        } catch (e) {
            if (userTransaction) await userTransaction.rollback();
            throw e;
        }
    },
    update: async (payload) => {
        let userTransaction = await sequelize.transaction();
        try {
            const res = await user.update(payload, { returning: true, plain: true, where: { id: payload.id }, transaction: userTransaction });
            await userTransaction.commit();
            if (res)
                return res;
            return null;
        } catch (e) {
            if (userTransaction) await userTransaction.rollback();
            throw e;
        }
    },
    upsert: async (payload) => {
        let userTransaction = await sequelize.transaction();
        try {
            const res = await user.upsert(payload, {
                include: [
                    {
                        model: zone,
                        as: '_zone',
                    },
                    {
                        model: ward,
                        as: '_ward',
                    }
                ],
                returning: true, plain: true,
                transaction: userTransaction
            });
            await userTransaction.commit();
            if (res)
                return res;
            return null;
        } catch (e) {
            if (userTransaction) await userTransaction.rollback();
            throw e;
        }
    },
    transferPersonsToUser: async (payload) => {
        let userTransaction = await sequelize.transaction();
        try {
            const res = await personUser.update(
                {
                    gcc_user: payload.toId
                },
                {
                    where: {
                        person: {
                            [Sequelize.Op.in]: payload.patients.map(p => p.id)
                        }
                    },
                    transaction: userTransaction
                }
            );
            await userTransaction.commit();
            if (res)
                return res;
            return null;
        } catch (e) {
            console.log(e);
            if (userTransaction) await userTransaction.rollback();
            throw e;
        }
    },
    deleteUserById: async (id) => {
        let userTransaction = await sequelize.transaction();
        try {
            const res = await user.update({active:false}, { returning: true, plain: true, where: { id: id }, transaction: userTransaction });
            await userTransaction.commit();
            if(res)
                return {success:true};
            return null;
        } catch (e) {
            console.log(e);
            if (userTransaction) await userTransaction.rollback();
            throw e;
        }
    },
};
