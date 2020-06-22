module.exports = {
  port: '4004',
  db: {
    username: 'postgres',
    password: 'dev',
    database: 'gcc_isolation_tracker',
    host: 'localhost',
    schema: 'gcc_isolation_tracker_dev',
    dialect: 'postgres',
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
};
