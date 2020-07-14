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
    isolation_end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    quarantine_type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quarantine_sub_type: {
      type: DataTypes.INTEGER,
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
    quarantine_status: {
      type: DataTypes.ENUM('open', 'closed'),
      allowNull: true,
      defaultValue: 'open'
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: 'person',
    timestamps: true
  });

  Person.associate = (db) => {
    Person.belongsTo(db.address, { as: '_address', foreignKey: 'address' });
    Person.belongsTo(db.user, { as: '_created_by', foreignKey: 'created_by' });
    Person.belongsTo(db.quarantineType, { as: '_quarantine_type', foreignKey: 'quarantine_type' });
    Person.belongsTo(db.quarantineSubType, { as: '_quarantine_sub_type', foreignKey: 'quarantine_sub_type' });
    Person.hasMany(db.personIsolation, { as: '_isolation_enquiries', foreignKey: 'person' });
  };

  return Person;
};