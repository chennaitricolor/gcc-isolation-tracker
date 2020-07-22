/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  const PersonIsolation = sequelize.define('person_isolation', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    is_present_at_home: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_family_members_at_home: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    basic_necessities_delivered: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    self_or_family_with_symptoms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    additional_comments: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status_check_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    location_lat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    location_long: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updated_by: {
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
    disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    is_offline_enquiry: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    enquiry_seq: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'person_isolation_details',
    timestamps: true
  });

  PersonIsolation.associate = (db) => {
    PersonIsolation.belongsTo(db.person, { as: '_person', foreignKey: 'person' });
    PersonIsolation.belongsTo(db.user, { as: '_created_by', foreignKey: 'created_by' });
    PersonIsolation.belongsTo(db.user, { as: '_updated_by', foreignKey: 'updated_by' });
  };

  return PersonIsolation;
};