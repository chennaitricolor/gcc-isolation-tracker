/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const UserRole = sequelize.define('user_role', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    tableName: 'user_role',
    timestamps: false
  });

  UserRole.associate = (db) => {
    UserRole.belongsTo(db.user, { as: '_user', foreignKey: 'user' });
    UserRole.belongsTo(db.user, { as: '_role', foreignKey: 'role' });
  };

  return UserRole;
};