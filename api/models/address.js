/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const Address = sequelize.define('address', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    door_num: {
      type: DataTypes.STRING,
      allowNull: true
    },
    building_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    house_num_old: {
      type: DataTypes.STRING,
      allowNull: true
    },
    house_num_new: {
      type: DataTypes.STRING,
      allowNull: true
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false
    },
    locality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    division: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    tableName: 'address',
    timestamps: false
  });

  Address.associate = (db) => {
    Address.belongsTo(db.zone, { as: '_zone', foreignKey: 'zone' });
  };

  return Address;
};