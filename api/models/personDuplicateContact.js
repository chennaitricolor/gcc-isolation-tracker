/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const PersonDuplicateContact = sequelize.define('person_duplicate_contact', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    person: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    quarantine_start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    quarantine_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quarantine_sub_type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    no_of_duplicates: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
      },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    tableName: 'person_duplicate_contacts',
    timestamps: true
  });

  PersonDuplicateContact.associate = (db) => {
    PersonDuplicateContact.belongsTo(db.person, { as: '_person', foreignKey: 'person' });
    PersonDuplicateContact.belongsTo(db.quarantineType, { as: '_quarantine_type', foreignKey: 'quarantine_type' });
    PersonDuplicateContact.belongsTo(db.quarantineSubType, { as: '_quarantine_sub_type', foreignKey: 'quarantine_sub_type' });
    PersonDuplicateContact.belongsTo(db.user, { as: '_created_by', foreignKey: 'created_by' });
    PersonDuplicateContact.belongsTo(db.user, { as: '_updated_by', foreignKey: 'updated_by' });

  };

  return PersonDuplicateContact;
};