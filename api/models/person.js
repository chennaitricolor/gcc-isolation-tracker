/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const Person = sequelize.define('person', {
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    family_member_total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    address: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isolation_start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    quarantine_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quarantine_sub_type: {
      type: DataTypes.STRING,
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
    tableName: 'person',
    timestamps: false
  });

  Person.associate = (db) => {
    Person.belongsTo(db.address, { as: '_address', foreignKey: 'address' });
    Person.belongsTo(db.user, { as: '_created_by', foreignKey: 'created_by' });
  };

  return Person;
};