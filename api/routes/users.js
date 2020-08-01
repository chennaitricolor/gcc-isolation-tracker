const router = require('express').Router();
const { userService } = require('../services');
const { isAuthorized } = require('../helpers/authHelper');

router.get('/', isAuthorized, async(req, res) => {
  try {
  const zones = await userService.getAll();
  return res.status(200).send(zones);
  } catch(e) {
      return res.status(500).json({
          message: e.message
      });
  }
});

module.exports = router;
