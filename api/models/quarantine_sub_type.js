/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const QuarantineSubType = sequelize.define('quarantine_sub_type', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quarantine_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'quarantine_sub_type',
    timestamps: false
  });

  QuarantineSubType.associate = (db) => {
    QuarantineSubType.belongsTo(db.quarantineType, { as: '_quarantine_type', foreignKey: 'quarantine_type' });
  };


  return QuarantineSubType;
};