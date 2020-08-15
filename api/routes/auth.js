const router = require('express').Router();
const { authService } = require('../services');
const { isAuthorized } = require('../helpers/authHelper');
const logger = require('../helpers/logger');

router.post('/login', async (req, res) => {
  try {
    const loginResponse = await authService.login(req.body.username, req.body.password);
    let region;
    if (loginResponse[0]) {
      region =loginResponse.length > 2 ? loginResponse[2].region : "GCC"
      req.session.user = {
        data: loginResponse[2],
        isTempUser: false,
        region
      };
      return res.send({
        success: true,
        isTempUser: false,
        region
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
