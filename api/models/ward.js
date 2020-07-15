/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
    const Ward = sequelize.define('ward', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
    }, {
        tableName: 'ward',
        timestamps: false
    });

    Ward.associate = (db) => {
        Ward.belongsTo(db.zone, { as: '_zone', foreignKey: 'zone' });
    };

    return Ward;
};