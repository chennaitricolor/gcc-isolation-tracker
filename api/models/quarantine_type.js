/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const QuarantineType = sequelize.define('quarantine_type', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 'quarantine_type',
    timestamps: false
  });

  QuarantineType.associate = (db) => {
    QuarantineType.hasMany(db.quarantineSubType, { foreignKey: 'quarantine_type' });
  };

  return QuarantineType;
};