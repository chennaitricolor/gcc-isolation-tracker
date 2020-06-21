/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const Zone = sequelize.define('zone', {
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
  }, {
    tableName: 'zone',
    timestamps: false
  });

  Zone.associate = (db) => {
    Zone.belongsTo(db.city, { as: '_city', foreignKey: 'city' });
  };

  return Zone;
};