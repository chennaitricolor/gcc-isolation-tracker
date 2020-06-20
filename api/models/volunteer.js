/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const Volunteer = sequelize.define('volunteer', {
    volunteer_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    volunteer_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'volunteer',
    timestamps: false
  });

  return Volunteer;
};