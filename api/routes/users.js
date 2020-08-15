const router = require('express').Router();
const { userService } = require('../services');
const { isAuthorized } = require('../helpers/authHelper');
const logger = require('../helpers/logger');

router.get('/', isAuthorized, async(req, res) => {
  try {
  const users = await userService.getAll();
  return res.status(200).send(users);
  } catch(e) {
      logger.error(JSON.stringify(e));
      return res.status(500).json({
          message: e.message
      });
  }
});

module.exports = router;
