const router = require('express').Router();
const { authService } = require('../services');
const { isAuthorized } = require('../helpers/authHelper');
const logger = require('../helpers/logger');

router.post('/login', async (req, res) => {
  try {
    const loginResponse = await authService.login(req.body.username, req.body.password);
    if (loginResponse[0]) {
      req.session.user = {
        data: loginResponse[2],
        isTempUser: false
      };
      return res.send({
        success: true,
        isTempUser: false
      });
    }
    throw new Error('Invalid Credentials');
  } catch (e) {
    logger.error(JSON.stringify(e));
    return res.status(401).json({
      message: e.message
    });
  }
});

router.get('/logout', isAuthorized, (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

module.exports = router;