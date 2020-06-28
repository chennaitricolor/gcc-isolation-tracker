module.exports = {
  port: '5432',
  db: {
    username: 'postgres',
    password: 'dev',
    database: 'gcc_isolation_tracker',
    host: 'localhost',
    schema: 'test',
    dialect: 'postgres',
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
  aws: {
    config: {
      region: process.env.AWS_IAM_REGION,
      credentials: {
        AccountId: process.env.AWS_IAM_ACCOUNT_ID,
        RoleSessionName: process.env.AWS_IAM_ROLE_SESSION_NAME,
        RoleArn: process.env.AWS_IAM_ROLE_ARN,
        IdentityPoolId: process.env.AWS_IAM_POOL_ID,
      },
    },
    quicksight: {
      region: process.env.AWS_QS_REGION,
      dashboard: {
        AwsAccountId: process.env.AWS_IAM_ACCOUNT_ID, 
        DashboardId: process.env.AWS_QS_DASHBOARD_ID,
        IdentityType: 'IAM',
        ResetDisabled: true,
        SessionLifetimeInMinutes: 100,
        UndoRedoDisabled: false,
      },
    },
  },
};
