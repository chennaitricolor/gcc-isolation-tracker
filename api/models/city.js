/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const City = sequelize.define('city', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'city',
    timestamps: false
  });


  return City;
};