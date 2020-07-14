/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
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
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    zone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ward: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.associate = (db) => {
      User.hasMany(db.userRole, { as: '_roles', foreignKey: 'user' });
      User.belongsTo(db.zone, { as: '_zone', foreignKey: 'zone' });
      User.belongsTo(db.ward, { as: '_ward', foreignKey: 'ward' });
  };

  return User;
};