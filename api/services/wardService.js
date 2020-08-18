const { city, zone, ward, sequelize } = require('../models');

module.exports = {
    getAll: async () => {
        try {
            const res = await ward.findAll({
                include: [
                    {
                        model: zone,
                        as: '_zone',
                        attributes: ['name']
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
    getByZoneId: async (zone) => {
        try {
            const res = await ward.findAll({
            where: {
                zone
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
