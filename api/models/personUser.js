/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const PersonUser = sequelize.define('person_user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    person: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gcc_user: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    curr_ind: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
      },
  }, {
    tableName: 'person_user_cross_ref',
    timestamps: true
  });

  PersonUser.associate = (db) => {
    PersonUser.belongsTo(db.person, { as: '_person', foreignKey: 'person' });
    PersonUser.belongsTo(db.user, { as: '_user', foreignKey: 'gcc_user' });
  };

  return PersonUser;
};