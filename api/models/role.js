/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define('role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 'roles',
    timestamps: false
  });

  return Role;
};