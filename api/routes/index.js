const auth = require('./auth');

exports.bind = (app) => {
  app.use('/api/auth', auth);
};
